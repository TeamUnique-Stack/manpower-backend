const express = require('express');
const router = express.Router();
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
  getDashboardStats
} = require('../controllers/employeeController');
const { protect, authorize } = require('../middleware/auth');
const {
  employeeValidation,
  idValidation,
  validate
} = require('../middleware/validation');

// Protect all routes
router.use(protect);

router.get('/stats/overview', getEmployeeStats);
router.get('/stats/dashboard', getDashboardStats);

router
  .route('/')
  .get(getEmployees)
  .post(authorize('admin', 'manager'), employeeValidation, validate, createEmployee);

router
  .route('/:id')
  .get(idValidation, validate, getEmployee)
  .put(authorize('admin', 'manager'), idValidation, employeeValidation, validate, updateEmployee)
  .delete(authorize('admin'), idValidation, validate, deleteEmployee);

module.exports = router;

// Made with Bob
