const userRepository = require('../repositories/user.repository');

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await userRepository.findAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
}

// Get a user by ID
async function getUserById(req, res) {
  try {
    const user = await userRepository.findByEmail(req.params.email); // or findById
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
}

// Create a new user
async function createNewUser(req, res) {
  try {
    const userData = req.body;
    const newUser = await userRepository.createUser(userData);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
}

// Update a user by ID
async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const updatedUser = await userRepository.updateUser(userId, req.body);
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
}

// Delete a user by ID
async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const success = await userRepository.deleteUser(userId);
    if (!success) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser
};