const userModel = require('../models/userModel.js');

exports.updateProfileController = (req, res) => {
    const id = req.params.id;
    const { username, phone } = req.body;
  
    userModel.updateUserProfile(id, username, phone).then((user) => {
      res.send({
        status: user.status,
        message: user.message,
        username: user.username,
        phone: user.phone,
      });
    }).catch((err) => {
      res.send({
        error: err.sqlMessage,
      });
    });
  };