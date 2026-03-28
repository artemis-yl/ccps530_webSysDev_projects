const mongoose = require('mongoose');

// Database Name
const dbName = "ccps530";
// Connection URL and Database Name is  env.MONGO_URI

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = { connectDB };





