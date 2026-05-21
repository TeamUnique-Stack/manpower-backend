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

// Stats routes - with protect only
router.get('/stats/overview', protect, getEmployeeStats);
router.get('/stats/dashboard', protect, getDashboardStats);

// Employee CRUD routes - with explicit middleware
router.get('/', protect, getEmployees);
router.post('/', protect, (req, res, next) => {
  // Check authorization inline
  if (!['admin', 'manager'].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: `User role ${req.user.role} is not authorized to access this route`
    });
  }
  next();
}, createEmployee);

router.get('/:id', protect, getEmployee);
router.put('/:id', protect, (req, res, next) => {
  // Check authorization inline
  if (!['admin', 'manager'].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: `User role ${req.user.role} is not authorized to access this route`
    });
  }
  next();
}, updateEmployee);

router.delete('/:id', protect, (req, res, next) => {
  // Check authorization inline
  if (!['admin'].includes(req.user.role)) {
    return res.status(403).json({
      success: false,
      message: `User role ${req.user.role} is not authorized to access this route`
    });
  }
  next();
}, deleteEmployee);

module.exports = router;

// Made with Bob
