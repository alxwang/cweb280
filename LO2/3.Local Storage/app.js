const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const PORT = 5000;
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'mysecret';

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.json()); // parses JSON bodies
app.use(express.urlencoded({ extended: true })); // parses URL-encoded bodies

app.get('/', (req, res) => {
  res.render('form');
});
// Login to generate JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token }); // send token to browser
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Send token in request
app.get('/api/data', authenticateToken, (req, res) => {
  res.json({ message: `Hello ${req.user.username}, this is protected data!` });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
