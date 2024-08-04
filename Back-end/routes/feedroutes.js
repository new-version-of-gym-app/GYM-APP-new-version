const express = require('express')
const feedscontroller = require('../controllers/feedscontroller.js')
const verifycoach = require('../controllers/feedscontroller.js')
const FeedsRouter = express.Router()

FeedsRouter.post('/add/:user_id',verifycoach.verifytoken,feedscontroller.createfeedcontroller)
FeedsRouter.get('/get',feedscontroller.getfeedscontroller)

module.exports = FeedsRouter