const express = require ('express')
const database = require('./database.js')


//// require routes :
const authrouter = require('./routes/authroutes.js')
const FeedsRouter = require('./routes/feedroutes.js')
const commentrouter = require('./routes/commentsroutes.js')

const app = express ()
app.use(express.json())




/// routes : 
app.use('/',authrouter)
app.use('/',FeedsRouter)
app.use('/',commentrouter)








app.listen(5000,()=>{
    console.log('server is running on port 5000 !!! ')
})