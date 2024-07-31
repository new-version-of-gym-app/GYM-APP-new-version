const feedmodel = require("../models/feedsmodel.js");
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

exports.getfeedscontroller = (req,res)=>{
    feedmodel.getffedmodel().then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(404).json(err)
    })

}