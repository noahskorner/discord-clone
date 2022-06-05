import axios, { AxiosError } from 'axios';
import {
  ERROR_INSUFFICIENT_PERMISSIONS,
  ERROR_UNAUTHORIZED,
  ERROR_UNKOWN,
} from '../constants/errors';
import ErrorInterface from '../types/interfaces/error';

const handleServiceError = (
  error: any,
): { status: number; errors: ErrorInterface[] } => {
  console.log(error);

  let status = 500;
  let errors = [ERROR_UNKOWN];

  const isAxiosError = axios.isAxiosError(error) && error.response;
  if (isAxiosError) {
    const axiosError = error as AxiosError;
    const { data } = axiosError.response!;
    status = axiosError.response!.status ?? 500;

    const isValidErrorArray =
      Array.isArray(data) &&
      data.length > 0 &&
      (data as ErrorInterface[])[0].message != null;

    if (isValidErrorArray) {
      errors = data as ErrorInterface[];
    } else if (status === 403) {
      errors = [ERROR_INSUFFICIENT_PERMISSIONS];
    } else if (status === 401) {
      errors = [ERROR_UNAUTHORIZED];
    }
  }

  return { status, errors };
};

export default handleServiceError;
