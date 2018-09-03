const faker = require('faker');
const User = require('../api/auth/userModel');

const users = [];

for (let i = 0; i < 20; i += 1) {
  //  change these to whatever you want
  const newUser = {
    username: `${faker.name.findName()}`,
    email: faker.internet.email(),
    password: 'test',
    authority: faker.random.arrayElement(['create', 'read', 'update']),
  };
  users.push(newUser);
}

module.exports = async function seedDatabase() {
  try {
    await User.remove();

    const createPromises = [
      User.create(users),
      User.create({
        username: 'test',
        password: 'test',
        email: faker.internet.email(),
        //  unsure what you want in permissions field for now
        authority: faker.random.arrayElement(['create', 'read', 'update']),
      })];

    await Promise.all(createPromises);
    console.log('Removed and seeded database');
  } catch (error) {
    console.log(error);
  }
};
