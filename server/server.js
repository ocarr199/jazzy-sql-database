const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
const pg = require('pg');
const Pool = pg.Pool;
const pool = new Pool({
    database: 'jazzy_sql', // the name of database, This can change!
    host: 'localhost', // where is your database?
    port: 5432 // the port for your database, 5432 is default for postgres
});

pool.on('connect', () => {
    console.log('connected to pg')
})

pool.on('err', (err) => {
    console.log(err)
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('listening on port', PORT)
});

// TODO - Replace static content with a database tables

// const artistList = [ 
//     {
//         name: 'Ella Fitzgerald',
//         birthdate: '04-25-1917'
//     },
//     {
//         name: 'Dave Brubeck',
//         birthdate: '12-06-1920'
//     },       
//     {
//         name: 'Miles Davis',
//         birthdate: '05-26-1926'
//     },
//     {
//         name: 'Esperanza Spalding',
//         birthdate: '10-18-1984'
//     },
// ]
const songList = [
    {
        title: 'Take Five',
        length: '5:24',
        released: '1959-09-29'
    },
    {
        title: 'So What',
        length: '9:22',
        released: '1959-08-17'
    },
    {
        title: 'Black Gold',
        length: '5:17',
        released: '2012-02-01'
    }
];

// app.get('/artist', (req, res) => {
//     console.log(`In /songs GET`);
//     res.send(artistList);
// });

// SQL

app.get('/artist', (req, res) => {
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
app.post('/artist', (req, res) => {
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

// app.get('/song', (req, res) => {
//     console.log(`In /songs GET`);
//     res.send(songList);
// });

app.get('/song', (req, res) => {
    let queryText = `SELECT * FROM "song" ORDER BY "title" DESC;`;
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

app.post('/artist', (req, res) => {
    // musicLibrary.push(req.body);
    // QUERY 
    // Query Sanitized
    let queryText =  `INSERT INTO "song" ("title", "length", "released")
    VALUES ($1, $2, $3);`
    let values = [req.body.title, req.body.length, req.body.released]
    pool.query(queryText, values)
    .then((result) => {
        console.log(result.rows);
        res.sendStatus(201);
    }).catch( err => {
        res.sendStatus(500)
    })

});

