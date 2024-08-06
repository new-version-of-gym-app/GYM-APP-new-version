const db = require("../database.js");

exports.getcoachsmodel = () => {
  return new Promise((resolve, reject) => {
    const qr =
      "select user_id , username , photo , role , phone from users where role = 'coach' ORDER BY created_at DESC";
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
