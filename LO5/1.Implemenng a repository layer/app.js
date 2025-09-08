const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/user.routes');

const app = express();
app.use(express.json()); // Body parser

// Use routes
app.use('/api', userRoutes);

// Sync database and start server
sequelize.sync({ force: false }) // Set to true to reset tables
  .then(() => {
    console.log('Database synced');
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
  })
  .catch(err => console.error('Database sync error:', err));