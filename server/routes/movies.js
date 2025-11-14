const express = require("express")
const pool = require('../util/db')
const result = require('../util/result')


const router = express.Router()

router.get('/', (req, res) => {
    const sql = "SELECT title,r_date FROM movies"
    pool.query(sql, (error, data) => {
        res.send(result.createResult(error, data));
    })
})

module.exports = router