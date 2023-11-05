const db = require("../models");
const MyConfig = require("./conf/random")
const Stadium = db.stadium;
const Event_stand = db.event_stand;
const Stadium_stand = db.stadium_stand;
const Event = db.event;
const News = db.news;

const uploadStadium = require("../../helpers/uploadStadium");
const uploadEvent = require("../../helpers/uploadEvent");
const uploadNews = require("../../helpers/uploadNews");
const util = require("util");


exports.newStadium = async (req, res) => {
  const uploadFile = util.promisify(uploadStadium.single('stadium_file'));
    try {
        await uploadFile(req, res);
        // Enregistrement de l'stade dans la base de donnée
        Stadium.create({
          stadium_title: req.body.stadium_title,
          stadium_image: req.file.filename,
          stadium_locate: req.body.stadium_locate,
          stadium_seat_nbr: req.body.stadium_seat_nbr,
          stadium_description:req.body.stadium_description,
          }).then(stadium => {
            res.status(200).json({
              message: "Stade enregistré avec success",
              statutcode: 1
            });
          })
          .catch(err => {
            res.status(500).send({ message: err.message,statutcode: 0 });
          });
        
    } catch (error) {
        console.log(error)
    }
};

exports.createNews = async (req, res) => {
  const uploadFile = util.promisify(uploadNews.single('news_file'));
    try {
        await uploadFile(req, res);
        // Enregistrement de l'stade dans la base de donnée
        News.create({
          news_title: req.body.news_title,
          news_image: req.file.filename,
          news_content: req.body.news_content,
          news_source: req.body.news_source,
          news_author:req.user_id,
          }).then(stadium => {
            res.status(200).json({
              message: "News enregistré avec success",
              statutcode: 1
            });
          })
          .catch(err => {
            res.status(500).send({ message: err.message,statutcode: 0 });
          });
        
    } catch (error) {
        console.log(error)
    }
};


exports.NewStand = (req,res) => {
  //console.log(req.body.stand_title);
    Stadium_stand.create ({
      stand_title : req.body.stand_title,
      stand_stadium : req.body.stand_stadium,
      stand_stadium : req.body.stand_stadium
    }).then(stand => {
      console.log(req.body.stand_title);
      res.json({ message: "Tribune cree avec succes" });
    }).catch(err =>{
      res.json({ message: err.message });
    })
  }

  exports.NewEvent = async (req,res) => {
    //var code = MyConfig.randomCodeGenerator();
    //var date = appointment.setDate(appointment.getDate() + 1); 
    //var year = new Date(date).getUTCFullYear();
   // var year = year.toString();
   // var year = year.substr(2, 2);
   // var Month = new Date(date).getMonth();
   // var Day = new Date(date).getUTCDate();

   const uploadFile = util.promisify(uploadEvent.single('event_file'));
   try {
       await uploadFile(req, res);

    Event.create ({
      event_title : req.body.event_title,
      event_type_e : req.body.event_type_e,
      event_date : req.body.event_date,
      event_hour : req.body.event_hour,
      event_stadium:req.body.event_stadium,
      event_image: req.file.filename
    }).then(stand => {
      res.json({ message: "Evenement cree avec succes" });
    }).catch(err =>{
      res.json({ message: err.message });
    })

  } catch (error) {
    console.log(error)
}
  }


  exports.AddTicketPrice = (req,res) => {
    Event_stand.findOne({
      where: {
        e_s_stand : req.body.e_s_stand,
        e_s_event : req.body.e_s_event
      }
    }).then(check => {
      if(!check){
        Event_stand.create ({
          e_s_stand : req.body.e_s_stand,
          e_s_event : req.body.e_s_event,
          e_s_price : req.body.e_s_price
        }).then(e_stand => {
          res.json({ message: "Cout de tiket cree avec succes",statutcode: 1 });
        }).catch(err =>{
          res.json({ message: err.message,statutcode: 0 });
        })
      }else{
        res.json({ message: "Un prix a deja été crée pour cette categorie de loge",statutcode: 0 });
      }
      
    }).catch(err => {
      res.status(500).send({
        message: err.message,
        statutcode: 0
       });
      });
  }

