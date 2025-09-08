const express = require('express');
const exphbs = require('express-handlebars');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 5000;

const SECRET_KEY = 'mysecret';

// Handlebars setup
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve login page
app.get('/', (req, res) => {
  res.render('form');
});

// Login route (generates JWT)
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Simple authentication check
  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token }); // send token to client
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Protected route (requires valid JWT)
app.get('/api/data', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is protected data!` });
});

// Middleware to check JWT from Authorization header
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ error: 'Missing token' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
