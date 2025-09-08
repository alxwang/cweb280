const express = require("express");

const app = express();
const port = 3000;

// search route
app.get('/search', (req, res) => {
  const { title, author } = req.query;
  if (!title || !author) {
    return res.send("Please enter both title and author.");
  }
  res.send(`Searching for books titled "${title}" by ${author}`);
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
