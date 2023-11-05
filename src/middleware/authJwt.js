const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "Aucun token fourni!"
      });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.user_id = decoded.user_id;
      next();
    });
  };

  verifySudoToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send({
        message: "Aucun token fourni!"
      });
    }
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      User.findOne({
        where: {
          user_id: decoded.user_id,
          user_role: 1,
        }
      }).then(user => {
        if (!user) {
          return res.status(401).send({
            message: "Autorisation Super Admin Refusé"
          });
        }
        req.user_id = decoded.user_id;
        next();
      });
      
    });
  };

  

  

  const authJwt = {
    verifyToken: verifyToken,
    verifySudoToken: verifySudoToken,
  };
  module.exports = authJwt;