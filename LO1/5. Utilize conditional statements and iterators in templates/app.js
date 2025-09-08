const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const PORT = 8080;

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


// Conditional route
app.get('/conditional', (req, res) => {
    res.render('conditional', {
        title: 'Conditional Test',
        isLoggedIn: false,
        username: 'Charles'
    });
});

// Iterators route
app.get('/todos', (req, res) => {
    res.render('iterators', {
        title: 'Todo List',
        todos: [
            { task: 'Finish project', completed: true },
            { task: 'Read book', completed: false },
            { task: 'Go shopping', completed: true }
        ]
    });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
