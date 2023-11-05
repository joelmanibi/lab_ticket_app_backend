const db = require("../models");
const config = require("../../config/auth.config");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signupCustomer = (req, res) => {
  // Save User to Database
  User.create({
    user_firstname: req.body.user_firstname,
    user_lastname: req.body.user_lastname,
    user_phone: req.body.user_phone,
    user_role: 4,
    user_isActive: 1,
    user_password: bcrypt.hashSync(req.body.user_password, 8)
  })
    .then(user => {
      var token = jwt.sign({ user_id: user.user_id }, config.secret, {
        expiresIn: 60480000 // 23 mois
      });
      User.update(
        {
          user_token: token,
        },
        {
          where: { user_id: user.user_id },
        }
      );
      res.status(200).json({
        id_user: user.user_id,
        user_firstname: req.body.user_firstname,
        user_lastname: req.body.user_lastname,
        user_phone: user.user_phone,
        user_token: token,
        statutcode: 1
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signupSudoer = (req, res) => {
  // Save User to Database
  User.create({
    user_firstname: req.body.user_firstname,
    user_lastname: req.body.user_lastname,
    user_phone: req.body.user_phone,
    user_role: 1,
    user_isActive: 1,
    user_password: bcrypt.hashSync(req.body.user_password, 8)
  })
    .then(user => {
      var token = jwt.sign({ user_id: user.user_id }, config.secret, {
        expiresIn: 3600 // 1h
      });
      User.update(
        {
          user_token: token,
        },
        {
          where: { user_id: user.user_id },
        }
      );
      res.status(200).json({
        id_user: user.user_id,
        user_firstname: req.body.user_firstname,
        user_lastname: req.body.user_lastname,
        user_phone: user.user_phone,
        user_token: token,
        statutcode: 1
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.active = (req,res ) => {
  User.update(
    {
      user_isActive: req.body.user_isActive,
    },
    {
      where: { user_id: req.body.user_id },
    }
  ).then(user => {
    res.status(200).json({
      active_message: "effectué avec succes",
      statutcode: 1
    });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
  
}

exports.updateUserInfo = (req,res ) => {
  User.update(
    {
      user_firstname: req.body.user_firstname,
      user_lastname: req.body.user_lastname,
      user_role: req.body.user_role,
      user_phone: req.body.user_phone
    },
    {
      where: { user_id: req.body.user_id },
    }
  ).then(user => {
    res.status(200).json({
      active_message: "Mise a jours utilisateur effectué avec succes",
      statutcode: 1
    });
  }).catch(err => {
    res.status(500).send({ message: err.message });
  });
  
}

exports.resetPassword = (req, res) => {
  User.findOne({
    where: {
      user_id: req.body.user_id
    }
  }).then(user => {
      if (!user) {
        return res.status(404).json({ message: "Aucun utilisateur trouver ou desactivé", statutcode: 0 });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.user_password,
        user.user_password
      );

      if (!passwordIsValid) {
        return res.status(401).json({
          accessToken: null,
          message: "Ancien Mot de passe incorrecte",
          statutcode: 0
        });
      }

      User.update(
        {
          user_password: bcrypt.hashSync(req.body.user_newpassword, 8)
        },
        {
          where: { user_id: user.user_id },
        }
      );
        //console.log(token)
      res.status(200).json({
        message: "Mot de passe modifier avec succes",
        statutcode: 1
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message,
        statutcode: 0
       });

    });
};

exports.signinCustomer = (req, res) => {
  User.findOne({
    where: {
      user_phone: req.body.user_phone,
      user_isActive: 1,
     // user_role:4

    }
  }).then(user => {
      if (!user) {
        return res.status(404).json({ message: "Aucun utilisateur trouver ou desactivé", statutcode: 0 });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.user_password,
        user.user_password
      );

      if (!passwordIsValid) {
        return res.status(401).json({
          accessToken: null,
          message: "Mot de passe invalide",
          statutcode: 0
        });
      }
      var token = jwt.sign({ user_id: user.user_id }, config.secret, {
        expiresIn: 60480000 // 23 mois
      });

      User.update(
        {
          user_token: token,
        },
        {
          where: { user_id: user.user_id },
        }
      );
        //console.log(token)
      res.status(200).json({
        user_id: user.user_id,
        user_firstname: user.user_firstname,
        user_lastname: user.user_lastname,
        user_phone: user.user_phone,
        user_token: user.user_token,
        statut: 1
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message,
        statutcode: 0
       });

    });
};

exports.signinSudoer = (req, res) => {
  User.findOne({
    where: {
      user_phone: req.body.user_phone,
      user_isActive: 1,
      user_role:1

    }
  }).then(user => {
      if (!user) {
        return res.status(404).json({ message: "Aucun utilisateur trouver ou desactivé", statutcode: 0 });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.user_password,
        user.user_password
      );

      if (!passwordIsValid) {
        return res.status(401).json({
          accessToken: null,
          message: "Mot de passe invalide",
          statutcode: 0
        });
      }
      var token = jwt.sign({ user_id: user.user_id }, config.secret, {
        expiresIn: 60480000 // 23 mois
      });

      User.update(
        {
          user_token: token,
        },
        {
          where: { user_id: user.user_id },
        }
      );
        //console.log(token)
      res.status(200).json({
        user_id: user.user_id,
        user_firstname: user.user_firstname,
        user_lastname: user.user_lastname,
        user_phone: user.user_phone,
        user_token: user.user_token,
        statut: 1
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message,
        statutcode: 0
       });

    });
};