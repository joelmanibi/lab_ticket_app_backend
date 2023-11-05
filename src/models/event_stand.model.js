module.exports = (sequelize, Sequelize) => {
    const Event_stand = sequelize.define("event_stand", {
      e_s_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      e_s_stand:{
        type: Sequelize.INTEGER,
      },
      e_s_event:{
        type:Sequelize.INTEGER
      },
      e_s_status:{
        type:Sequelize.BOOLEAN
      },
      e_s_price:{
        type:Sequelize.INTEGER
      }

    });
      return Event_stand;
};