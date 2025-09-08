const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());            // allow requests from the frontend dev server
app.use(express.json());    // parse JSON bodies

// simple in-memory data store
let users = [
  { id: 1, name: "Ravi" },
  { id: 2, name: "Amit" }
];

// GET /api/users  -> return all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST /api/users -> add a new user
app.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });

  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.listen(PORT, () => {
  console.log(`Backend running: http://localhost:${PORT}`);
});
