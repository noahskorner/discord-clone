import ErrorInterface from '../types/interfaces/error';

export const ERROR_UNKOWN = {
  message: 'An unknown error has occurred. Please try again.',
} as ErrorInterface;
export const ERROR_INSUFFICIENT_PERMISSIONS = {
  message: 'You do not have permission to perform this action.',
} as ErrorInterface;
export const ERROR_UNAUTHORIZED = {
  message: 'You must be logged in to perform this action.',
} as ErrorInterface;
