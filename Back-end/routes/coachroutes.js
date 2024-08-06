const express = require('express')
const coachcontroller = require('../controllers/coachcontroller')
const coachroute = express.Router()

coachroute.get('/coach',coachcontroller.getcoachcontroller)

module.exports = coachroute
