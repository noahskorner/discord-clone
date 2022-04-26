import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  ERROR_INSUFFICIENT_PERMISSIONS,
  ERROR_UNAUTHORIZED,
  ERROR_UNKOWN,
} from '../../../../src/utils/constants/errors';
import handleServiceError from '../../../../src/utils/services/handle-service-error';

const getAxiosError = () => {
  return {
    name: '',
    message: '',
    config: {} as AxiosRequestConfig,
    response: undefined,
    isAxiosError: true,
    toJSON: () => {
      return {};
    },
  } as AxiosError;
};

describe('handleService error should', () => {
  test('return status 500 when error is not exios error', () => {
    // Arrange
    const error = null;

    // Act
    const serviceError = handleServiceError(error);

    // Assert
    expect(serviceError.status).toBe(500);
  });
  test('return unknown error message when error is not exios error', () => {
    // Arrange
    const error = null;

    // Act
    const serviceError = handleServiceError(error);

    // Assert
    expect(serviceError.errors[0]).toBe(ERROR_UNKOWN);
  });
  test('return status 500 when response is null', () => {
    // Arrange
    const error = getAxiosError();

    // Act
    const serviceError = handleServiceError(error);

    // Assert
    expect(serviceError.status).toBe(500);
  });
  test('return unknown error message when response is null', () => {
    // Arrange
    const error = getAxiosError();

    // Act
    const serviceError = handleServiceError(error);

    // Assert
    expect(serviceError.errors[0]).toBe(ERROR_UNKOWN);
  });
  test('return status 500 when data is null', () => {
    // Arrange
    const error = getAxiosError();
    error.response = {} as AxiosResponse;

    // Act
    const serviceError = handleServiceError(error);

    // Assert
    expect(serviceError.status).toBe(500);
  });
  test('return unknown error message when data is null', () => {
    // Arrange
    const error = getAxiosError();
    error.response = {} as AxiosResponse;

    // Act
    const serviceError = handleServiceError(error);

    // Assert
    expect(serviceError.errors[0]).toBe(ERROR_UNKOWN);
  });
  test('return unknown error message when data is not an array', () => {
    // Arrange
    const error = getAxiosError();
    error.response = {
      status: 418,
      data: {},
    } as AxiosResponse;

    // Act
    const serviceError = handleServiceError(error);

    // Assert
    expect(serviceError.errors[0]).toBe(ERROR_UNKOWN);
  });
  test('return unknown error message when data array is empty', () => {
    // Arrange
    const error = getAxiosError();
    error.response = {
      status: 418,
      data: [],
    } as AxiosResponse;

    // Act
    const serviceError = handleServiceError(error);

    // Assert
    expect(serviceError.errors[0]).toBe(ERROR_UNKOWN);
  });
  test('return response status', () => {
    // Arrange
    const error = getAxiosError();
    error.response = {
      status: 418,
      data: {},
    } as AxiosResponse;

    // Act
    const serviceError = handleServiceError(error);

    // Assert
    expect(serviceError.status).toBe(418);
  });
  test('return response errors', () => {
    // Arrange
    const expectedError = {
      message: 'Test error message',
    };
    const error = getAxiosError();
    error.response = {
      status: 418,
      data: [expectedError],
    } as AxiosResponse;

    // Act
    const serviceError = handleServiceError(error);

    // Assert
    expect(serviceError.errors[0]).toBe(expectedError);
  });
  test('return insufficient permissions error when status is 403 and no response errors', () => {
    // Arrange
    const error = getAxiosError();
    error.response = {
      status: 403,
    } as AxiosResponse;

    // Act
    const serviceError = handleServiceError(error);

    // Assert
    expect(serviceError.errors[0]).toBe(ERROR_INSUFFICIENT_PERMISSIONS);
  });
  test('return unauthorized error when status is 401 and no response errors', () => {
    // Arrange
    const error = getAxiosError();
    error.response = {
      status: 401,
    } as AxiosResponse;

    // Act
    const serviceError = handleServiceError(error);

    // Assert
    expect(serviceError.errors[0]).toBe(ERROR_UNAUTHORIZED);
  });
});
