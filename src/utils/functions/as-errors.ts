import ErrorInterface from '../types/interfaces/error';

const asErrors = (error: string) => {
  return [
    {
      message: error,
    } as ErrorInterface,
  ];
};

export default asErrors;
