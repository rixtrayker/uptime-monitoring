const UserRepository = require('../repositories/UserRepository');
const knex = require('../utils/db');
const randomstring = require('randomstring');

describe('User Repository', () => {
  let testEmail;

  beforeAll(async () => {
    testEmail = randomstring.generate(10);

    await knex('users').insert({
      name: 'admin',
      email: testEmail,
      password: '123',
    });
  });

  afterAll(async () => {
    await knex('users').where({ email: testEmail }).del();
  });

  test('getUserByEmail should return the user with the given email', async () => {
    const user = await UserRepository.getUserByEmail(testEmail);

    expect(user).toBeDefined();
    expect(user.email).toBe(testEmail);
  });
});
