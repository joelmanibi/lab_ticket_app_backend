const config = require("../../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//importation de fichier
db.user = require("./user.model.js")(sequelize, Sequelize);
db.user_type = require("./user_type.model.js")(sequelize, Sequelize);
db.stadium = require("./stadium.model.js")(sequelize, Sequelize);
db.stadium_stand = require("./stadium_stand.model.js")(sequelize, Sequelize);
db.event_stand = require("./event_stand.model.js")(sequelize, Sequelize);
db.stadium = require("./stadium.model.js")(sequelize, Sequelize);
db.event = require("./event.model.js")(sequelize, Sequelize);
db.event_type = require("./event_type.model.js")(sequelize, Sequelize);
db.ticket = require("./ticket.model.js")(sequelize, Sequelize);
db.ticket_state = require("./ticket_state.model.js")(sequelize, Sequelize);
db.payment = require("./payment.model.js")(sequelize, Sequelize);
db.booking = require("./booking.model.js")(sequelize, Sequelize);
db.hour = require("./hour.model.js")(sequelize, Sequelize);
db.news = require("./news.model.js")(sequelize, Sequelize);
db.news_comments = require("./news_comments.model.js")(sequelize, Sequelize);


/////toutes les realtion many to many
//db.user.belongsToMany(db.company, { through: 'company_admin' });
//db.company.belongsToMany(db.user, { through: 'company_admin' });

/////toutes les realtion one to many
db.user_type.hasMany(db.user, { foreignKey: 'user_role' });
db.user.belongsTo(db.user_type,{ foreignKey: 'user_role'});

db.stadium.hasMany(db.stadium_stand, { foreignKey: 'stand_stadium' });
db.stadium_stand.belongsTo(db.stadium,{ foreignKey: 'stand_stadium'});

db.stadium_stand.hasMany(db.event_stand, { foreignKey: 'e_s_stand' });
db.event_stand.belongsTo(db.stadium_stand,{ foreignKey: 'e_s_stand'});

db.event.hasMany(db.event_stand, { foreignKey: 'e_s_event' });
db.event_stand.belongsTo(db.event,{ foreignKey: 'e_s_event'});

db.news.hasMany(db.news_comments, { foreignKey: 'newsComment_news' });
db.news_comments.belongsTo(db.news,{ foreignKey: 'newsComment_news'});

db.user.hasMany(db.news_comments, { foreignKey: 'newsComment_author' });
db.news_comments.belongsTo(db.user,{ foreignKey: 'newsComment_author'});

db.user.hasMany(db.news, { foreignKey: 'news_author' });
db.news.belongsTo(db.user,{ foreignKey: 'news_author'});

db.stadium.hasMany(db.event, { foreignKey: 'event_stadium' });
db.event.belongsTo(db.stadium,{ foreignKey: 'event_stadium'});

db.event_type.hasMany(db.event, { foreignKey: 'event_type_e' });
db.event.belongsTo(db.event_type,{ foreignKey: 'event_type_e'});

db.hour.hasMany(db.event, { foreignKey: 'event_hour' });
db.event.belongsTo(db.hour,{ foreignKey: 'event_hour'});

db.ticket_state.hasMany(db.ticket, { foreignKey: 'ticket_state_e' });
db.ticket.belongsTo(db.ticket_state,{ foreignKey: 'ticket_state_e'});

db.event.hasMany(db.ticket, { foreignKey: 'ticket_event' });
db.ticket.belongsTo(db.event,{ foreignKey: 'ticket_event'});

db.event_stand.hasMany(db.ticket, { foreignKey: 'ticket_stand' });
db.ticket.belongsTo(db.event_stand,{ foreignKey: 'ticket_stand'});

db.user.hasMany(db.booking, { foreignKey: 'booking_booker' });
db.booking.belongsTo(db.user,{ foreignKey: 'booking_booker'});

db.payment.hasMany(db.booking, { foreignKey: 'booking_payment' });
db.booking.belongsTo(db.payment,{ foreignKey: 'booking_payment'});

db.ticket.hasMany(db.booking, { foreignKey: 'booking_ticket' });
db.booking.belongsTo(db.ticket,{ foreignKey: 'booking_ticket'});


module.exports = db;






