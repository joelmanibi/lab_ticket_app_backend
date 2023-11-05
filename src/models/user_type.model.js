module.exports = (sequelize, Sequelize) => {
    const UserType = sequelize.define("user_type", {
      user_type_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_type_name: {
        type: Sequelize.STRING,
      },
    },
      {
          timestamps: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return UserType;
};