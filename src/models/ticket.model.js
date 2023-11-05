module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("ticket", {
        ticket_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ticket_code:{
        type: Sequelize.STRING,
      },
      ticket_stand:{
        type: Sequelize.INTEGER,
      },
      ticket_event:{
        type: Sequelize.INTEGER,
      },
      ticket_price:{
        type: Sequelize.INTEGER,
      },
      ticket_state_e:{
        type: Sequelize.INTEGER,
      },

    });
      return Ticket;
};