require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Employee = require('../models/Employee');
const Customer = require('../models/Customer');

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Sample Users Data
const users = [
  {
    name: 'Admin User',
    email: 'admin@manpower.com',
    password: 'admin123',
    role: 'admin'
  },
  {
    name: 'Manager John',
    email: 'manager@manpower.com',
    password: 'manager123',
    role: 'manager'
  },
  {
    name: 'HR User',
    email: 'hr@manpower.com',
    password: 'user123',
    role: 'user'
  },
  {
    name: 'Operations Manager',
    email: 'operations@manpower.com',
    password: 'user123',
    role: 'user'
  }
];

// Sample Customers Data
const customers = [
  {
    companyName: 'Tech Solutions Pvt Ltd',
    contactPerson: {
      name: 'Rajesh Kumar',
      email: 'rajesh@techsolutions.com',
      phone: '+91-9876543210',
      designation: 'HR Manager'
    },
    address: {
      street: '123 MG Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      country: 'India'
    },
    gstin: '29ABCDE1234F1Z5',
    pan: 'ABCDE1234F',
    contractDetails: {
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-12-31'),
      duration: '2 years',
      serviceCharge: 12,
      paymentTerms: 'Net 30 days'
    },
    status: 'Active',
    requirements: [
      {
        role: 'Security Guard',
        quantity: 10,
        location: { state: 'Karnataka', city: 'Bangalore', site: 'Main Office' },
        expectedCTC: 18000,
        status: 'Fulfilled'
      },
      {
        role: 'Housekeeping Staff',
        quantity: 5,
        location: { state: 'Karnataka', city: 'Bangalore', site: 'Main Office' },
        expectedCTC: 15000,
        status: 'In Progress'
      }
    ]
  },
  {
    companyName: 'Global Manufacturing Ltd',
    contactPerson: {
      name: 'Priya Sharma',
      email: 'priya@globalmanuf.com',
      phone: '+91-9876543211',
      designation: 'Operations Head'
    },
    address: {
      street: '456 Industrial Area',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
      country: 'India'
    },
    gstin: '27FGHIJ5678K1Z5',
    pan: 'FGHIJ5678K',
    contractDetails: {
      startDate: new Date('2024-03-01'),
      endDate: new Date('2026-02-28'),
      duration: '2 years',
      serviceCharge: 10,
      paymentTerms: 'Net 45 days'
    },
    status: 'Active',
    requirements: [
      {
        role: 'Production Worker',
        quantity: 20,
        location: { state: 'Maharashtra', city: 'Pune', site: 'Factory Unit 1' },
        expectedCTC: 20000,
        status: 'Fulfilled'
      },
      {
        role: 'Warehouse Worker',
        quantity: 8,
        location: { state: 'Maharashtra', city: 'Pune', site: 'Warehouse' },
        expectedCTC: 18000,
        status: 'Open'
      }
    ]
  },
  {
    companyName: 'Retail Chain India',
    contactPerson: {
      name: 'Amit Patel',
      email: 'amit@retailchain.com',
      phone: '+91-9876543212',
      designation: 'Store Manager'
    },
    address: {
      street: '789 Commercial Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    },
    gstin: '27KLMNO9012P1Z5',
    pan: 'KLMNO9012P',
    contractDetails: {
      startDate: new Date('2024-06-01'),
      endDate: new Date('2025-05-31'),
      duration: '1 year',
      serviceCharge: 15,
      paymentTerms: 'Net 30 days'
    },
    status: 'Active',
    requirements: [
      {
        role: 'Security Guard',
        quantity: 15,
        location: { state: 'Maharashtra', city: 'Mumbai', site: 'Multiple Stores' },
        expectedCTC: 22000,
        status: 'Fulfilled'
      },
      {
        role: 'Housekeeping Staff',
        quantity: 10,
        location: { state: 'Maharashtra', city: 'Mumbai', site: 'Multiple Stores' },
        expectedCTC: 18000,
        status: 'Fulfilled'
      }
    ]
  },
  {
    companyName: 'IT Park Services',
    contactPerson: {
      name: 'Sneha Reddy',
      email: 'sneha@itpark.com',
      phone: '+91-9876543213',
      designation: 'Facility Manager'
    },
    address: {
      street: '321 IT Corridor',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500001',
      country: 'India'
    },
    gstin: '36QRSTU3456V1Z5',
    pan: 'QRSTU3456V',
    contractDetails: {
      startDate: new Date('2024-02-01'),
      endDate: new Date('2027-01-31'),
      duration: '3 years',
      serviceCharge: 8,
      paymentTerms: 'Net 60 days'
    },
    status: 'Active',
    requirements: [
      {
        role: 'Facility Manager',
        quantity: 2,
        location: { state: 'Telangana', city: 'Hyderabad', site: 'IT Park' },
        expectedCTC: 35000,
        status: 'Fulfilled'
      },
      {
        role: 'IT Support',
        quantity: 5,
        location: { state: 'Telangana', city: 'Hyderabad', site: 'IT Park' },
        expectedCTC: 28000,
        status: 'In Progress'
      }
    ]
  },
  {
    companyName: 'Healthcare Services Ltd',
    contactPerson: {
      name: 'Dr. Meena Iyer',
      email: 'meena@healthcare.com',
      phone: '+91-9876543214',
      designation: 'Administrator'
    },
    address: {
      street: '555 Medical District',
      city: 'Chennai',
      state: 'Tamil Nadu',
      pincode: '600001',
      country: 'India'
    },
    gstin: '33WXYZ7890A1Z5',
    pan: 'WXYZ7890A',
    contractDetails: {
      startDate: new Date('2024-04-01'),
      endDate: new Date('2026-03-31'),
      duration: '2 years',
      serviceCharge: 10,
      paymentTerms: 'Net 30 days'
    },
    status: 'Active',
    requirements: [
      {
        role: 'Housekeeping Staff',
        quantity: 12,
        location: { state: 'Tamil Nadu', city: 'Chennai', site: 'Hospital' },
        expectedCTC: 16000,
        status: 'Fulfilled'
      },
      {
        role: 'Security Guard',
        quantity: 8,
        location: { state: 'Tamil Nadu', city: 'Chennai', site: 'Hospital' },
        expectedCTC: 19000,
        status: 'Fulfilled'
      }
    ]
  }
];

// Sample Employees Data
const employees = [
  // Security Guards - Bangalore
  {
    employeeId: 'EMP001',
    name: 'Ramesh Kumar',
    email: 'ramesh.kumar@manpower.com',
    phone: '+91-9876501001',
    dateOfBirth: new Date('1990-05-15'),
    joiningDate: new Date('2024-01-15'),
    role: 'Security Guard',
    skillLevel: 'Mid-level',
    state: 'Karnataka',
    city: 'Bangalore',
    cityClassification: 'Metro',
    site: 'Tech Solutions - Main Office',
    salaryStructure: {
      basicSalary: 10000,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 500
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  {
    employeeId: 'EMP002',
    name: 'Suresh Babu',
    email: 'suresh.babu@manpower.com',
    phone: '+91-9876501002',
    dateOfBirth: new Date('1988-08-20'),
    joiningDate: new Date('2024-01-20'),
    role: 'Security Guard',
    skillLevel: 'Senior-level',
    state: 'Karnataka',
    city: 'Bangalore',
    cityClassification: 'Metro',
    site: 'Tech Solutions - Main Office',
    salaryStructure: {
      basicSalary: 12000,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 800
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  // Housekeeping Staff - Bangalore
  {
    employeeId: 'EMP003',
    name: 'Lakshmi Devi',
    email: 'lakshmi.devi@manpower.com',
    phone: '+91-9876501003',
    dateOfBirth: new Date('1992-03-10'),
    joiningDate: new Date('2024-02-01'),
    role: 'Housekeeping Staff',
    skillLevel: 'Entry-level',
    state: 'Karnataka',
    city: 'Bangalore',
    cityClassification: 'Metro',
    site: 'Tech Solutions - Main Office',
    salaryStructure: {
      basicSalary: 8500,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 0
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  // Production Workers - Pune
  {
    employeeId: 'EMP004',
    name: 'Vijay Patil',
    email: 'vijay.patil@manpower.com',
    phone: '+91-9876501004',
    dateOfBirth: new Date('1991-07-25'),
    joiningDate: new Date('2024-03-10'),
    role: 'Production Worker',
    skillLevel: 'Mid-level',
    state: 'Maharashtra',
    city: 'Pune',
    cityClassification: 'Tier-1',
    site: 'Global Manufacturing - Factory Unit 1',
    salaryStructure: {
      basicSalary: 11000,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 600
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  {
    employeeId: 'EMP005',
    name: 'Anil Deshmukh',
    email: 'anil.deshmukh@manpower.com',
    phone: '+91-9876501005',
    dateOfBirth: new Date('1989-11-30'),
    joiningDate: new Date('2024-03-15'),
    role: 'Production Worker',
    skillLevel: 'Senior-level',
    state: 'Maharashtra',
    city: 'Pune',
    cityClassification: 'Tier-1',
    site: 'Global Manufacturing - Factory Unit 1',
    salaryStructure: {
      basicSalary: 13000,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 1000
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  // Security Guards - Mumbai
  {
    employeeId: 'EMP006',
    name: 'Mahesh Rane',
    email: 'mahesh.rane@manpower.com',
    phone: '+91-9876501006',
    dateOfBirth: new Date('1987-04-12'),
    joiningDate: new Date('2024-06-05'),
    role: 'Security Guard',
    skillLevel: 'Senior-level',
    state: 'Maharashtra',
    city: 'Mumbai',
    cityClassification: 'Metro',
    site: 'Retail Chain - Store 1',
    salaryStructure: {
      basicSalary: 13000,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 1200
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  {
    employeeId: 'EMP007',
    name: 'Prakash Jadhav',
    email: 'prakash.jadhav@manpower.com',
    phone: '+91-9876501007',
    dateOfBirth: new Date('1993-09-18'),
    joiningDate: new Date('2024-06-10'),
    role: 'Security Guard',
    skillLevel: 'Mid-level',
    state: 'Maharashtra',
    city: 'Mumbai',
    cityClassification: 'Metro',
    site: 'Retail Chain - Store 2',
    salaryStructure: {
      basicSalary: 11500,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 700
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  // Facility Managers - Hyderabad
  {
    employeeId: 'EMP008',
    name: 'Srinivas Rao',
    email: 'srinivas.rao@manpower.com',
    phone: '+91-9876501008',
    dateOfBirth: new Date('1985-02-28'),
    joiningDate: new Date('2024-02-15'),
    role: 'Facility Manager',
    skillLevel: 'Senior-level',
    state: 'Telangana',
    city: 'Hyderabad',
    cityClassification: 'Metro',
    site: 'IT Park Services',
    salaryStructure: {
      basicSalary: 20000,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 2500
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  // IT Support - Hyderabad
  {
    employeeId: 'EMP009',
    name: 'Karthik Reddy',
    email: 'karthik.reddy@manpower.com',
    phone: '+91-9876501009',
    dateOfBirth: new Date('1994-06-15'),
    joiningDate: new Date('2024-03-01'),
    role: 'IT Support',
    skillLevel: 'Mid-level',
    state: 'Telangana',
    city: 'Hyderabad',
    cityClassification: 'Metro',
    site: 'IT Park Services',
    salaryStructure: {
      basicSalary: 16000,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 1500
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  // Housekeeping Staff - Chennai
  {
    employeeId: 'EMP010',
    name: 'Murugan Selvam',
    email: 'murugan.selvam@manpower.com',
    phone: '+91-9876501010',
    dateOfBirth: new Date('1990-12-05'),
    joiningDate: new Date('2024-04-10'),
    role: 'Housekeeping Staff',
    skillLevel: 'Mid-level',
    state: 'Tamil Nadu',
    city: 'Chennai',
    cityClassification: 'Metro',
    site: 'Healthcare Services - Hospital',
    salaryStructure: {
      basicSalary: 9000,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 400
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  {
    employeeId: 'EMP011',
    name: 'Kavitha Raman',
    email: 'kavitha.raman@manpower.com',
    phone: '+91-9876501011',
    dateOfBirth: new Date('1995-01-20'),
    joiningDate: new Date('2024-04-15'),
    role: 'Housekeeping Staff',
    skillLevel: 'Entry-level',
    state: 'Tamil Nadu',
    city: 'Chennai',
    cityClassification: 'Metro',
    site: 'Healthcare Services - Hospital',
    salaryStructure: {
      basicSalary: 8000,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 0
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  // Security Supervisor - Bangalore
  {
    employeeId: 'EMP012',
    name: 'Ganesh Murthy',
    email: 'ganesh.murthy@manpower.com',
    phone: '+91-9876501012',
    dateOfBirth: new Date('1986-10-08'),
    joiningDate: new Date('2024-01-10'),
    role: 'Security Supervisor',
    skillLevel: 'Senior-level',
    state: 'Karnataka',
    city: 'Bangalore',
    cityClassification: 'Metro',
    site: 'Tech Solutions - Main Office',
    salaryStructure: {
      basicSalary: 15000,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 1800
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  // Warehouse Workers - Pune
  {
    employeeId: 'EMP013',
    name: 'Santosh Pawar',
    email: 'santosh.pawar@manpower.com',
    phone: '+91-9876501013',
    dateOfBirth: new Date('1992-05-22'),
    joiningDate: new Date('2024-05-01'),
    role: 'Warehouse Worker',
    skillLevel: 'Entry-level',
    state: 'Maharashtra',
    city: 'Pune',
    cityClassification: 'Tier-1',
    site: 'Global Manufacturing - Warehouse',
    salaryStructure: {
      basicSalary: 10000,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 500
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  // Electrician - Mumbai
  {
    employeeId: 'EMP014',
    name: 'Ravi Sharma',
    email: 'ravi.sharma@manpower.com',
    phone: '+91-9876501014',
    dateOfBirth: new Date('1988-07-14'),
    joiningDate: new Date('2024-06-20'),
    role: 'Electrician',
    skillLevel: 'Senior-level',
    state: 'Maharashtra',
    city: 'Mumbai',
    cityClassification: 'Metro',
    site: 'Retail Chain - Maintenance',
    salaryStructure: {
      basicSalary: 16000,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 2000
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  // Receptionist - Hyderabad
  {
    employeeId: 'EMP015',
    name: 'Priyanka Nair',
    email: 'priyanka.nair@manpower.com',
    phone: '+91-9876501015',
    dateOfBirth: new Date('1996-03-30'),
    joiningDate: new Date('2024-02-20'),
    role: 'Receptionist',
    skillLevel: 'Entry-level',
    state: 'Telangana',
    city: 'Hyderabad',
    cityClassification: 'Metro',
    site: 'IT Park Services',
    salaryStructure: {
      basicSalary: 12000,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 800
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  // Additional employees for diversity
  {
    employeeId: 'EMP016',
    name: 'Deepak Singh',
    email: 'deepak.singh@manpower.com',
    phone: '+91-9876501016',
    dateOfBirth: new Date('1991-08-17'),
    joiningDate: new Date('2024-01-25'),
    role: 'Security Guard',
    skillLevel: 'Mid-level',
    state: 'Karnataka',
    city: 'Bangalore',
    cityClassification: 'Metro',
    site: 'Tech Solutions - Main Office',
    salaryStructure: {
      basicSalary: 10500,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 600
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  {
    employeeId: 'EMP017',
    name: 'Anita Verma',
    email: 'anita.verma@manpower.com',
    phone: '+91-9876501017',
    dateOfBirth: new Date('1993-11-11'),
    joiningDate: new Date('2024-04-20'),
    role: 'Housekeeping Staff',
    skillLevel: 'Entry-level',
    state: 'Tamil Nadu',
    city: 'Chennai',
    cityClassification: 'Metro',
    site: 'Healthcare Services - Hospital',
    salaryStructure: {
      basicSalary: 8200,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 0
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  {
    employeeId: 'EMP018',
    name: 'Mohan Lal',
    email: 'mohan.lal@manpower.com',
    phone: '+91-9876501018',
    dateOfBirth: new Date('1989-04-05'),
    joiningDate: new Date('2024-03-20'),
    role: 'Production Worker',
    skillLevel: 'Mid-level',
    state: 'Maharashtra',
    city: 'Pune',
    cityClassification: 'Tier-1',
    site: 'Global Manufacturing - Factory Unit 1',
    salaryStructure: {
      basicSalary: 11500,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 700
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  {
    employeeId: 'EMP019',
    name: 'Sunita Joshi',
    email: 'sunita.joshi@manpower.com',
    phone: '+91-9876501019',
    dateOfBirth: new Date('1994-09-25'),
    joiningDate: new Date('2024-06-15'),
    role: 'Housekeeping Staff',
    skillLevel: 'Entry-level',
    state: 'Maharashtra',
    city: 'Mumbai',
    cityClassification: 'Metro',
    site: 'Retail Chain - Store 3',
    salaryStructure: {
      basicSalary: 9500,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 300
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  },
  {
    employeeId: 'EMP020',
    name: 'Rajiv Menon',
    email: 'rajiv.menon@manpower.com',
    phone: '+91-9876501020',
    dateOfBirth: new Date('1987-12-30'),
    joiningDate: new Date('2024-04-25'),
    role: 'Security Guard',
    skillLevel: 'Senior-level',
    state: 'Tamil Nadu',
    city: 'Chennai',
    cityClassification: 'Metro',
    site: 'Healthcare Services - Hospital',
    salaryStructure: {
      basicSalary: 12500,
      da: { percentage: 20 },
      hra: { percentage: 40 },
      conveyanceAllowance: 1600,
      specialAllowance: 1000
    },
    deductions: {
      professionalTax: 200
    },
    status: 'Active'
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Employee.deleteMany({});
    await Customer.deleteMany({});

    // Insert Users
    console.log('Seeding users...');
    const createdUsers = await User.insertMany(users);
    console.log(`✓ Created ${createdUsers.length} users`);

    // Insert Customers
    console.log('Seeding customers...');
    const createdCustomers = await Customer.insertMany(customers);
    console.log(`✓ Created ${createdCustomers.length} customers`);

    // Assign customers to employees
    const customerMap = {
      'Tech Solutions - Main Office': createdCustomers[0]._id,
      'Global Manufacturing - Factory Unit 1': createdCustomers[1]._id,
      'Global Manufacturing - Warehouse': createdCustomers[1]._id,
      'Retail Chain - Store 1': createdCustomers[2]._id,
      'Retail Chain - Store 2': createdCustomers[2]._id,
      'Retail Chain - Store 3': createdCustomers[2]._id,
      'Retail Chain - Maintenance': createdCustomers[2]._id,
      'IT Park Services': createdCustomers[3]._id,
      'Healthcare Services - Hospital': createdCustomers[4]._id
    };

    // Add customer assignments to employees
    const employeesWithCustomers = employees.map(emp => ({
      ...emp,
      assignedTo: customerMap[emp.site]
    }));

    // Insert Employees
    console.log('Seeding employees...');
    const createdEmployees = await Employee.insertMany(employeesWithCustomers);
    console.log(`✓ Created ${createdEmployees.length} employees`);

    console.log('\n=================================');
    console.log('Database seeded successfully! 🎉');
    console.log('=================================');
    console.log('\nSummary:');
    console.log(`- Users: ${createdUsers.length}`);
    console.log(`- Customers: ${createdCustomers.length}`);
    console.log(`- Employees: ${createdEmployees.length}`);
    console.log('\nLogin Credentials:');
    console.log('Admin: admin@manpower.com / admin123');
    console.log('Manager: manager@manpower.com / manager123');
    console.log('User: hr@manpower.com / user123');
    console.log('=================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeder
seedDatabase();

// Made with Bob