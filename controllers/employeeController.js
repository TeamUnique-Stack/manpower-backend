const Employee = require('../models/Employee');

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private
exports.getEmployees = async (req, res) => {
  try {
    const { status, role, state, city } = req.query;
    
    // Build query
    let query = {};
    
    if (status) query.status = status;
    if (role) query.role = role;
    if (state) query.state = state;
    if (city) query.city = city;

    const employees = await Employee.find(query)
      .populate('assignedTo', 'companyName')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: employees.length,
      data: employees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single employee
// @route   GET /api/employees/:id
// @access  Private
exports.getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate('assignedTo', 'companyName contactPerson');

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new employee
// @route   POST /api/employees
// @access  Private (Admin/Manager)
exports.createEmployee = async (req, res) => {
  try {
    console.log('=== CREATE EMPLOYEE START ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('User:', req.user);
    
    // Generate employee ID
    const count = await Employee.countDocuments();
    const employeeId = `EMP${String(count + 1).padStart(5, '0')}`;
    console.log('Generated employee ID:', employeeId);

    const employee = await Employee.create({
      ...req.body,
      employeeId
    });

    console.log('Employee created successfully:', employee._id);
    console.log('=== CREATE EMPLOYEE END ===');

    res.status(201).json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error('=== CREATE EMPLOYEE ERROR ===');
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('=== ERROR END ===');
    
    res.status(500).json({
      success: false,
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// @desc    Update employee
// @route   PUT /api/employees/:id
// @access  Private (Admin/Manager)
exports.updateEmployee = async (req, res) => {
  try {
    let employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private (Admin)
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found'
      });
    }

    await employee.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get employee statistics
// @route   GET /api/employees/stats/overview
// @access  Private
exports.getEmployeeStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: 'Active' });
    const inactiveEmployees = await Employee.countDocuments({ status: 'Inactive' });
    
    // Group by role
    const roleStats = await Employee.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
          avgCTC: { $avg: '$ctc' }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Group by location
    const locationStats = await Employee.aggregate([
      {
        $group: {
          _id: {
            state: '$state',
            city: '$city'
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalEmployees,
        active: activeEmployees,
        inactive: inactiveEmployees,
        byRole: roleStats,
        byLocation: locationStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get comprehensive dashboard statistics
// @route   GET /api/employees/stats/dashboard
// @access  Private
exports.getDashboardStats = async (req, res) => {
  try {
    const Customer = require('../models/Customer');
    
    // Employee Statistics
    const totalEmployees = await Employee.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: 'Active' });
    const inactiveEmployees = await Employee.countDocuments({ status: 'Inactive' });
    const onLeaveEmployees = await Employee.countDocuments({ status: 'On Leave' });
    
    // Customer Statistics
    const totalCustomers = await Customer.countDocuments();
    const activeCustomers = await Customer.countDocuments({ status: 'Active' });
    const pendingCustomers = await Customer.countDocuments({ status: 'Pending' });
    
    // Role Distribution
    const roleDistribution = await Employee.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
          avgCTC: { $avg: '$ctc' },
          avgNetSalary: { $avg: '$netSalary' }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);
    
    // Location Distribution
    const locationDistribution = await Employee.aggregate([
      {
        $group: {
          _id: {
            state: '$state',
            city: '$city',
            cityClassification: '$cityClassification'
          },
          count: { $sum: 1 },
          avgCTC: { $avg: '$ctc' }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ]);
    
    // Skill Level Distribution
    const skillLevelDistribution = await Employee.aggregate([
      {
        $group: {
          _id: '$skillLevel',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // City Classification Distribution
    const cityClassificationDistribution = await Employee.aggregate([
      {
        $group: {
          _id: '$cityClassification',
          count: { $sum: 1 },
          avgCTC: { $avg: '$ctc' }
        }
      }
    ]);
    
    // Salary Statistics
    const salaryStats = await Employee.aggregate([
      {
        $group: {
          _id: null,
          avgCTC: { $avg: '$ctc' },
          minCTC: { $min: '$ctc' },
          maxCTC: { $max: '$ctc' },
          avgNetSalary: { $avg: '$netSalary' },
          totalPayroll: { $sum: '$ctc' }
        }
      }
    ]);
    
    // Recent Joinings (Last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentJoinings = await Employee.countDocuments({
      joiningDate: { $gte: thirtyDaysAgo }
    });
    
    // Customer Requirements Summary
    const requirementStats = await Customer.aggregate([
      { $unwind: '$requirements' },
      {
        $group: {
          _id: '$requirements.status',
          count: { $sum: 1 },
          totalQuantity: { $sum: '$requirements.quantity' }
        }
      }
    ]);
    
    // Top Customers by Employee Count
    const topCustomers = await Employee.aggregate([
      {
        $match: { assignedTo: { $ne: null } }
      },
      {
        $group: {
          _id: '$assignedTo',
          employeeCount: { $sum: 1 }
        }
      },
      {
        $sort: { employeeCount: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: 'customers',
          localField: '_id',
          foreignField: '_id',
          as: 'customer'
        }
      },
      {
        $unwind: '$customer'
      },
      {
        $project: {
          companyName: '$customer.companyName',
          employeeCount: 1
        }
      }
    ]);
    
    // Monthly Hiring Trend (Last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const hiringTrend = await Employee.aggregate([
      {
        $match: {
          joiningDate: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$joiningDate' },
            month: { $month: '$joiningDate' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.status(200).json({
      success: true,
      data: {
        employees: {
          total: totalEmployees,
          active: activeEmployees,
          inactive: inactiveEmployees,
          onLeave: onLeaveEmployees,
          recentJoinings
        },
        customers: {
          total: totalCustomers,
          active: activeCustomers,
          pending: pendingCustomers
        },
        distributions: {
          byRole: roleDistribution,
          byLocation: locationDistribution,
          bySkillLevel: skillLevelDistribution,
          byCityClassification: cityClassificationDistribution
        },
        salary: salaryStats[0] || {
          avgCTC: 0,
          minCTC: 0,
          maxCTC: 0,
          avgNetSalary: 0,
          totalPayroll: 0
        },
        requirements: requirementStats,
        topCustomers,
        hiringTrend
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Made with Bob
