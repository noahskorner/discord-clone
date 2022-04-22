import request from 'supertest';
import app from '../../../../src/server/app';
import db from '../../../../src/server/db/models';

describe('Test the user register functionality', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
  });
  test('Should return bad request when username is null', async () => {
    // Arrange && Act
    const response = await request(app).post('/api/v1/user');

    // Assert
    expect(response.statusCode).toBe(400);
  });
  afterAll(async () => {
    await db.sequelize.close();
  });
});
