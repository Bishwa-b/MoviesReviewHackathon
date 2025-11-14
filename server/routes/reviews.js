const express = require("express")
const pool = require('../util/db')
const result = require('../util/result')

const router = express.Router()

//display all reviews
router.get('/',(req,res)=>{
    const sql = "SELECT * FROM reviews"
    pool.query(sql,(error,data)=>{
        res.send(result.createResult(error,data))
    })
})
//post a specific movie review
router.post('/', (req, res) => {
    const { movie_id,review,rating,time }= req.body
    const user_id = req.headers.userid;
    const sql = "INSERT INTO reviews(movie_id,review,rating,user_id,modified) VALUES(?,?,?,?,?)"
    pool.query(sql,[movie_id,review,rating,user_id,time], (error, data) => {
        res.send(result.createResult(error, data))
      })

})
//get specific user reviews
router.get('/user',(req,res)=>{
    const user_id = req.headers.userid;
    const sql = "SELECT * FROM reviews where user_id=?"
    pool.query(sql,[user_id],(error,data)=>{
        res.send(result.createResult(error,data))
    })
    
})

//get reviews shared with me
router.get('/sharedwithme',(req,res)=>{
    const user_id = req.headers.userid;
   
    const sql = "SELECT review,rating FROM reviews where id = any( select review_id from shares where user_id = ?)"
    pool.query(sql,[user_id],(error,data)=>{
        res.send(result.createResult(error,data))
    })
    
})

//share with other user
router.post('/share',(req,res)=>{
    const { shareuser_id,review_id } = req.body
    const sql = "INSERT INTO shares(user_id,review_id) VALUES(?,?)"
    pool.query(sql,[shareuser_id,review_id],(error,data)=>{
        res.send(result.createResult(error,data))
    })
})

module.exports = router