module.exports = (sequelize, Sequelize) => {
    const Event_type = sequelize.define("event_type", {
        event_type_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      event_type_name:{
        type: Sequelize.STRING
      }

    });
      return Event_type;
};