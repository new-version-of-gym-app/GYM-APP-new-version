const express= require('express')
const commentcontroller = require('../controllers/commentscontroller.js')
const commentrouter = express.Router()




commentrouter.post('/addcomment/:user_id/:feed_id',commentcontroller.createcommentcontroller)
commentrouter.get('/getcomments/:feed_id',commentcontroller.getcommentinformationcontroller)
commentrouter.get('/count/:feed_id',commentcontroller.commentCountController)


module.exports = commentrouter
