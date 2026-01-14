const mongoose = require("mongoose");

const dropValidationIfExists = async () => {
  try {
    const db = mongoose.connection.db;
    const collections = await db.listCollections({ name: "users" }).toArray();
    if (collections.length > 0) {
      await db.command({
        collMod: "users",
        validator: {},
        validationLevel: "off",
      });
      console.log("✅ Removed existing validation from 'users' collection");
    }
  } catch {
    console.log("ℹ️ No validation found or collection doesn't exist");
  }
};

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/AmazonClone";

    console.log(`🔗 Connecting to MongoDB: ${mongoURI}`);

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(mongoURI, options);

    console.log("✅ MongoDB Connected Successfully");

    await dropValidationIfExists();

    // MongoDB connection event handlers
    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️  MongoDB disconnected");
    });

    return mongoose.connection;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);

    if (error.message.includes("ECONNREFUSED")) {
      console.log("\n💡 MongoDB is not running. Please start it:");
      console.log('   For Windows: mongod --dbpath "C:\\data\\db"');
      console.log("   Or install as service: net start MongoDB");
    }

    // Don't exit in development
    if (process.env.NODE_ENV !== "production") {
      console.log("⚠️  Continuing without database (development mode)");
      return null;
    } else {
      throw error;
    }
  }
};

module.exports = connectDB;
