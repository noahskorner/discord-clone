import request from 'supertest';
import app from '../../../../src/server/app';
import db from '../../../../src/server/db/models';
import User from '../../../../src/server/db/models/user.model';
import ChannelType from '../../../../src/utils/enums/channel-type';
import ServerDTO from '../../../../src/utils/types/dtos/server';
import UserDTO from '../../../../src/utils/types/dtos/user';
import LoginRequest from '../../../../src/utils/types/requests/auth/login';
import CreateServerRequest from '../../../../src/utils/types/requests/server/create-server';
import CreateUserRequest from '../../../../src/utils/types/requests/user/create-user';

let baseURL = '';
let accessToken = '';
const username = 'test';
const email = 'test@test.com';
const password = 'password';

describe('Test channel create', () => {
  beforeAll(async () => {
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
    const userDTO: UserDTO = registerResponse.body;
    const user = await User.findByPk(userDTO.id);
    const verificationToken = user!.verificationToken!;

    // Verify email
    await request(app).put(`/api/v1/user/verify-email/${verificationToken}`);

    // Login user
    const loginResponse = await request(app)
      .post('/api/v1/auth')
      .send({
        email,
        password,
      } as LoginRequest);
    accessToken = loginResponse.body;

    // Create server
    const createServerResponse = await request(app)
      .post('/api/v1/server')
      .send({
        name: 'test server',
      } as CreateServerRequest);
    const serverDTO: ServerDTO = createServerResponse.body;

    // Set baseURL
    baseURL = `/api/v1/server/${serverDTO.id}/channel`;
  });
  test('Should return unauthorized when user is not logged in', async () => {
    // Arrange && Act
    const response = await request(app).post(baseURL);

    // Assert
    expect(response.statusCode).toBe(401);
  });
  test('Should return bad request when type not provided', async () => {
    // Arrange && Act
    const response = await request(app)
      .post(baseURL)
      .set('Authorization', `Bearer ${accessToken}`);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('Should return bad request when type not valid', async () => {
    // Arrange
    const payload = {
      type: '',
    };

    // Act
    const response = await request(app)
      .post(baseURL)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('Should return bad request when name not provided', async () => {
    // Arrange
    const payload = {
      type: ChannelType.TEXT,
    };

    // Act
    const response = await request(app)
      .post(baseURL)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('Should return bad request when name not valid', async () => {
    // Arrange
    const payload = {
      type: ChannelType.TEXT,
      name: '123',
    };

    // Act
    const response = await request(app)
      .post(baseURL)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });

  afterAll(async () => {
    await db.sequelize.close();
  });
});
