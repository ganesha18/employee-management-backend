const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Employee = sequelize.define('Employee', {
  name: { type: DataTypes.STRING, allowNull: false },
  age: { type: DataTypes.INTEGER, allowNull: false },
  class: { type: DataTypes.STRING },
  subjects: { type: DataTypes.JSONB },
  attendance: { type: DataTypes.JSONB },
});

module.exports = Employee;
