module.exports = (sequelize, Sequelize) => {
    const Hotel = sequelize.define("hotel", {
        hotel_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
        hotel_name:{
        type: Sequelize.STRING,
      },
      hotel_location:{
        type: Sequelize.INTEGER,
      },
      hotel_phone:{
        type: Sequelize.INTEGER,
      }
    },
    {
        timestamps: false,

        // If don't want createdAt
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,
    });
      return Hotel;
};