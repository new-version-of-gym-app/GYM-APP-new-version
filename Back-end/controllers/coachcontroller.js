const userModel = require('../models/userModel.js');

exports.getCoachsController = (req, res) => {
  userModel.getCoachs()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};
