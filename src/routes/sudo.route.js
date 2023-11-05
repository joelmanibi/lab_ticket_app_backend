const { verifySignUp,authJwt } = require("../middleware");
const controller = require("../controllers/sudo.controller");
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
  
  app.post("/api/sudo/v1/create-news",[authJwt.verifySudoToken], controller.createNews);
  app.post("/api/sudo/v1/create-stadium",[authJwt.verifySudoToken], controller.newStadium);
  app.post("/api/sudo/v1/create-stand",[authJwt.verifySudoToken],upload.array(), controller.NewStand);
  app.post("/api/sudo/v1/create-event",[authJwt.verifySudoToken], controller.NewEvent);
  app.post("/api/sudo/v1/create-ticket-coast",upload.array(),[authJwt.verifySudoToken], controller.AddTicketPrice);
};