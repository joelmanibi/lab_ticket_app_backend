module.exports = (sequelize, Sequelize) => {
    const Stadium_stand = sequelize.define("stadium_stand", {
        stadium_stand_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
        stand_title:{
        type: Sequelize.STRING,
      },
        stand_stadium:{
        type: Sequelize.INTEGER,
      },
      seat_number:{
        type: Sequelize.INTEGER,
      }

    });
      return Stadium_stand;
};