const feedmodel = require("../models/feedsmodel.js");
const jwt = require("jsonwebtoken");
//feeds
exports.createfeedcontroller = (req, res) => {
  const feed_text = req.body.feed_text;
  const user_id = req.params.user_id;

  feedmodel
    .createfeedmodel(feed_text, user_id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err.sqlMessage,
      });
    });
};

exports.getfeedscontroller = (req, res) => {
  feedmodel
    .getffedmodel()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

const privatekey = "this my private key hahahahahahahaha";

exports.verifytoken = async (req, res, next) => {
  const token = req.headers?.token;
  if (!token) {
    return res.json("no token generated !!").status(404);
  }
  token = token.slice(7, token.length).trim();

  try {
    const verifytoken = await jwt.verify(token, privatekey);
    if (verifytoken.role === "coach") {
      return next();
    } else {
      res.send("access only for coach").status(400);
    }
  } catch (err) {
    res.json("token is invalid !!").status(404);
  }
};
