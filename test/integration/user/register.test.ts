import request from 'supertest';
import app from '../../../src/server/app';
import db from '../../../src/server/db/models';

const baseURL = '/api/v1/user';

describe('Test the user register functionality', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });
  test('Should return bad request when username is null', async () => {
    // Arrange && Act
    const response = await request(app).post(baseURL);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('Should return bad request when username is invalid', async () => {
    // Arrange
    const payload = {
      username: '',
    };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('Should return bad request when email is null', async () => {
    // Arrange
    const payload = {
      username: '1234',
    };

    // Act
    const response = await request(app).post(baseURL).send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('Should return bad request when email is invalid', async () => {
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
  test('Should return bad request when password is null', async () => {
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
  test('Should return bad request when password is invalid', async () => {
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
  test('Should return bad request when confirmPassword is null', async () => {
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
  test('Should return bad request when confirmPassword is invalid', async () => {
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
  test('Should return created', async () => {
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
    expect(response.body.id).toBeDefined();
  });
  test('Should return bad request when email already exists', async () => {
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
