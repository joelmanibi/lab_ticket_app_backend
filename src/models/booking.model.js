module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("booking", {
        booking_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      booking_booker:{
        type: Sequelize.INTEGER,
      },
      booking_payment:{
        type: Sequelize.INTEGER,
      },
      booking_ticket:{
        type: Sequelize.INTEGER,
      },
    });
      return Booking;
};