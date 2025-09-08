const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Middleware to parse incoming JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Handlebars as the view engine
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (optional for CSS/JS)
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("index"); // render views/index.hbs
});

app.post("/save-data", (req, res) => {
  const { name } = req.body;
  console.log("Received:", name);

  // Send JSON response back to client
  res.json({ message: `Hello, ${name}! Data received successfully.` });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
