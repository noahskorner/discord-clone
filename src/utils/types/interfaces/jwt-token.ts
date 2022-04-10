import RequestUser from '../dtos/request-user';

interface JwtToken extends RequestUser {
  exp: number;
}

export default JwtToken;
