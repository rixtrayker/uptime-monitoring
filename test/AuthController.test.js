const { StatusCodes } = require('http-status-codes');
const AuthController = require('../controllers/AuthController');
const AuthService = require('../services/AuthService');

describe('AuthController', () => {
  describe('register', () => {
    const testCases = [
      {
        name: 'should register a new user and return a success message',
        requestBody: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: 'password123',
        },
        expectedStatusCode: StatusCodes.CREATED,
        expectedResponse: {
          message: 'Registered successfully',
          user: {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
          },
        },
      },
    ];

    testCases.forEach(({ name, requestBody, expectedStatusCode, expectedResponse }) => {
      it(name, async () => {
        const req = { body: requestBody };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        jest.spyOn(AuthService, 'register').mockResolvedValue(expectedResponse.user);

        await AuthController.register(req, res);

        expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
        expect(res.json).toHaveBeenCalledWith(expectedResponse);

        jest.spyOn(AuthService, 'register').mockRestore();
      });
    });
  });

  describe('login', () => {
    const testCases = [
      {
        name: 'should login and return a token',
        requestBody: {
          email: 'johndoe@example.com',
          password: 'password123',
        },
        expectedResponse: {
          message: 'Login successful',
          token: 'mocked-token',
        },
      },
    ];

    testCases.forEach(({ name, requestBody, expectedResponse }) => {
      it(name, async () => {
        const req = { body: requestBody };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        jest.spyOn(AuthService, 'login').mockResolvedValue(expectedResponse.token);

        await AuthController.login(req, res);

        expect(res.json).toHaveBeenCalledWith(expectedResponse);

        jest.spyOn(AuthService, 'login').mockRestore();
      });
    });
  });
});
