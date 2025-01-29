
const { Employee, Department } = require("../models");
const { encryptPhone, decryptPhone } = require("../utils/encryptPhone");

// 📌 Get all employees with pagination
exports.getEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;

    const employees = await Employee.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: { model: Department, attributes: ["name"] },
    });

    // Decrypt phone numbers before sending response
    const employeesWithDecryptedPhone = employees.rows.map((emp) => ({
      ...emp.toJSON(),
      phone: decryptPhone(emp.phone),
    }));

    res.status(200).json({
      totalRecords: employees.count,
      totalPages: Math.ceil(employees.count / limit),
      employees: employeesWithDecryptedPhone,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees", error: error.message });
  }
};

// 📌 Add a new employee
exports.addEmployee = async (req, res) => {
  try {
    const { department_id, name, dob, phone, photo, email, salary, status } = req.body;

    // Check for duplicate phone numbers
    const existingEmployee = await Employee.findOne({ where: { phone: encryptPhone(phone) } });
    if (existingEmployee) {
      return res.status(400).json({ message: "Phone number already exists" });
    }

    const newEmployee = await Employee.create({
      department_id,
      name,
      dob,
      phone: encryptPhone(phone),
      photo,
      email,
      salary,
      status,
    });

    res.status(201).json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    res.status(500).json({ message: "Error adding employee", error: error.message });
  }
};

// 📌 Update employee details
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { department_id, name, dob, phone, photo, email, salary, status } = req.body;

    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Encrypt phone before updating
    employee.department_id = department_id;
    employee.name = name;
    employee.dob = dob;
    employee.phone = encryptPhone(phone);
    employee.photo = photo;
    employee.email = email;
    employee.salary = salary;
    employee.status = status;

    await employee.save();
    res.status(200).json({ message: "Employee updated successfully", employee });
  } catch (error) {
    res.status(500).json({ message: "Error updating employee", error: error.message });
  }
};

// 📌 Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByPk(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    await employee.destroy();
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee", error: error.message });
  }
};
// 📌 Get employee statistics
exports.getStatistics = async (req, res) => {
    try {
      const stats = await Employee.sequelize.query(
        `
        SELECT 
          d.name AS department_name,
          MAX(e.salary) AS highest_salary,
          (SELECT JSON_OBJECTAGG(salary_range, employee_count) 
           FROM (
            SELECT 
              CASE 
                WHEN salary BETWEEN 0 AND 50000 THEN '0-50000'
                WHEN salary BETWEEN 50001 AND 100000 THEN '50001-100000'
                ELSE '100000+'
              END AS salary_range,
              COUNT(*) AS employee_count
            FROM employees
            GROUP BY salary_range
           ) AS salary_ranges
          ) AS salary_distribution,
          (SELECT JSON_OBJECTAGG(d.name, JSON_OBJECT('name', e.name, 'age', TIMESTAMPDIFF(YEAR, e.dob, CURDATE()))) 
           FROM employees e
           JOIN departments d ON e.department_id = d.id
           WHERE e.dob = (SELECT MIN(dob) FROM employees WHERE department_id = d.id)
          ) AS youngest_employee_per_department
        FROM employees e
        JOIN departments d ON e.department_id = d.id
        GROUP BY d.name
        `,
        { type: Employee.sequelize.QueryTypes.SELECT }
      );
  
      res.status(200).json({ statistics: stats });
    } catch (error) {
      res.status(500).json({ message: "Error fetching statistics", error: error.message });
    }
  };
  