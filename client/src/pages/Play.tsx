import { useEffect, useState } from 'react';
import Modal from '../components/modal';
import PageContainer from '../components/page-container';
import { useLocation, useNavigate } from 'react-router-dom';
import type { boxStateType } from '../types';
import { useLoadSession } from '../hooks/useSession';
import { useSaveRoundEnd } from '../hooks/useRound';
import LoadingOverlay from '../components/loading-overlay';
import { cn } from '../lib/utils';

type GameStateType = {
  turn: number;
  boxState: boxStateType[];
  roundEnd: boolean;
};

type ModalStateType = {
  open: boolean;
  result: boxStateType;
};

const gameStateInitialValue: GameStateType = {
  turn: 1,
  boxState: ['', '', '', '', '', '', '', '', ''],
  roundEnd: false,
};

export default function Play() {
  const navigate = useNavigate();
  const {
    data: sessionData,
    isSuccess,
    isError,
    isLoading: isSessionLoading,
  } = useLoadSession(getURLSearchParams());
  const saveRoundEnd = useSaveRoundEnd();
  const [modalState, setModalState] = useState<ModalStateType>({
    open: false,
    result: '',
  });
  const [gameState, setGameState] = useState<GameStateType>(
    gameStateInitialValue
  );

  const handleBoxClick = (index: number) => {
    // change box state only if box is not yet click and round has not ended
    if (gameState.boxState[index] === '' && !gameState.roundEnd) {
      setGameState((prevState) => {
        const updatedBoxState = [...prevState.boxState];
        updatedBoxState[index] = prevState.turn % 2 !== 0 ? 'X' : 'O';

        return {
          turn: prevState.turn + 1,
          boxState: updatedBoxState,
          roundEnd: false,
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
        saveRoundEnd.mutate({
          sessionId: sessionData?.data.id,
          winnerId: sessionData?.data.players[0].id,
        });
        setModalState({ open: true, result: 'X' });
        setGameState((prev) => ({ ...prev, roundEnd: true }));
        isWin = true;
        break; // Exit the loop if we found a winner
      } else if (
        gameState.boxState[a] === 'O' &&
        gameState.boxState[b] === 'O' &&
        gameState.boxState[c] === 'O'
      ) {
        console.log('player 2 wins');
        saveRoundEnd.mutate({
          sessionId: sessionData?.data.id,
          winnerId: sessionData?.data.players[1].id,
        });
        setModalState({ open: true, result: 'O' });
        setGameState((prev) => ({ ...prev, roundEnd: true }));
        isWin = true;
        break; // Exit the loop if we found a winner
      }
    }

    // Check for a draw only if no winner was found
    if (!isWin && gameState.boxState.every((box) => box !== '')) {
      console.log("It's a draw!");
      setModalState({ open: true, result: '' });
      setGameState((prev) => ({ ...prev, roundEnd: true }));
    }
  };

  useEffect(() => {
    checkGameEnd();
  }, [gameState.turn]);

  useEffect(() => {
    if (isSuccess) console.log(sessionData);

    if (isError) {
      navigate('/');
    }
  }, [isSuccess, isError]);

  return (
    <>
      <PageContainer className='flex flex-col gap-y-8 justify-center items-center'>
        {sessionData && (
          <h1 className='font-press_start font-bold text-3xl'>
            <span>
              {gameState.turn % 2 !== 0
                ? sessionData.data.players[0].name
                : sessionData.data.players[1].name}
            </span>{' '}
            turn
          </h1>
        )}
        <div className='grid grid-cols-3 gap-2'>
          {gameState.boxState.map((box, index) => (
            <div
              onClick={() => handleBoxClick(index)}
              key={index}
              className={cn(
                'flex justify-center items-center font-bold text-3xl h-[90px] w-[90px] rounded-md cursor-pointer select-none md:text-4xl md:h-[100px] md:w-[100px] xl:text-5xl xl:h-[110px] xl:w-[110px] bg-teal-900',
                box === 'X'
                  ? 'text-blue-600'
                  : box === 'O'
                  ? 'text-red-600'
                  : ''
              )}
            >
              {box === 'X' ? 'X' : box === 'O' ? 'O' : ''}
            </div>
          ))}
        </div>
      </PageContainer>

      <Modal isOpen={modalState.open && !saveRoundEnd.isPending}>
        {modalState.result}
      </Modal>
      <LoadingOverlay isOpen={isSessionLoading || saveRoundEnd.isPending} />
    </>
  );
}

function getURLSearchParams() {
  const urlParams = new URLSearchParams(useLocation().search);
  return urlParams.get('sessionId');
}
