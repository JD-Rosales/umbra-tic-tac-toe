export type boxStateType = null | 'O' | 'X';

export type GameStateType = {
  turn: number;
  boxState: boxStateType[];
  roundEnd: boolean;
  result: boxStateType | 'draw';
};

export type GameProviderType = {
  gameState: GameStateType;
  handleBoxClick: (index: number) => void;
  resetGameState: () => void;
};

export type SessionHistoryType = {
  id: string;
  updatedAt: Date;
  players: PlayerType[];
  rounds?: RoundType[];
};

type RoundType = {
  id: string;
  sessionId: string;
  winnerId?: string;
};

type PlayerType = {
  id: string;
  name: string;
};
