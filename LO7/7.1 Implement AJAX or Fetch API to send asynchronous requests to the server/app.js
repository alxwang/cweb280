const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Handlebars as view engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

// POST request
app.post("/save-data", (req, res) => {
  const { name } = req.body;
  console.log("POST received:", name);

  res.json({ message: `Hello, ${name}! Data received successfully (POST).` });
});

// GET request
app.get("/get-message", (req, res) => {
  console.log("GET request received");
  res.json({ message: "This is a message from the server (GET)." });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
