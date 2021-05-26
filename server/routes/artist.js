
const express = require('express');
const router = express.Router();

const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool({
    database: 'jazzy_sql', // the name of database, This can change!
    host: 'localhost', // where is your database?
    port: 5432 // the port for your database, 5432 is default for postgres
});



router.get('/', (req, res) => {
    let queryText = `SELECT * FROM "artist" ORDER BY "birthdate" DESC;`;
    pool.query(queryText)
        .then((result) => {
            console.log(result)
            res.send(result.rows);
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        });
});

// SQL DONE
router.post('/', (req, res) => {
    // musicLibrary.push(req.body);
    // QUERY 
    // Query Sanitized
    let queryText =  `INSERT INTO "artist" ("name", "birthdate")
    VALUES ($1, $2);`
    let values = [req.body.name, req.body.birthdate]
    pool.query(queryText, values)
    .then((result) => {
        console.log(result.rows);
        res.sendStatus(201);
    }).catch( err => {
        res.sendStatus(500)
    })
});