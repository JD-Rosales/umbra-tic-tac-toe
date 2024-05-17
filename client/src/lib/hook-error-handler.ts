import { AxiosError } from 'axios';

const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) return error.response?.data;
  return 'An unknown error has occured.';
};

export default getErrorMessage;
