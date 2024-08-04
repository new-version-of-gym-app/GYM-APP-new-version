const feedmodel = require("../models/feedsmodel.js");
const jwt = require("jsonwebtoken");
//feeds
exports.createfeedcontroller = (req, res) => {
  const feed_text = req.body.text;
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
  const token = req.headers?.authorization; // Access header directly as a string
  if (!token) {
    console.log("no token generated");
    return res.status(404).json("no token generated !!");
  }

  const cleanedToken = token.startsWith('Bearer ') ? token.slice(7).trim() : token;

  try {
    const verifytoken = await jwt.verify(cleanedToken, privatekey);
    if (verifytoken.role === "coach") {
      console.log("token verified and role is coach");
      return next();
    } else {
      return res.status(400).send("access only for coach");
    }
  } catch (err) {
    console.error("Token verification failed:", err);
    return res.status(404).json("token is invalid !!");
  }
};

