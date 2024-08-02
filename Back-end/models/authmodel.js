const db = require("../database.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registermodel = async (
  email,
  password,
  username,
  lastname,
  photo,
  role,
  phone
) => {
  try {
    const hashedpassword = await bcrypt.hash(password, 10);
    const qr =
      "INSERT INTO users (email, password, username, lastname, photo, role,phone) VALUES (?, ?, ?, ?, ?, ?, ?)";

    return new Promise((resolve, reject) => {
      db.query(
        qr,
        [email, hashedpassword, username, lastname, photo, role, phone],
        (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              status: "success",
              message: "new user is registred !!",
              email: email,
              username: username,
              lastname: lastname,
              photo: photo,
              role: role,
              password: hashedpassword,
            });
          }
        }
      );
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

const privatekey = "this my private key hahahahahahahaha";

exports.loginmodel = (email, password) => {
  return new Promise((resolve, reject) => {
    const qr = "select email from users where email = ? ";
    db.query(qr, [email], (err, result) => {
      if (err) {
        reject(err);
      }
      if (result.length === 0) {
        reject({
          msg: "incorrect email or password",
        });
      } else {
        const qrr = "select * from users where email = ? ";
        db.query(qrr, [email], async (err, result) => {
          try {
            if (err) {
              reject(err);
            }
            if (result) {
              console.log("model result :", result);
              const verif = await bcrypt.compare(password, result[0].password);
              if (verif) {
                const token = await jwt.sign(
                  {
                    role: result[0].role,
                    username: result[0].username,
                    lastname: result[0].lastname,
                    id: result[0].user_id,
                  },
                  privatekey,

                  {
                    expiresIn: "1h",
                  }
                );
                resolve({
                  msg: "login successfull",
                  username: result[0].username,
                  role: result[0].role,
                  token: token,
                  id: result[0].user_id,
                  photo: result[0].photo,
                  email: result[0].email,
                  phone: result[0].phone,
                });
              } else {
                reject({
                  msg: "wrong email or password !! ",
                });
              }
            }
          } catch (err) {
            reject(err);
          }
        });
      }
    });
  });
};
