import request from 'supertest';
import app from '../../../src/server/app';
import db from '../../../src/server/db/models';
import User from '../../../src/server/db/models/user.model';
import UserDto from '../../../src/utils/types/dtos/user';
import CreateUserRequest from '../../../src/utils/types/requests/user/create-user';

const baseURL = '/api/v1/auth';
const username = 'test';
const email = 'test@test.com';
const password = 'password';
let verificationToken = '';

describe('login should', () => {
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
    const user = await User.findByPk(userDto.id);
    verificationToken = user!.verificationToken!;
  });
  test('return bad request when email is null', async () => {
    // Arrange && Act
    const response = await request(app).post(baseURL);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('return bad request when email is invalid', async () => {
    // Arrange && Act
    const response = await request(app).post(baseURL);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('return bad request when password is null', async () => {
    // Arrange
    const payload = { email: 'test@test.com' };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('return bad request when password is invalid', async () => {
    // Arrange
    const payload = { email: 'test@test.com', password: '1234567' };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('return bad request when user not found', async () => {
    // Arrange
    const payload = { email, password };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('return bad request when password incorrect', async () => {
    // Arrange
    const payload = { email, password: '12345678' };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('return bad request when email is not verified', async () => {
    // Arrange
    const payload = { email, password };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('return created', async () => {
    // Arrange
    await request(app).put(`/api/v1/user/verify-email/${verificationToken}`);
    const payload = { email, password };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.statusCode).toBe(201);
  });
  test('return accessToken', async () => {
    // Arrange
    await request(app).put(`/api/v1/user/verify-email/${verificationToken}`);
    const payload = { email, password };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.body.length).toBeGreaterThan(1);
  });
  test('Should add refreshToken cookie', async () => {
    // Arrange
    const payload = { email, password };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    const cookie = response.headers['set-cookie'][0];
    expect(cookie).toContain('token');
  });
  afterAll(async () => {
    await db.sequelize.close();
  });
});
