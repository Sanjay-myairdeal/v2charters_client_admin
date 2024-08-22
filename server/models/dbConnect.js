const mongoose = require('mongoose');

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Db connected successfully");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

module.exports = dbConnect;
