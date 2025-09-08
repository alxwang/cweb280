// app.js
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// Middleware: lets Express read cookies from incoming requests
app.use(cookieParser());

// 1️⃣ Route to set a cookie
app.get('/set-cookie', (req, res) => {
  res.cookie('mySession', 'user12345', { 
    maxAge: 3600000,   // 1 hour
    httpOnly: true     // not accessible to JS in browser
  });
  res.send('Session cookie set!');
});

// 2️⃣ Route to read cookies
app.get('/get-cookies', (req, res) => {
  const sessionCookie = req.cookies.mySession;
  if (sessionCookie) {
    res.send(`Welcome back! Your session ID is: ${sessionCookie}`);
  } else {
    res.send('No session cookie found. Try setting one first.');
  }
});

// 3️⃣ Route to clear a cookie
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('mySession');
  res.send('Session cookie cleared!');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
