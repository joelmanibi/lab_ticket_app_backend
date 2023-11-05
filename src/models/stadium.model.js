module.exports = (sequelize, Sequelize) => {
    const Stadium = sequelize.define("stadium", {
        stadium_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      stadium_title:{
        type: Sequelize.STRING,
      },
      stadium_locate:{
        type: Sequelize.STRING,
      },
      stadium_seat_nbr:{
        type: Sequelize.STRING,
      },
      stadium_description:{
        type: Sequelize.TEXT,
      },
      stadium_image:{
        type: Sequelize.STRING,
      },

    });
      return Stadium;
};