module.exports = (sequelize, Sequelize) => {
    const Payment = sequelize.define("payment", {
        payment_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      payment_amount:{
        type: Sequelize.STRING,
      },
      payment_status:{
        type: Sequelize.STRING,
      },
      payment_mode:{
        type: Sequelize.STRING,
      },

    });
      return Payment;
};