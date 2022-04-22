import request from 'supertest';
import app from '../../../../src/server/app';
import db from '../../../../src/server/db/models';
import User from '../../../../src/server/db/models/user.model';
import ChannelType from '../../../../src/utils/enums/channel-type';
import ServerDto from '../../../../src/utils/types/dtos/server';
import UserDto from '../../../../src/utils/types/dtos/user';
import LoginRequest from '../../../../src/utils/types/requests/auth/login';
import CreateChannelRequest from '../../../../src/utils/types/requests/server/channel/create-channel';
import CreateServerRequest from '../../../../src/utils/types/requests/server/create-server';
import CreateUserRequest from '../../../../src/utils/types/requests/user/create-user';

let baseURL = '';
let accessToken = '';
const username = 'test';
const email = 'test@test.com';
const password = 'password';
const payload = {
  type: ChannelType.TEXT,
  name: 'channel name',
} as CreateChannelRequest;

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
    const userDto: UserDto = registerResponse.body;
    const user = await User.findByPk(userDto.id);
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
      } as CreateServerRequest)
      .set('Authorization', `Bearer ${accessToken}`);

    const serverDto: ServerDto = createServerResponse.body;

    // Set baseURL
    baseURL = `/api/v1/server/${serverDto.id}/channel`;
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
  test('Should return bad request when server not found', async () => {
    // Arrange && Act
    const response = await request(app)
      .post('/api/v1/server/null/channel')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload);

    // Assert
    expect(response.statusCode).toBe(400);
  });
  test('Should return forbidden when user not in server', async () => {
    // Arrange
    const username = 'test1';
    const email = 'test1@test.com';
    const registerResponse = await request(app)
      .post('/api/v1/user')
      .send({
        username,
        email,
        password,
        confirmPassword: password,
      } as CreateUserRequest);
    const userDto: UserDto = registerResponse.body;
    const user = await User.findByPk(userDto.id);
    const verificationToken = user!.verificationToken!;
    await request(app).put(`/api/v1/user/verify-email/${verificationToken}`);
    const loginResponse = await request(app)
      .post('/api/v1/auth')
      .send({
        email,
        password,
      } as LoginRequest);
    const accessToken = loginResponse.body;

    // Act
    const response = await request(app)
      .post(baseURL)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload);

    // Assert
    expect(response.statusCode).toBe(403);
  });
  test('Should return created', async () => {
    // Arrange && Act
    const response = await request(app)
      .post(baseURL)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload);

    // Assert
    expect(response.statusCode).toBe(201);
  });
  test('Should return created channel with name', async () => {
    // Arrange && Act
    const response = await request(app)
      .post(baseURL)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload);

    // Assert
    expect(response.body.name).toBe(payload.name);
  });
  test('Should return created channel with type', async () => {
    // Arrange && Act
    const response = await request(app)
      .post(baseURL)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(payload);

    // Assert
    expect(response.body.type).toBe(payload.type);
  });
  afterAll(async () => {
    await db.sequelize.close();
  });
});
