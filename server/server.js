const express = require("express")
const cors = require("cors")
const myAuth = require("./util/auth")

const app = express()


app.use(cors())
app.use(express.json())
app.use(myAuth)

app.use('/user',userRoutes);
app.listen(4000,'localhost',()=>{
    console.log("Server listening on 4000")
})