const express = require ('express')
const database = require('./database.js')
const authrouter = require('./routes/authroutes.js')

const app = express ()
app.use(express.json())
app.use('/',authrouter)



app.listen(5000,()=>{
    console.log('server is running on port 5000 !!! ')
})