
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("✅ Connected to MongoDB successfully");

        // Listen for connection errors
        mongoose.connection.on("error", (err) => {
            console.error("❌ MongoDB Connection Error:", err);
        });
    } catch (error) {
        console.error("❌ Error connecting to MongoDB:", error);
        process.exit(1);
    }
};

module.exports = connectToMongo;
