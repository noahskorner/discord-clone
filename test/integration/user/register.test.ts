import request from 'supertest';
import app from '../../../src/server/app';
import db from '../../../src/server/db/models';

const baseURL = '/api/v1/user';

describe('register user should', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });
  test('return bad request when username is null', async () => {
    // Arrange && Act
    const response = await request(app).post(baseURL);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('return bad request when username is invalid', async () => {
    // Arrange
    const payload = {
      username: '',
    };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('return bad request when email is null', async () => {
    // Arrange
    const payload = {
      username: '1234',
    };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('return bad request when email is invalid', async () => {
    // Arrange
    const payload = {
      username: '1234',
      email: '',
    };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('return bad request when password is null', async () => {
    // Arrange
    const payload = {
      username: '1234',
      email: 'test@test.com',
    };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('return bad request when password is invalid', async () => {
    // Arrange
    const payload = {
      username: '1234',
      email: 'test@test.com',
      password: '1234567',
    };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('return bad request when confirmPassword is null', async () => {
    // Arrange
    const payload = {
      username: '1234',
      email: 'test@test.com',
      password: '12345678',
    };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('return bad request when confirmPassword is invalid', async () => {
    // Arrange
    const payload = {
      username: '1234',
      email: 'test@test.com',
      password: '12345678',
      confirmPassword: '12345679',
    };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('return created', async () => {
    // Arrange
    const email = 'test@test.com';
    const payload = {
      username: 'test',
      email: email,
      password: 'password',
      confirmPassword: 'password',
    };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.statusCode).toBe(201);
  });
  test('return created with username', async () => {
    // Arrange
    const email = 'test1@test.com';
    const payload = {
      username: 'test1',
      email: email,
      password: 'password',
      confirmPassword: 'password',
    };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.body.username).toBe(payload.username);
  });
  test('return created with email', async () => {
    // Arrange
    const email = 'test2@test.com';
    const payload = {
      username: 'test2',
      email: email,
      password: 'password',
      confirmPassword: 'password',
    };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.body.email).toBe(payload.email);
  });
  test('return created with id', async () => {
    // Arrange
    const email = 'test3@test.com';
    const payload = {
      username: 'test3',
      email: email,
      password: 'password',
      confirmPassword: 'password',
    };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.body.id).toBeGreaterThan(0);
  });
  test('return bad request when email already exists', async () => {
    // Arrange
    const email = 'test@test.com';
    const payload = {
      username: 'test',
      email: email,
      password: 'password',
      confirmPassword: 'password',
    };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  afterAll(async () => {
    await db.sequelize.close();
  });
});
