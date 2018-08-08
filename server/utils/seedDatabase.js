const faker = require('faker');
const User = require('../api/auth/userModel');

module.exports = async function seedDatabase() {
  try {
    await User.remove();

    await User.create({
      username: 'test',
      password: 'test',
      email: faker.internet.email(),
      //  unsure what you want in permissions field for now
      permissions: faker.random.arrayElement(['create', 'read', 'update']),
    });
    console.log('Removed and seeded database');
  } catch (error) {
    console.log(error);
  }
};
