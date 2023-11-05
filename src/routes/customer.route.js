const { verifySignUp,authJwt } = require("../middleware");
const controller = require("../controllers/customer.controller");
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
  //getAllEvent
  app.post("/api/sudo/v1/booking",upload.array(),[authJwt.verifyToken], controller.Booking);
  app.get("/api/sudo/v1/get-my-booking",upload.array(), controller.getAllMyBooking);
  app.get("/api/sudo/v1/get-all-event",upload.array(),[authJwt.verifyToken], controller.getAllEvent);
  app.get("/api/sudo/v1/get-all-news",upload.array(), controller.getAllNews);
  app.post("/api/sudo/v1/add-comment-to-news",upload.array(),[authJwt.verifyToken], controller.AddCommentToNews);
  app.get("/api/customer/v1/get-all-event-stand/:event",
      upload.array(),
    //  [authJwt.verifyToken], getAllMyBooking
      controller.getAllEventStand
    );
    app.get("/api/customer/v1/get-all-news-comment/:news",
      upload.array(),
    //  [authJwt.verifyToken], getAllMyBooking
      controller.getAllNewsComment
    );
};