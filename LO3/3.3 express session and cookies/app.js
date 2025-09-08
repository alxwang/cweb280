const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = require('./router/router');

const app = express();
const PORT = process.env.PORT || 3000;

// Parse form data & JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookies + Session
app.use(cookieParser());
app.use(session({
  secret: 'my-super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

// Make user available in views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Views setup (Handlebars)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// Routes
app.use('/', router);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
