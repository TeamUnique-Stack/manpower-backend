require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

async function verifyUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    const users = await User.find({}).select('+password');
    
    console.log(`Found ${users.length} users:\n`);
    
    for (const user of users) {
      console.log('-------------------');
      console.log('Name:', user.name);
      console.log('Email:', user.email);
      console.log('Role:', user.role);
      console.log('Password Hash:', user.password.substring(0, 20) + '...');
      console.log('Active:', user.isActive);
      
      // Test password comparison
      const testPassword = 'admin123';
      const isMatch = await user.comparePassword(testPassword);
      console.log(`Password '${testPassword}' matches:`, isMatch);
    }
    
    console.log('\n-------------------');
    console.log('\nTrying to login with admin@manpower.com...');
    
    const adminUser = await User.findOne({ email: 'admin@manpower.com' }).select('+password');
    if (adminUser) {
      const passwords = ['admin123', 'Admin123', 'ADMIN123'];
      for (const pwd of passwords) {
        const match = await adminUser.comparePassword(pwd);
        console.log(`Password '${pwd}':`, match ? '✅ MATCH' : '❌ NO MATCH');
      }
    } else {
      console.log('❌ Admin user not found!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

verifyUsers();

// Made with Bob
