module.exports = (sequelize, Sequelize) => {
    const Ticket_state = sequelize.define("ticket_state", {
        ticket_state_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      ticket_state_title:{
        type: Sequelize.STRING,
      }

    });
      return Ticket_state;
};