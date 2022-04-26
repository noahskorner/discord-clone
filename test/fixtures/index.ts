import request from 'supertest';
import app from '../../src/server/app';
import CreateUserRequest from '../../src/utils/types/requests/user/create-user';
import { faker } from '@faker-js/faker';
import UserDto from '../../src/utils/types/dtos/user';
import User from '../../src/server/db/models/user.model';
import LoginRequest from '../../src/utils/types/requests/auth/login';
import ServerDto from '../../src/utils/types/dtos/server';
import CreateServerRequest from '../../src/utils/types/requests/server/create-server';

export const registerUser = async () => {
  const username = faker.random.alphaNumeric(4);
  const email = faker.internet.email();
  const password = faker.random.alphaNumeric(8);

  const response = await request(app)
    .post('/api/v1/user')
    .send({
      username,
      email,
      password,
      confirmPassword: password,
    } as CreateUserRequest);

  // Mock verification email
  const userDto: UserDto = response.body;
  const user = await User.findByPk(userDto.id);

  return {
    userId: userDto.id,
    email,
    password,
    verificationToken: user!.verificationToken!,
  };
};

export const verifyEmail = async (verificationToken: string) => {
  await request(app).put(`/api/v1/user/verify-email/${verificationToken}`);
};

export const createAndLoginUser = async () => {
  const { email, password, verificationToken } = await registerUser();
  await verifyEmail(verificationToken);

  const response = await request(app)
    .post('/api/v1/auth')
    .send({
      email,
      password,
    } as LoginRequest);

  return response.body;
};

export const createServer = async (accessToken: string) => {
  // Create server
  const createServerResponse = await request(app)
    .post('/api/v1/server')
    .send({
      name: 'test server',
    } as CreateServerRequest)
    .set('Authorization', `Bearer ${accessToken}`);

  return createServerResponse.body as ServerDto;
};
