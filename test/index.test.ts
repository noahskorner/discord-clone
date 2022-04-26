import request from 'supertest';
import app from '../src/server/app';

describe('root path should', () => {
  test('return unauthorized', async () => {
    const response = await request(app).get('/api/v1');
    expect(response.statusCode).toBe(401);
  });
});

// logout
// getUser
// resetPassword
// confirmResetPassword
// server create
// server index
// server get
// channel get
