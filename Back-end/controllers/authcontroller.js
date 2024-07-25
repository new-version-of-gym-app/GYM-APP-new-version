const authmodel = require('../models/authmodel.js')

exports.registercontroller = (req,res)=>{
    const email = req.body.email
    const password = req.body.password
   const username = req.body.username
    const lastname = req.body.lastname
   const  photo = req.body.photo
   const  role = req.body.role
  authmodel.registermodel(email,password,username,lastname,photo,role).then((user)=>{
res.send({
    status:user.status , 
    message:user.message,
    name : user.username , 
    lastname : user.lastname
})
  }).catch((err)=>{
   res.send({
    err :  err.sqlMessage
   })
  })
}

exports.logincontroller =  (req,res)=>{
  const email = req.body.email
  const password = req.body.password
 authmodel.loginmodel(email,password).then((result)=>{
  res.send({
    token:result
  })
 }).catch((err)=>{
  res.send(err)
 })


}