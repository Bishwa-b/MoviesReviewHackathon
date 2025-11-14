const express = require("express")
const cors = require("cors")

const userRoutes = require("./routes/user")
const reviewRoutes = require("./routes/reviews")
const moviesRoutes = require("./routes/movies")
const myAuth = require("./util/auth")


const app = express()


app.use(cors())
app.use(express.json())
//app.use(myAuth)

app.use('/user',userRoutes)
app.use('/movie',moviesRoutes)
app.use('/review',reviewRoutes)


app.listen(4000,'localhost',()=>{
    console.log("Server listening on 4000")
})