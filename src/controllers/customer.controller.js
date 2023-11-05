const db = require("../models");
const MyConfig = require("./conf/random")
const Ticket = db.ticket;
const Ticket_state = db.ticket_state;
const Event = db.event;
const Event_stand = db.event_stand;
const Payment = db.payment;
const Hour = db.hour;
const Stadium = db.stadium;
const News = db.news;
const News_comment = db.news_comments;
const User = db.user;
const Stadium_stand = db.stadium_stand;
const Booking = db.booking;

  exports.Booking = async  (req,res) => {
    //Nous allons compter le nombre de ticket correspondant a la tribune selectionné
    //  ajouter a la variable counticket
    var counticket = await Ticket.count({
      where: { ticket_stand : req.body.ticket_stand },
    });

    //rechercher la tribune selectionné
    Stadium_stand.findOne({
      where: { stadium_stand_id : req.body.ticket_stand },
    }).then(stand => {
      var seat = stand.seat_number;

      /// comparer le nombre de place et le nombre de ticket disponible
      if (seat > counticket){
        var code = MyConfig.randomCodeGenerator();
        const appointment = new Date();
       // console.log(code);
        var date = appointment.setDate(appointment.getDate() + 1); 
        var year = new Date(date).getUTCFullYear();
         var year = year.toString();
         var year = year.substr(2, 2);
        var Month = new Date(date).getMonth();
        var Day = new Date(date).getUTCDate();
        console.log(code);
        var  myticket_code = "TK-" +year+Month+code+req.body.ticket_event+req.body.ticket_stand+Day+"U"+req.user_id;
        
        Ticket.create ({
          ticket_code : myticket_code,
          ticket_stand : req.body.ticket_stand,
          ticket_event : req.body.ticket_event,
          ticket_price : req.body.ticket_price,
          ticket_state_e : 1
          
        }).then(stand => {
          var lastTicketId = stand.ticket_id;
          Payment.create(
            {
              payment_amount:req.body.payment_amount,
              payment_status:req.body.payment_status,
              payment_mode :req.body.payment_mode
            }
          ).then(payment =>{
            var lastPaymentId = payment.payment_id;
            Booking.create({
              booking_booker:req.user_id,
              booking_payment:lastPaymentId,
              booking_ticket : lastTicketId

            }).then(booking =>{
              res.json({ message: "votre reservation a été effectué avec succes" });
            }).catch(err =>{
              res.json({ message: err.message });
            })

          }).catch(err =>{
            res.json({ message: err.message });
          })
          
        }).catch(err =>{
          res.json({ message: err.message });
        })

      }else{
        Event_stand.update(
          {
            e_s_status: 0,
          },
          {
            where: { e_s_id : req.body.ticket_stand },
          })
        res.json({ message: "aucune place disponible" });
      }
      
      
    }).catch(err =>{
      res.json({ message: err.message });
    })
  }

  exports.getAllEvent = (req, res) => {
    Event.findAll(
      {
        include: [
          {
            model: Hour
          },
          {
            model: Stadium
          }
        ],
        order: [['event_id', 'DESC']] // Tri par ordre décroissant de l'ID
      }
    )
      .then(event => {
        if (!event) {
          return res.status(404).send({ message: "Aucun Match trouvé" });
        }
        res.status(200).json({ event });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.getAllNews = (req, res) => {
    News.findAll(
      {
        include: [
          {
            model: User
          }
        ],
        order: [['news_id', 'DESC']] // Tri par ordre décroissant de l'ID
      }
    )
      .then(news => {
        if (!news) {
          return res.status(404).send({ message: "Aucun Match trouvé" });
        }
        res.status(200).json({ news });
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };
  
  exports.AddCommentToNews = (req,res) => {
    //console.log(req.body.stand_title);
    News_comment.create ({
      newsComment_content : req.body.newsComment_content,
      newsComment_author : req.user_id,
      newsComment_news : req.body.newsComment_news
      }).then(comment => {
       
        res.status(200).json({ message: "Commentaire ajouté avec succes" });
      }).catch(err =>{
        res.json({ message: err.message });
      })
    }

  exports.getAllNewsComment = (req, res) => {
    News_comment.findAll(
      {
        where: {
          newsComment_news : req.params.news
        },
        include:[
          {
            model:User
          }
        ]
      }
    )
      .then(news_comments => {
        if (!news_comments){
          return res.status(404).send({ message: "Aucun Commentaire trouvé" });
        }
        res.status(200).json({news_comments});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.getAllEventStand = (req, res) => {
    Event_stand.findAll(
      {
        where: {
          e_s_event : req.params.event
        },
        include:[
          {
            model:Event
          },
          {
            model:Stadium_stand
          }
        ]
      }
    )
      .then(event_s => {
        if (!event_s){
          return res.status(404).send({ message: "Aucune Tribune trouvé" });
        }
        res.status(200).json({event_s});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };

  exports.getAllMyBooking = (req, res) => {
    Booking.findAll(
      {
        where: {
          booking_booker : 1
       //  booking_booker : req.user_id
        },
        include:[
          {
            model:Ticket,
            include:[
              {
                model:Event
              },
              {
                model:Event_stand,
                include:[
                  {
                    model:Stadium_stand
                  }
                ]
              },
              {
                model:Ticket_state
              }
            ]
          }
        ]
      }
    )
      .then(booking => {
        if (!booking){
          return res.status(404).send({ message: "Aucune Reservation trouvé" });
        }
        res.status(200).json({booking});
      }).catch(err => {
        res.status(500).send({ message: err.message });
      });
  };