const express = require('express')
const authcontroller = require('../controllers/authcontroller')
const authrouter = express.Router()

authrouter.post('/register',authcontroller.registercontroller)
authrouter.post('/login',authcontroller.logincontroller)

module.exports = authrouter




