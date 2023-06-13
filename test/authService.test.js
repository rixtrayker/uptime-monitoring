const knex = require('../utils/db');
const randomstring = require('randomstring');
const AuthService = require('../services/AuthService')

describe('User Service', () => {
  let testEmail;
  let randomToken;
  beforeAll(async () => {
    testEmail = randomstring.generate(10);
    randomToken = randomstring.generate(10);

    await knex('users').insert({
      name: 'admin',
      email: testEmail,
      password: '123',
      email_verification_token:randomToken
    });
  });

  afterAll(async () => {
    await knex('users').where({ email: testEmail }).del();
  });

  test('verifyEmail should validate email verification works', async () => {
    const result = await AuthService.verifyEmail(randomToken);
    const user = await knex('users').where({ email:testEmail }).first();

    expect(result).toBeDefined();
    expect(result).toBeTruthy();
    
    expect(user).toBeDefined();
    expect(user.verified_at).not.toBeNull();
    expect(user.email_verification_token).toBeNull();
  });
});
