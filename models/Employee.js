const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  // Personal Information
  employeeId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: [true, 'Please provide employee name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number']
  },
  dateOfBirth: {
    type: Date
  },
  joiningDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  
  // Role Information
  role: {
    type: String,
    required: [true, 'Please provide role'],
    enum: [
      'Security Guard',
      'Security Supervisor',
      'Housekeeping Staff',
      'Facility Manager',
      'Office Assistant',
      'Data Entry Operator',
      'Receptionist',
      'Electrician',
      'Plumber',
      'HVAC Technician',
      'IT Support',
      'Driver',
      'Warehouse Worker',
      'Production Worker'
    ]
  },
  skillLevel: {
    type: String,
    enum: ['Entry-level', 'Mid-level', 'Senior-level'],
    default: 'Entry-level'
  },
  
  // Location Information
  state: {
    type: String,
    required: [true, 'Please provide state']
  },
  city: {
    type: String,
    required: [true, 'Please provide city']
  },
  cityClassification: {
    type: String,
    enum: ['Metro', 'Tier-1', 'Tier-2/3'],
    required: true
  },
  site: {
    type: String
  },
  
  // Salary Components
  salaryStructure: {
    basicSalary: {
      type: Number,
      required: [true, 'Please provide basic salary']
    },
    da: {
      percentage: { type: Number, default: 20 },
      amount: { type: Number }
    },
    hra: {
      percentage: { type: Number, default: 40 },
      amount: { type: Number }
    },
    conveyanceAllowance: {
      type: Number,
      default: 1600
    },
    specialAllowance: {
      type: Number,
      default: 0
    },
    grossSalary: {
      type: Number
    }
  },
  
  // Deductions
  deductions: {
    pf: {
      employeeContribution: { type: Number },
      employerContribution: { type: Number }
    },
    esi: {
      employeeContribution: { type: Number },
      employerContribution: { type: Number }
    },
    professionalTax: {
      type: Number,
      default: 200
    }
  },
  
  // Net Salary & CTC
  netSalary: {
    type: Number
  },
  ctc: {
    type: Number
  },
  
  // Employment Status
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'On Leave', 'Terminated'],
    default: 'Active'
  },
  
  // Customer Assignment
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer'
  },
  
  // Documents
  documents: [{
    type: {
      type: String,
      enum: ['Aadhar', 'PAN', 'Resume', 'Photo', 'Other']
    },
    url: String,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Calculate salary components before saving
employeeSchema.pre('save', async function() {
  // Calculate DA
  this.salaryStructure.da.amount =
    (this.salaryStructure.basicSalary * this.salaryStructure.da.percentage) / 100;
  
  // Calculate HRA
  this.salaryStructure.hra.amount =
    (this.salaryStructure.basicSalary * this.salaryStructure.hra.percentage) / 100;
  
  // Calculate Gross Salary
  this.salaryStructure.grossSalary =
    this.salaryStructure.basicSalary +
    this.salaryStructure.da.amount +
    this.salaryStructure.hra.amount +
    this.salaryStructure.conveyanceAllowance +
    this.salaryStructure.specialAllowance;
  
  // Calculate PF (12% of Basic + DA)
  const pfBase = this.salaryStructure.basicSalary + this.salaryStructure.da.amount;
  this.deductions.pf.employeeContribution = (pfBase * 12) / 100;
  this.deductions.pf.employerContribution = (pfBase * 12) / 100;
  
  // Calculate ESI if gross salary <= 21000
  if (this.salaryStructure.grossSalary <= 21000) {
    this.deductions.esi.employeeContribution = (this.salaryStructure.grossSalary * 0.75) / 100;
    this.deductions.esi.employerContribution = (this.salaryStructure.grossSalary * 3.25) / 100;
  } else {
    this.deductions.esi.employeeContribution = 0;
    this.deductions.esi.employerContribution = 0;
  }
  
  // Calculate Net Salary
  this.netSalary =
    this.salaryStructure.grossSalary -
    this.deductions.pf.employeeContribution -
    (this.deductions.esi.employeeContribution || 0) -
    this.deductions.professionalTax;
  
  // Calculate CTC (including employer contributions)
  const gratuityProvision = (this.salaryStructure.basicSalary * 4.81) / 100;
  const bonusProvision = (this.salaryStructure.basicSalary * 8.33) / 100;
  
  this.ctc =
    this.salaryStructure.grossSalary +
    this.deductions.pf.employerContribution +
    (this.deductions.esi.employerContribution || 0) +
    gratuityProvision +
    bonusProvision;
});

module.exports = mongoose.model('Employee', employeeSchema);

// Made with Bob
