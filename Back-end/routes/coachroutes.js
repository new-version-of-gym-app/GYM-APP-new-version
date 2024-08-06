const express = require('express');
const router = express.Router();
const coachController = require('../controllers/coachcontroller.js');

router.get('/coachs', coachController.getCoachsController);

module.exports = router;
