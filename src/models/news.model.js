module.exports = (sequelize, Sequelize) => {
    const News = sequelize.define("news", {
      news_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      news_title: {
        type: Sequelize.STRING
      },
      news_content: {
        type: Sequelize.TEXT
      },
      news_source: {
        type: Sequelize.STRING
      },
      news_author: {
        type: Sequelize.INTEGER
      },
      news_image: {
        type: Sequelize.STRING
      },
      news_vue: {
        type: Sequelize.INTEGER
      }
    });
    return News;
  };