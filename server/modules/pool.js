const pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool( {
    database: 'weekend-to-do-app', // the name of database, This can change!
    host: 'localhost', // where is your database?
    port: 5432, // the port for your database, 5432 is default for postgres
    max: 10, // how many connections (queries) at one time
    idleTimeoutMillis: 30000 // 30 seconds to try to connect - otherwise cancel
});

pool.on('connect', () => {
    console.log("Postgresql Connected");
});

pool.on('error', (error) => {
    console.log("error with Postgresql pool", error);
});

module.exports = pool;