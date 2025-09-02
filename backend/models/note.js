const { Sequelize, DataTypes } = require('sequelize')
const path = require('path')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database/zoomapp.sqlite'),
})

const Note = sequelize.define('Note', {
  text: { type: DataTypes.STRING, allowNull: false },
})

sequelize.sync()

module.exports = { sequelize, Note }
