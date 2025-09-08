require('reflect-metadata');
const express = require('express');
const bodyParser = require('body-parser');
const AppDataSource = require('./data-source');
const User = require('./entity/User');

const app = express();
app.use(bodyParser.json());

AppDataSource.initialize()
    .then(() => {
        console.log('Data Source has been initialized!');

        const userRepository = AppDataSource.getRepository('User');

        // Create a new user
        app.post('/users', async (req, res) => {
            const user = userRepository.create(req.body);
            const result = await userRepository.save(user);
            res.send(result);
        });

        // Get all users
        app.get('/users', async (req, res) => {
            const users = await userRepository.find();
            res.send(users);
        });

        // Get user by id
        app.get('/users/:id', async (req, res) => {
            const user = await userRepository.findOneBy({ id: parseInt(req.params.id) });
            res.send(user);
        });

        // Update user by id
        app.put('/users/:id', async (req, res) => {
            await userRepository.update(req.params.id, req.body);
            const updatedUser = await userRepository.findOneBy({ id: parseInt(req.params.id) });
            res.send(updatedUser);
        });

        // Delete user
        app.delete('/users/:id', async (req, res) => {
            await userRepository.delete(req.params.id);
            res.send({ message: 'User deleted successfully' });
        });

        app.listen(5000, () => {
            console.log('Server started on http://localhost:5000');
        });
    })
    .catch((error) => console.log('Error during Data Source initialization', error));