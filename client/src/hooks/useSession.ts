import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import getErrorMessage from '../lib/hook-error-handler';

export const useNewSession = () =>
  useMutation({
    mutationFn: (params: { player1: string; player2: string }) => {
      return axios.post('/api/session', params).catch((error) => {
        throw getErrorMessage(error);
      });
    },
  });
