const { User } = require("./src/models");

async function seedUser() {
  try {
    const user = await User.create({
      name: "Vaidik",
      email: "vaidik.bbcspl@gmail.com",
      role: "admin", 
      is_active: true
    });
    console.log("✅ Test user successfully created with ID:", user.id);
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      console.log("⚠️ User already exists in the database.");
    } else {
      console.error("❌ Error creating user:", err.message);
    }
  } finally {
    process.exit(0);
  }
}

seedUser();
