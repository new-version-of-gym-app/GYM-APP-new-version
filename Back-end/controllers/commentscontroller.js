const commentmodel = require('../models/comments.js')




exports.createcommentcontroller  = (req,res)=>{
const cmt_txt = req.body.cmt_txt 
const user_id = req.params.user_id
const feed_id = req.params.feed_id
 commentmodel.createcomment(cmt_txt,user_id,feed_id).then((result)=>{
  res.send(result).status(200)
 }).catch((err)=>{
    res.send(err).status(404)
 })
}


exports.getcommentinformationcontroller = (req,res)=>{
    const feed_id = req.params.feed_id
commentmodel.getcommentinformation(feed_id).then((result)=>{
 res.send(result).status(200)
}).catch((err)=>{
    res.send(err).status(404)
})
}

exports.commentCountController = (req, res) => {
    const feed_id = req.params.feed_id;
  
    commentmodel.commentcountmodel(feed_id)
      .then((count) => {
        res.status(200).send(count);
      })
      .catch((err) => {
        res.status(500).send({ error: err.message });
      });
  };