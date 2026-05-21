const { body, param, validationResult } = require('express-validator');

// Validation error handler
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// Auth validation rules
exports.registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  
  body('role')
    .optional()
    .isIn(['admin', 'manager', 'user']).withMessage('Invalid role')
];

exports.loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
];

// Employee validation rules
exports.employeeValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone is required')
    .matches(/^[0-9]{10}$/).withMessage('Phone must be 10 digits'),
  
  body('role')
    .notEmpty().withMessage('Role is required')
    .isString().withMessage('Role must be a string'),
  
  body('skillLevel')
    .optional()
    .isIn(['Entry-level', 'Mid-level', 'Senior-level', 'Expert']).withMessage('Invalid skill level'),
  
  body('state')
    .notEmpty().withMessage('State is required'),
  
  body('city')
    .notEmpty().withMessage('City is required'),
  
  body('cityClassification')
    .optional()
    .isIn(['Metro', 'Tier-1', 'Tier-2/3']).withMessage('Invalid city classification'),
  
  body('status')
    .optional()
    .isIn(['Active', 'Inactive', 'On Leave']).withMessage('Invalid status'),
  
  body('salaryStructure.basicSalary')
    .optional()
    .isNumeric().withMessage('Basic salary must be a number')
    .isFloat({ min: 0 }).withMessage('Basic salary must be positive')
];

// Customer validation rules
exports.customerValidation = [
  body('companyName')
    .trim()
    .notEmpty().withMessage('Company name is required')
    .isLength({ min: 2, max: 100 }).withMessage('Company name must be between 2 and 100 characters'),
  
  body('contactPerson')
    .trim()
    .notEmpty().withMessage('Contact person is required'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone is required')
    .matches(/^[0-9]{10}$/).withMessage('Phone must be 10 digits'),
  
  body('address.state')
    .notEmpty().withMessage('State is required'),
  
  body('address.city')
    .notEmpty().withMessage('City is required'),
  
  body('status')
    .optional()
    .isIn(['Active', 'Inactive', 'Pending']).withMessage('Invalid status')
];

// ID parameter validation
exports.idValidation = [
  param('id')
    .isMongoId().withMessage('Invalid ID format')
];

// Made with Bob