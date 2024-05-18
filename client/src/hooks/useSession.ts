import { useMutation, useQuery } from '@tanstack/react-query';
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

export const useLoadSession = (sessionId: string | null) =>
  useQuery({
    queryKey: ['session'],
    queryFn: () =>
      axios.get(`/api/session/getSession/${sessionId}`).catch((error) => {
        throw getErrorMessage(error);
      }),
  });

export const getAllSessionHistory = () =>
  useQuery({
    queryKey: ['all-session-history'],
    queryFn: () =>
      axios.get('/api/session').catch((error) => {
        throw getErrorMessage(error);
      }),
  });
