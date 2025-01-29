
const express = require("express");
const { 
  getEmployees, 
  addEmployee, 
  updateEmployee, 
  deleteEmployee, 
  getStatistics 
} = require("../controllers/employeeController");
const validateEmployee = require("../middlewares/validateEmployee");

const router = express.Router();

// Employee Routes
router.get("/", getEmployees);          // Get paginated employees
router.post("/", validateEmployee, addEmployee); // Add new employee with validation
router.put("/:id", validateEmployee, updateEmployee); // Update employee details
router.delete("/:id", deleteEmployee); // Delete an employee
router.get("/statistics", getStatistics); // Get employee statistics

module.exports = router;
