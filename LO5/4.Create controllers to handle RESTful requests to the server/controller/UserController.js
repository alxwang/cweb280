const AppDataSource = require('../data-source');
const User = require('../entity/User');

class UserController {
    constructor() {
        this.userRepository = AppDataSource.getRepository('User');
    }

    // GET /users
    async all(req, res) {
        try {
            const users = await this.userRepository.find();
            res.json(users);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // GET /users/:id
    async one(req, res) {
        try {
            const user = await this.userRepository.findOneBy({ id: parseInt(req.params.id) });
            if (!user) return res.status(404).json({ message: 'User not found' });
            res.json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // POST /users
    async create(req, res) {
        try {
            const user = this.userRepository.create(req.body);
            const result = await this.userRepository.save(user);
            res.status(201).json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // PUT /users/:id
    async update(req, res) {
        try {
            await this.userRepository.update(req.params.id, req.body);
            const updatedUser = await this.userRepository.findOneBy({ id: parseInt(req.params.id) });
            res.json(updatedUser);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }

    // DELETE /users/:id
    async remove(req, res) {
        try {
            await this.userRepository.delete(req.params.id);
            res.json({ message: 'User deleted successfully' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new UserController();