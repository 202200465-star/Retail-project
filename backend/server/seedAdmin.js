const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const User = require("./models/userModel");

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const email = "admin@abc.com"; // using a dummy admin email
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      existingAdmin.password = "admin123";
      existingAdmin.role = "admin";
      await existingAdmin.save();
      console.log(`Admin updated: ${email} / admin123`);
    } else {
      const admin = new User({
        name: "Admin User",
        email,
        password: "admin123",
        role: "admin",
      });
      await admin.save();
      console.log(`Admin created: ${email} / admin123`);
    }
    
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
