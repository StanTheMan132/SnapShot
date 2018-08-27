const authFunctions = require('../api/auth/authFunctions');
const User = {
    username: 'test',
    password: 'test',
}
async function test() {
  await authFunctions.authenticateUser(User.username, User.password);
}

test();
