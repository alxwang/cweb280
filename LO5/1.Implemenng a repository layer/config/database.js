const { Sequelize } = require('sequelize');

// SQLite database configuration
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // Physical file storing data
});

module.exports = sequelize;