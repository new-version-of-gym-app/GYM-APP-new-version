const db = require("../database.js");

///// create new feed :

exports.createfeedmodel = (feed_txt, user_id) => {
  return new Promise((resolve, reject) => {
    const qr = "insert into feeds (feed_txt,user_id) values(?,?) ";
    db.query(qr, [feed_txt, user_id], (err, result) => {
      if (err) {
        reject(err);
      }
      if (result) {
        resolve("new feed is added");
      }
    });
  });
};

//// get the feed with informations :

exports.getffedmodel = () => {
  return new Promise((resolve, reject) => {
    const qr =
      "select feed_txt , username , photo , feeds_id , feeds.created_at from feeds  join users   on feeds.user_id = users.user_id";
    db.query(qr, (err, result) => {
      if (err) {
        reject(err);
      }
      if (result) {
        resolve(result);
      }
    });
  });
};
