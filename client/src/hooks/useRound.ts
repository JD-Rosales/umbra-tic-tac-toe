import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import getErrorMessage from '../lib/hook-error-handler';

export const useSaveRoundEnd = () =>
  useMutation({
    mutationFn: (params: { sessionId: string; winnerId?: string }) => {
      return axios.post('/api/round', params).catch((error) => {
        throw getErrorMessage(error);
      });
    },
  });
