const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample data (in-memory, like a fake DB)
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];


// GET all users
app.get("/api/users", (req, res) => {
  res.json(users);
});

// GET a single user by ID
app.get("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
});

app.post("/api/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/api/users/:id", (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  user.name = req.body.name || user.name;
  res.json(user);
});

// DELETE a user
app.delete("/api/users/:id", (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.json({ message: "User deleted" });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
