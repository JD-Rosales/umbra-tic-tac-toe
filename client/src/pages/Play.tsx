import { useEffect, useState } from 'react';
import Modal from '../components/modal';
import PageContainer from '../components/page-container';
import { useLocation, useNavigate } from 'react-router-dom';
import type { boxStateType } from '../types';
import { useLoadSession } from '../hooks/useSession';
import LoadingOverlay from '../components/loading-overlay';
import { cn } from '../lib/utils';

type gameStateType = {
  turn: number;
  boxState: boxStateType[];
};

const gameStateInitialValue: gameStateType = {
  turn: 1,
  boxState: ['', '', '', '', '', '', '', '', ''],
};

export default function Play() {
  const navigate = useNavigate();
  const {
    data: playerData,
    isSuccess,
    isError,
    isLoading: isSessionLoading,
  } = useLoadSession(getURLSearchParams());
  const [modalOpen, setModalOpen] = useState(false);

  const [gameState, setGameState] = useState<gameStateType>(
    gameStateInitialValue
  );

  const handleBoxClick = (index: number) => {
    // change box state only if box is not yet click
    if (gameState.boxState[index] === '') {
      setGameState((prevState) => {
        const updatedBoxState = [...prevState.boxState];
        updatedBoxState[index] = prevState.turn % 2 !== 0 ? 'X' : 'O';

        return { turn: prevState.turn + 1, boxState: updatedBoxState };
      });
    }
  };

  const checkIfWon = () => {
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
        gameState.boxState[a] === 'O' &&
        gameState.boxState[b] === 'O' &&
        gameState.boxState[c] === 'O'
      ) {
        console.log('player O wins');
        return;
      } else if (
        gameState.boxState[a] === 'X' &&
        gameState.boxState[b] === 'X' &&
        gameState.boxState[c] === 'X'
      ) {
        console.log('player X wins');
        return;
      }

      if (gameState.boxState.every((box) => box !== '')) {
        console.log("It's a draw!");
        return;
      }
    }
  };

  useEffect(() => {
    checkIfWon();
  }, [gameState]);

  useEffect(() => {
    if (isSuccess) console.log(playerData);

    if (isError) {
      navigate('/');
    }
  }, [isSuccess, isError]);

  return (
    <>
      <PageContainer className='flex flex-col gap-y-8 justify-center items-center'>
        {playerData && (
          <h1 className='font-press_start font-bold text-3xl'>
            <span>
              {gameState.turn % 2 !== 0
                ? playerData.data.players[0].name
                : playerData.data.players[1].name}
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

      <Modal isOpen={modalOpen} onBackdropClick={() => setModalOpen(false)}>
        modal
      </Modal>
      <LoadingOverlay isOpen={isSessionLoading} />
    </>
  );
}

function getURLSearchParams() {
  const urlParams = new URLSearchParams(useLocation().search);
  return urlParams.get('sessionId');
}
