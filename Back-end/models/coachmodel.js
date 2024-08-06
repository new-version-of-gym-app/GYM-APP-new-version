const db = require("../database.js");

const getCoachs = () => {
  return new Promise((resolve, reject) => {
    const qr = "SELECT username, lastname, photo FROM users WHERE role = 'coach'";
    db.query(qr, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

module.exports = {
  getCoachs
};
