import request from 'supertest';
import app from '../../../src/server/app';
import db from '../../../src/server/db/models';
import User from '../../../src/server/db/models/user.model';
import UserDto from '../../../src/utils/types/dtos/user';
import CreateUserRequest from '../../../src/utils/types/requests/user/create-user';

const username = 'test';
const email = 'test@test.com';
const password = 'password';
const baseURL = '/api/v1/user/verify-email';
let verificationToken = '';
let user: User | null = null;

const dropDatabaseAndRegisterUser = async () => {
  // Drop database
  await db.sequelize.sync({ force: true });

  // Register user
  const registerResponse = await request(app)
    .post('/api/v1/user')
    .send({
      username,
      email,
      password,
      confirmPassword: password,
    } as CreateUserRequest);

  // Mock verification email
  const userDto: UserDto = registerResponse.body;
  user = await User.findByPk(userDto.id);
  verificationToken = user!.verificationToken!;
};

describe('Test the user verify email functionality', () => {
  test('Should return bad request when token is invalid', async () => {
    // Arrange && Act
    const response = await request(app).put(`${baseURL}/invalid`);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('Should return ok', async () => {
    // Arrange
    await dropDatabaseAndRegisterUser();

    // Act
    const response = await request(app).put(`${baseURL}/${verificationToken}`);

    // Assert
    expect(response.statusCode).toBe(200);
  });
  test('Should return bad request when email already verified', async () => {
    // Arrange
    await dropDatabaseAndRegisterUser();

    // Act
    await request(app).put(`${baseURL}/${verificationToken}`);
    const response = await request(app).put(`${baseURL}/${verificationToken}`);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('Should verify users email', async () => {
    // Arrange
    await dropDatabaseAndRegisterUser();

    // Act
    await request(app).put(`${baseURL}/${verificationToken}`);
    user = await User.findByPk(user?.id);

    // Assert
    expect(user?.isVerified).toBeTruthy();
  });
  afterAll(async () => {
    await db.sequelize.close();
  });
});
