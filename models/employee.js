
 const { DataTypes } = require("sequelize");
 const sequelize = require("../config/database");

const Employee = sequelize.define("Employee", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    department_id: { type: DataTypes.INTEGER, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    dob: { type: DataTypes.DATEONLY, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    photo: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    salary: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.BOOLEAN, defaultValue: true },
    created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    modified: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    timestamps: false,
    tableName: "employees"
  });
  module.exports = Employee;