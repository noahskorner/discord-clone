import request from 'supertest';
import app from '../../../src/server/app';
import db from '../../../src/server/db/models';
import User from '../../../src/server/db/models/user.model';
import UserDto from '../../../src/utils/types/dtos/user';
import CreateUserRequest from '../../../src/utils/types/requests/user/create-user';
import jwt from 'jsonwebtoken';
import RequestUser from '../../../src/utils/types/dtos/request-user';
import env from '../../../src/config/env.config';

const baseURL = '/api/v1/auth';
const username = 'test';
const email = 'test@test.com';
const password = 'password';
let verificationToken = '';
let user: User | null = null;

describe('Test refreshing the token', () => {
  beforeAll(async () => {
    // Drop database
    await db.sequelize.sync({ force: true });

    // Register the user
    const response = await request(app)
      .post('/api/v1/user')
      .send({
        username,
        email,
        password,
        confirmPassword: password,
      } as CreateUserRequest);

    // Mock the verification email
    const userDto: UserDto = response.body;
    user = await User.findByPk(userDto.id);
    verificationToken = user!.verificationToken!;

    // Verify email
    await request(app).put(`/api/v1/user/verify-email/${verificationToken}`);
  });
  test('Should return unauthorized when user is not logged in', async () => {
    // Arrange && Act
    const response = await request(app).get(baseURL);

    // Assert
    expect(response.statusCode).toBe(401);
  });
  test('Should return unauthorized when token not found', async () => {
    // Arrange && Act
    const response = await request(app)
      .get(baseURL)
      .set('Cookie', ['token=null']);

    // Assert
    expect(response.statusCode).toBe(401);
  });
  test('Should return unauthorized when token is expired', async () => {
    // Arrange
    const requestUser = new RequestUser(user!).toJSON();
    const token = jwt.sign(requestUser, env.REFRESH_TOKEN_SECRET, {
      expiresIn: 0,
    });

    // Act
    const response = await request(app)
      .get(baseURL)
      .set('Cookie', [`token=${token}`]);

    // Assert
    expect(response.statusCode).toBe(401);
  });
  test('Should return unauthorized when user not found', async () => {
    // Arrange
    const requestUser = new RequestUser(user!).toJSON();
    requestUser.id++;
    const token = jwt.sign(requestUser, env.REFRESH_TOKEN_SECRET, {
      expiresIn: env.REFRESH_TOKEN_EXPIRATION,
    });

    // Act
    const response = await request(app)
      .get(baseURL)
      .set('Cookie', [`token=${token}`]);

    // Assert
    expect(response.statusCode).toBe(401);
  });
  test('Should return ok', async () => {
    // Arrange
    const loginResponse = await request(app)
      .post(baseURL)
      .send({ email, password });

    // Act
    const response = await request(app)
      .get(baseURL)
      .set('Cookie', loginResponse.headers['set-cookie']);

    // Assert
    expect(response.statusCode).toBe(200);
  });
  afterAll(async () => {
    await db.sequelize.close();
  });
});
