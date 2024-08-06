const model = require("../models/coachmodel.js");

exports.getcoachcontroller = (req, res) => {
  model
    .getcoachsmodel()
    .then((response) => {
      res.json(response).status(200);
    })
    .catch((err) => {
      res.json(err).status(400);
    });
};
