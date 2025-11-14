const mysql = require('mysql2')

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Movie_Reviews"
})

module.exports = pool