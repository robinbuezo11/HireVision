const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const db = require('../utils/db');

require('dotenv').config();

AWS.config.update({ region: process.env.AWS_REGION });
const cognito = new AWS.CognitoIdentityServiceProvider();
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

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
        return res.status(401).json({ err: 'Authorization header not found' });
    }

    const token = authHeader.split(' ')[1];

    if (token) {
        jwt.verify(token, getKey, {}, (err, user) => {
            if (err) {
                return res.status(403).json({ err: 'Invalid token' });
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ err: 'Token not found' });
    }
};

router.post('/signup', async (req, res) => {
    const { first_name, last_name, email, birth_date, password, picture } = req.body;
    
    if (!first_name || !last_name || !email || !birth_date || !password || !picture) {
        return res.status(400).json({ err: 'Missing required fields' });
    }

    try {
        let params = {
            ClientId: process.env.AWS_CLIENT_ID,
            Password: password,
            Username: email,
        };

        const data = await cognito.signUp(params).promise();

        const picBuffer = Buffer.from(picture.replace(/^data:image\/\w+;base64,/, ''), 'base64');
        params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `imagenes/${email}-${Date.now()}.jpg`,
            Body: picBuffer,
            ContentType: 'image/jpeg',
        };

        const s3Data = await s3.upload(params).promise();
        const pictureUrl = s3Data.Location;

        const user = {
            first_name,
            last_name,
            email,
            birth_date,
        };
        const query = 'INSERT INTO USUARIO (NOMBRE, APELLIDO, CORREO, FECHA_NACIMIENTO, FOTO) VALUES (?, ?, ?, ?, ?)';
        await db.query(query, [first_name, last_name, email, birth_date, pictureUrl]);
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(400).json({ err: err.message });
    }
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
            res.status(400).json({ err: err.message });
        } else {
            res.json(data);
        }
    });
});

router.post('/signin', async (req, res) => {
    const { email, password } = req.body;

    const params = {
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: process.env.AWS_CLIENT_ID,
        AuthParameters: {
            USERNAME: email,
            PASSWORD: password,
        },
    };

    try {
        const data = await cognito.initiateAuth(params).promise();
        const idToken = data.AuthenticationResult.IdToken;
        const accessToken = data.AuthenticationResult.AccessToken;
        const [row] = await db.query('SELECT * FROM USUARIO WHERE CORREO = ?', [email]);
        if (row.length === 0) {
            throw new Error('User not found in database');
        }
        const user = {
            first_name: row[0].NOMBRE,
            last_name: row[0].APELLIDO,
            email: row[0].CORREO,
            birth_date: row[0].FECHA_NACIMIENTO,
            picture: row[0].FOTO,
        }
        res.json({ idToken, accessToken, user });
    } catch (err) {
        console.log(err);
        res.status(400).json({ err: err.message });
    }
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
            res.status(400).json({ err: err.message });
        } else {
            res.json({ message: 'Successfully signed out!' });
        }
    });
});

module.exports = router;