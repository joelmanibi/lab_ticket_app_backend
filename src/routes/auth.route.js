const { verifySignUp,authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");
var multer = require('multer');
var upload = multer();

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post(
    "/api/auth/signup-sudo",
    upload.array(),
    [
      verifySignUp.checkDuplicateUser,
    ],
    controller.signupSudoer
  );
  app.post(
    "/api/auth/signup-customer",
    upload.array(),
    [
      verifySignUp.checkDuplicateUser,
    ],
    controller.signupCustomer
  );
  app.post(
    "/api/auth/active",
    [
      authJwt.verifySudoToken,
    ],
    controller.active
  );
  app.post("/api/auth/signin-customer",upload.array(), controller.signinCustomer);
  app.post("/api/auth/signin-sudoer",upload.array(), controller.signinSudoer);
  app.post("/api/auth/update-user-info",upload.array(),controller.updateUserInfo);
  app.post("/api/auth/reset-password",upload.array(),controller.resetPassword);
};