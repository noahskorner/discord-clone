import axios, { AxiosError } from 'axios';
import { ERROR_UNKOWN } from '../constants/errors';
import ErrorInterface from '../types/interfaces/error';

const handleServiceError = (
  error: any,
): { status: number; errors: ErrorInterface[] } => {
  if (axios.isAxiosError(error) && error.response && error.response.data) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.data) {
      try {
        const status = axiosError.response.status;
        const errors = axiosError.response.data as ErrorInterface[];
        return {
          status,
          errors,
        };
      } catch {
        return { status: 500, errors: [ERROR_UNKOWN] };
      }
    } else {
      return { status: 500, errors: [ERROR_UNKOWN] };
    }
  } else {
    return { status: 500, errors: [ERROR_UNKOWN] };
  }
};

export default handleServiceError;
