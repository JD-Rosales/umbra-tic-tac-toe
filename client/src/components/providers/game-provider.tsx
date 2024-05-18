import { useState, useEffect, createContext } from 'react';
import type { GameStateType, GameProviderType } from '../../types';

const gameStateInitialValue: GameStateType = {
  turn: 1,
  boxState: [null, null, null, null, null, null, null, null, null],
  roundEnd: false,
  result: null,
};

export const GameProviderContext = createContext<GameProviderType | null>(null);

export default function GameProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [gameState, setGameState] = useState<GameStateType>(
    gameStateInitialValue
  );

  const handleBoxClick = (index: number) => {
    // change box state only if box is not yet click and round has not ended
    if (gameState.boxState[index] === null && !gameState.roundEnd) {
      setGameState((prevState) => {
        const updatedBoxState = [...prevState.boxState];
        updatedBoxState[index] = prevState.turn % 2 !== 0 ? 'X' : 'O';

        return {
          turn: prevState.turn + 1,
          boxState: updatedBoxState,
          roundEnd: false,
          result: null,
        };
      });
    }
  };

  const checkGameEnd = () => {
    let isWin = false;
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (
        gameState.boxState[a] === 'X' &&
        gameState.boxState[b] === 'X' &&
        gameState.boxState[c] === 'X'
      ) {
        console.log('player 1 wins');
        setGameState((prev) => ({ ...prev, roundEnd: true, result: 'X' }));
        isWin = true;
        break; // Exit the loop if we found a winner
      } else if (
        gameState.boxState[a] === 'O' &&
        gameState.boxState[b] === 'O' &&
        gameState.boxState[c] === 'O'
      ) {
        console.log('player 2 wins');
        setGameState((prev) => ({ ...prev, roundEnd: true, result: 'O' }));
        isWin = true;
        break; // Exit the loop if we found a winner
      }
    }

    // Check for a draw only if no winner was found
    if (!isWin && gameState.boxState.every((box) => box !== null)) {
      console.log("It's a draw!");
      setGameState((prev) => ({ ...prev, roundEnd: true, result: 'draw' }));
    }
  };

  const resetGameState = () => {
    setGameState(gameStateInitialValue);
  };

  useEffect(() => {
    checkGameEnd();
  }, [gameState.turn]);

  return (
    <GameProviderContext.Provider
      value={{ gameState, handleBoxClick, resetGameState }}
    >
      {children}
    </GameProviderContext.Provider>
  );
}
