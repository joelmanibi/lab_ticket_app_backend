module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
        event_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      event_title:{
        type: Sequelize.STRING,
      },
      event_type_e:{
        type:Sequelize.INTEGER
      },
      event_date:{
        type: Sequelize.DATE
      },
      event_hour:{
        type:Sequelize.INTEGER
      },
      event_stadium:{
        type:Sequelize.INTEGER
      },
      event_image:{
        type: Sequelize.STRING,
      },

    });
      return Event;
};