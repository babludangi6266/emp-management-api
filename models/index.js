const Employee = require("./employee");
const Department = require("./department");

// Define Relationships
Department.hasMany(Employee, { foreignKey: "department_id" });
Employee.belongsTo(Department, { foreignKey: "department_id" });

module.exports = { Employee, Department };
