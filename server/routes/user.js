const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const pool = require('../util/db')
const result = require('../util/result')
const config = require('../util/config')
const { stat } = require('fs')

const router = express.Router()



router.post('/register', async (req, res) => {
    const { first_name, last_name, email,password,mobile,birth} = req.body
    //const { name, email, password, mobile, city } = req.body
    const sql = `INSERT into users(first_name, last_name, email,password,mobile,birth) values (?,?,?,?,?,?)`
    try {
        const hashPassword = await bcrypt.hash(password, config.saltRounds)
        pool.query(sql, [first_name, last_name, email, hashPassword, mobile, birth], (error, data) => {
            res.send(result.createResult(error, data))

            // res.send({ status: 'success', data: { name, email, mobile, city } })


        })

    } catch (error) {
        res.send({ status: 'error', error: 'Register Failed ' })
    }
})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    const sql = `SELECT * from users where email = ?`
    pool.query(sql, [email, password], async (error, data) => {
        if (data != '') {
            const user = data[0]
            const result = await bcrypt.compare(password, user.password)
            if (result) {
                const payload = {
                    uid: user.uid
                }

                const token = jwt.sign(payload, config.secret)

                const userData = {
                    token: token,
                    name: user.name,
                    email: user.email

                }
                res.send({ status: 'success', data: userData })
            } else {
                res.send({ status: 'error', error: 'Invalid password' })
            }
        }
        else {
            res.send({ status: 'error', error: "Invalid email" })
        }
    })
})


router.get('/profile', (req, res) => {
  const sql = `SELECT first_name, last_name, email, mobile FROM users WHERE user_id = ?`
  pool.query(sql, [req.headers.userid], (error, data) => {
    res.send(result.createResult(error, data))
  })
})

router.put('/profile', (req, res) => {
  const { first_name, last_name, mobile } = req.body
  const sql = `UPDATE users SET first_name=?, last_name=?, mobile=? WHERE user_id = ?`
  pool.query(
    sql,
    [first_name, last_name, mobile, req.headers.userid],
    (error, data) => {
      res.send(result.createResult(error, data))
    }
  )
})

//get emails of users other than logged in user for review sharing
router.get('/emails',(req,res)=>{
    const user_id = req.headers.userid
    const sql = "SELECT first_name,last_name,email from users where user_id != ?"
    pool.query(sql,[user_id],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})
module.exports = router