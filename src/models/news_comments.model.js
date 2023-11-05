module.exports = (sequelize, Sequelize) => {
    const News_comment = sequelize.define("news_comment", {
      newsComment_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      newsComment_content: {
        type: Sequelize.TEXT
      },
      newsComment_author: {
        type: Sequelize.INTEGER
      },
      newsComment_news: {
        type: Sequelize.INTEGER
      }
    });
    return News_comment;
  };