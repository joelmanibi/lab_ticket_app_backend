module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      user_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_firstname: {
        type: Sequelize.STRING
      },
      user_lastname: {
        type: Sequelize.STRING
      },
      user_role: {
        type: Sequelize.INTEGER
      },
      user_phone: {
        type: Sequelize.STRING
      },
      user_password: {
        type: Sequelize.STRING
      },
      user_token: {
        type: Sequelize.STRING
      },
      user_isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },

    },
      {
          timestamps: false,
          // If don't want createdAt
          createdAt: false,
          // If don't want updatedAt
          updatedAt: false,
      });
      return User;
};