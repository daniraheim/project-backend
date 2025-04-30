const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'C0d3r4Life!',
    database: 'userLogin'
}) 

module.exports = db.promise();