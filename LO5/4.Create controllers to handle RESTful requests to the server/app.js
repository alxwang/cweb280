require('reflect-metadata');
const express = require('express');
const bodyParser = require('body-parser');
const AppDataSource = require('./data-source');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(bodyParser.json());

// Initialize TypeORM
AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');

        // Routes
        app.use('/users', userRoutes);

        app.listen(5000, () => {
            console.log('Server running on http://localhost:3000');
        });
    })
    .catch((err) => console.error('Error during Data Source initialization', err));