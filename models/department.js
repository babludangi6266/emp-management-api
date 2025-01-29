const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Department = sequelize.define("Department", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    modified: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    timestamps: false,
    tableName: "departments"
  });
  
module.exports = Department;
