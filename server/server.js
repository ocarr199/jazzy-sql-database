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



// SQL



let artistRouter = require("./routes/artist");
app.use("/artist", artistRouter);


let songRouter = require("./routes/song");
app.use("/song", songRouter);



