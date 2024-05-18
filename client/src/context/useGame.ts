import { useContext } from 'react';
import { GameProviderContext } from '../components/providers/game-provider';

export const useGame = () => {
  const context = useContext(GameProviderContext);

  if (!context) throw new Error('Context must be used within a Provider');
  return { ...context };
};
