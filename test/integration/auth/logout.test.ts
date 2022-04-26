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
let accessToken = '';

const loginUser = async () => {
  const response = await request(app).post('/api/v1/auth').send({
    email,
    password,
  });
  accessToken = response.body;
};

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
    const verificationToken = user!.verificationToken!;

    // Verify the user
    await request(app).put(`/api/v1/user/verify-email/${verificationToken}`);
  });
  test('return unauthorized when user is not logged in', async () => {
    // Arrange && Act
    const response = await request(app).delete(baseURL);

    // Assert
    expect(response.statusCode).toBe(401);
  });
  test('return unauthorized when token cookie not present', async () => {
    // Arrange
    await loginUser();

    // Act
    const response = await request(app).delete(baseURL);

    // Assert
    expect(response.statusCode).toBe(401);
  });
  afterAll(async () => {
    await db.sequelize.close();
  });
});
