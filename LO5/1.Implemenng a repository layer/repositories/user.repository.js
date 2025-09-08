const User = require('../models/user.model');

class UserRepository {
  async findAllUsers() {
    return await User.findAll();
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async createUser(userData) {
    return await User.create(userData);
  }

  async updateUser(userId, newUserData) {
    const user = await User.findByPk(userId);
    if (user) return await user.update(newUserData);
    return null;
  }

  async deleteUser(userId) {
    const user = await User.findByPk(userId);
    if (user) {
      await user.destroy();
      return true;
    }
    return false;
  }
}

module.exports = new UserRepository();