module.exports = (sequelize, Sequelize) => {
    const Hour = sequelize.define("hour", {
      hour_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      hour_title: {
        type: Sequelize.STRING
      },
    },
    {
        timestamps: false,

        // If don't want createdAt
        createdAt: false,

        // If don't want updatedAt
        updatedAt: false,
    });
    return Hour;
  };