const express = require('express');
const router = express.Router();
const db = require('../utils/db');
require('dotenv').config();

router.get('/jobs', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM EMPLEO');
        const jobs = rows.map(job => {
            return {
                id: job.ID,
                puesto: job.PUESTO,
                descripcion: job.DESCRIPCION,
                salario: job.SALARIO,
                creacion: job.FECHA_CREACION
            }
        });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
    console.log('GET /Empleo');
});

router.post('/create', async (req, res) => {
    const { puesto, descripcion, salario, skills } = req.body;
    const fechaCreacion = new Date();
    console.log(req.body);

    try {
        const [result] = await db.query('INSERT INTO EMPLEO (PUESTO, DESCRIPCION, SALARIO, FECHA_CREACION) VALUES (?, ?, ?, ?)', [puesto, descripcion, salario, fechaCreacion]);

        const jobId = result.insertId;

        if (skills && Array.isArray(skills)) {
            const skillInsertPromises = skills.map(async (skill) => {
                const [existingSkills] = await db.query('SELECT ID FROM HABILIDAD WHERE NOMBRE = ?', [skill]);
                
                let skillId;
                if (existingSkills.length > 0) {
                    skillId = existingSkills[0].ID;
                } else {
                    const [newSkillResult] = await db.query('INSERT INTO HABILIDAD (NOMBRE) VALUES (?)', [skill]);
                    skillId = newSkillResult.insertId;
                }

                await db.query('INSERT INTO EMPLEO_HABILIDAD (ID_EMPLEO, ID_HABILIDAD) VALUES (?, ?)', [jobId, skillId]);
            });

            await Promise.all(skillInsertPromises);
        }

        res.json({ message: 'Job created!' });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
    console.log('POST /Empleo');
});

module.exports = router;
