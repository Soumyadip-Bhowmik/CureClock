const express = require("express");
const colors = require("colors");
const morgan = require("morgan");  // Fixed typo: moragan to morgan
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path")
// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/doctor", require("./routes/doctorRoutes"));

//static file
app.use(express.static(path.join(__dirname, './client/build')));

app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});
// Port
const port = process.env.PORT || 8080;

// Start server
app.listen(port, () => {
  
});
