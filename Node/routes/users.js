const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const db = require('../utils/db');

require('dotenv').config();

AWS.config.update({ region: process.env.AWS_REGION });
const cognito = new AWS.CognitoIdentityServiceProvider();

const client = jwksClient({
    jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_USER_POOL_ID}/.well-known/jwks.json`,
});

function getKey(header, callback) {
    client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
}

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.sendStatus(401).send('Authorization header not found');
    }

    const token = authHeader.split(' ')[1];

    if (token) {
        jwt.verify(token, getKey, {}, (err, user) => {
            if (err) {
                return res.sendStatus(403).send('Invalid token');
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401).send('Token not found');
    }
};

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    const params = {
        ClientId: process.env.AWS_CLIENT_ID,
        Password: password,
        Username: email,
    };

    cognito.signUp(params, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.send(data);
        }
    });
});

router.post('/confirm', (req, res) => {
    const { email, code } = req.body;

    const params = {
        ClientId: process.env.AWS_CLIENT_ID,
        ConfirmationCode: code,
        Username: email,
    };

    cognito.confirmSignUp(params, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.send(data);
        }
    });
});

router.post('/signin', (req, res) => {
    const { email, password } = req.body;

    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.AWS_CLIENT_ID,
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
        },
    };

    cognito.initiateAuth(params, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            const idToken = data.AuthenticationResult.IdToken;
            const accessToken = data.AuthenticationResult.AccessToken;
            res.json({ idToken, accessToken });
        }
    });
});

router.get('/user', authenticateJWT, (req, res) => {
    res.json({ message: 'Welcome to the protected route!' });
});

router.post('/signout', authenticateJWT, (req, res) => {
    const token = req.body.accessToken;

    const params = {
        AccessToken: token,
    };

    cognito.globalSignOut(params, (err, data) => {
        if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            res.json({ message: 'Successfully signed out!' });
        }
    });
});

module.exports = router;