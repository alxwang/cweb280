const express = require('express');
const path = require('path');
const { body, validationResult } = require('express-validator');

const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route: Show form
app.get('/', (req, res) => {
  res.render('form', { errors: [], oldInput: {} });
});

// Route: Handle form submission with validation
app.post('/register',
  [
    body('email')
      .isEmail().withMessage('Invalid email format'),
    body('password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('age')
      .isInt({ min: 18 }).withMessage('You must be at least 18 years old')
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // Re-render form with errors and old input
      return res.render('form', { 
        errors: errors.array(),
        oldInput: req.body
      });
    }

    // If valid → show success page
    res.render('success', { data: req.body });
  }
);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
