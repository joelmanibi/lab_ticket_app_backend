const db = require("../models");
const User = db.user;
checkDuplicateUser = (req, res, next) => {
  // User number
  User.findOne({
    where: {
      user_phone: req.body.user_phone
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! USER NUMBER is already in use!"
      });
      return;
    }
    // Email
    //User.findOne({
    //  where: {
    //    user_email: req.body.user_email
   //   }
   // }).then(user => {
    //  if (user) {
      //  res.status(400).send({
      //    message: "Failed! Email is already in use!"
     //   });
     //   return;
     // }
    //  next();
    //});
    next();
  });
};

const verifySignUp = {
    checkDuplicateUser: checkDuplicateUser,
  };
  module.exports = verifySignUp;