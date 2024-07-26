const express = require('express')
const feedscontroller = require('../controllers/feedscontroller.js')
const FeedsRouter = express.Router()

FeedsRouter.post('/add/:user_id',feedscontroller.createfeedcontroller)
FeedsRouter.get('/get',feedscontroller.getfeedscontroller)

module.exports = FeedsRouter