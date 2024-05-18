import { useEffect } from 'react';
import Modal from '../components/modal';
import PageContainer from '../components/page-container';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLoadSession } from '../hooks/useSession';
import { useSaveRoundEnd } from '../hooks/useRound';
import LoadingOverlay from '../components/loading-overlay';
import { cn } from '../lib/utils';
import { useGame } from '../context/useGame';
import { WinnerImage } from '../components/winner-image';

export default function Play() {
  const navigate = useNavigate();
  const {
    data: sessionData,
    isError,
    isLoading: isSessionLoading,
  } = useLoadSession(getURLSearchParams());
  const saveRoundEnd = useSaveRoundEnd();
  const { gameState, handleBoxClick, resetGameState } = useGame();

  const getWinnerName = () => {
    if (gameState.result === 'X')
      return sessionData?.data.players[0].name + ' Wins';
    else if (gameState.result === 'O')
      return sessionData?.data.players[1].name + ' Wins';
    else return 'Draw';
  };

  const handleStopGame = () => {
    navigate('/', { replace: true });
  };

  // save result to database on round end
  useEffect(() => {
    if (gameState.roundEnd) {
      if (gameState.result === 'X') {
        saveRoundEnd.mutate({
          sessionId: sessionData?.data.id,
          winnerId: sessionData?.data.players[0].id,
        });
      } else if (gameState.result === 'O') {
        saveRoundEnd.mutate({
          sessionId: sessionData?.data.id,
          winnerId: sessionData?.data.players[1].id,
        });
      } else {
        saveRoundEnd.mutate({
          sessionId: sessionData?.data.id,
        });
      }
    }
  }, [gameState.roundEnd]);

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError]);

  return (
    <>
      <PageContainer className='flex flex-col gap-y-8 justify-center items-center'>
        {sessionData && (
          <h1 className='font-bold text-3xl'>
            {gameState.turn % 2 !== 0
              ? `${sessionData.data.players[0].name}`
              : `${sessionData.data.players[1].name}`}{' '}
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

      <Modal
        isOpen={gameState.roundEnd && !saveRoundEnd.isPending}
        className='flex flex-col justify-center items-center w-full max-w-md gap-y-1 pb-6 mx-2'
      >
        <span className='font-bold text-2xl'>{getWinnerName()}</span>

        <div className='w-full px-4'>
          <WinnerImage />
        </div>

        <div className='grid grid-cols-2 gap-x-6 font-bold text-white'>
          <button
            onClick={resetGameState}
            className='bg-teal-900 px-4 py-3 rounded-md'
          >
            Continue
          </button>
          <button
            onClick={handleStopGame}
            className='bg-red-900 px-4 py-3 rounded-md'
          >
            Stop
          </button>
        </div>
      </Modal>
      <LoadingOverlay isOpen={isSessionLoading || saveRoundEnd.isPending} />
    </>
  );
}

function getURLSearchParams() {
  const urlParams = new URLSearchParams(useLocation().search);
  return urlParams.get('sessionId');
}
