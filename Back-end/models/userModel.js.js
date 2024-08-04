
const db = require("../database.js");

exports.updateUserProfile = async (id, username, phone) => {
  const qr = "UPDATE users SET username = ?, phone = ? WHERE user_id = ?";
  return new Promise((resolve, reject) => {
    db.query(qr, [username, phone, id], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          status: "success",
          message: "User profile updated successfully!",
          username: username,
          phone: phone,
        });
      }
    });
  });
};