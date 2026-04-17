require("dotenv").config(); // Load env FIRST

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/connectDB");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 7011;
const helmet = require("helmet");

const cookieParser = require("cookie-parser");

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("home page");
});
app.get("/health", (req, res) => {
  res.send("home page");
});

// Ensure upload temp directory exists (important for production)
// const tempDir = path.join(__dirname, "public", "temp");

// if (!fs.existsSync(tempDir)) {
//   fs.mkdirSync(tempDir, { recursive: true });
//   console.log("📁 Created upload temp directory:", tempDir);
// }

// routes
// const routesPath = path.join(__dirname, 'routes');
// fs.readdirSync(routesPath).forEach((file) => {
//     if(file.endsWith('.routes.js')) {
//         const route = require(path.join(routesPath, file));

//         //Validate that the file exports a router

//         if(route && typeof route === 'function')
//         {
//             app.use('/api', route);
//             console.log(`Loaded route: ${file}`);
//         }
//         else {
//             console.warn(`skipped ${file}: not a valid router export`);
//         }
//     }

// })

// app.use(require("./middleware/errorHandler"));

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 Server running on 0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
  }
};

startServer();
