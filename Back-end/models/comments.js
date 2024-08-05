const db = require("../database.js");

exports.createcomment = (cmt_txt, user_id, feed_id) => {
  return new Promise((resolve, reject) => {
    const qr = "insert into comments (cmt_txt,user_id,feed_id) values(?,?,?)";
    db.query(qr, [cmt_txt, user_id, feed_id], (err, result) => {
      if (err) {
        reject(err);
      }
      if (result) {
        resolve("new comment was added !! ");
      }
    });
  });
};

exports.getcommentinformation = (feeds_id) => {
  return new Promise((resolve, reject) => {
    const qr =
      " select  username ,cmt_txt , feeds_id , photo from users join comments on users.user_id = comments.user_id  join feeds on feeds.feeds_id = comments.feed_id where feeds.feeds_id = ? ";

      db.query(qr,[feeds_id],(err,result)=>{
          if (err){
            reject(err)
          } 
          if (result){
            resolve(result)
          }
      })
  });
};


exports.commentcountmodel = (feed_id)=>{
  return new Promise((resolve,reject)=>{
    const qr = "select count(*) as count from comments where feed_id = ?"
    db.query(qr,[feed_id],(err,result)=>{
      if (err){
        reject(err)
      }
      if (result){
        
        resolve(result[0])
       
      }

    })
  })
}
