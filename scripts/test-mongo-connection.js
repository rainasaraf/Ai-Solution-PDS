const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI || 'mongodb+srv://asarafrain786_db_user:lR6GEF7asEW0OgGo@cluster0.rz2zezv.mongodb.net/';

(async () => {
  try {
    console.log('Testing MongoDB connection...');
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas ✅');
    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Connection failed:', err.message || err);
    process.exit(1);
  }
})();
