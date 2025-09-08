const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const PORT = 8080;

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home', {
    title: "Student List",
    students: ["Ayesha", "Rahul", "Vikram"],
    loggedIn: true
  });
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
