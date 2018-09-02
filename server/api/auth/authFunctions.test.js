const authFunctions = require('./authFunctions');


it('login happy route', async () => {
  const testUser = {
    _id: '5b881109807f3f3c3568d58c',
    username: 'test',
    password: '$2b$10$4n9S6KSHxad69kTcMpio1un2iDGzkXX/hugMtzIRO2PxKfAB8sH5i',
    email: 'Muhammad40@gmail.com',
    permissions: 'update',
    authenticate: jest.fn().mockName('authenticate').mockReturnValue(true),
  };
  const User = {
    findOne: jest.fn().mockName('findOne').mockReturnValue(testUser),
  };
  const status = await authFunctions.authenticateUser('test', 'test', User);
  expect(User.findOne).toBeCalledWith({ username: 'test' });
  expect(testUser.authenticate).toBeCalledWith('test');
  expect(status.status).toBe('Success');
  return status;
});

it.skip('add user happy route', () => {

});

it.skip('forgot password happy route', () => {

});

it.skip('delete me happy route', () => {

});

it.skip('get me happy route', () => {

});

it.skip('patch me happy route', () => {

});
