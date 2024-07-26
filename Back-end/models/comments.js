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
      "select  username ,cmt_txt  from feeds join users on users.user_id = feeds.user_id join comments on comments.user_id = users.user_id where feed_id = ? ";

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
