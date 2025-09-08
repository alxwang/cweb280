const express = require('express');
const cookieParser = require('cookie-parser');
const PORT = 5000;
const app = express();
app.use(cookieParser());

// Set a cookie
app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'Jenson', { maxAge: 60000, httpOnly: true });
  res.send('Cookie has been set!');
});

// Read a cookie
app.get('/get-cookie', (req, res) => {
  const user = req.cookies['username'];
  if (user) {
    res.send(`Welcome back, ${user}`);
  } else {
    res.send('No cookie found');
  }
});

// Clear a cookie
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('username'); // cookie name
  res.send('Cookie cleared successfully');
});


app.listen(PORT, () => {
  console.log(`Cookies example: http://localhost:${PORT}`);
});
