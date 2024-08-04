const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.put('/update/:id', userController.updateProfileController);

module.exports = router;