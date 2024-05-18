import { getAllSessionHistory } from '../hooks/useSession';
import Versus from '../components/versus';
import type { SessionHistoryType } from '../types';

export default function GameHistory() {
  const { data, isLoading } = getAllSessionHistory();

  const getDrawRoundsLength = (data: SessionHistoryType) => {
    if (!data.rounds) return 0;
    return data.rounds.filter((round) => !round.winnerId).length;
  };

  const getPlayerWins = (playerId: string, data: SessionHistoryType) => {
    if (!data.rounds) return 0;
    return data.rounds.filter((round) => playerId === round.winnerId).length;
  };

  return (
    <div className='w-full max-w-3xl my-12 py-4 px-4 flex flex-col gap-y-12'>
      {isLoading ? (
        <span className='text-center'>Loading Game History...</span>
      ) : !data ? (
        'No History Available'
      ) : (
        data.data.map((data: SessionHistoryType) => (
          <div key={data.id} className='flex flex-col gap-y-4'>
            <div className='grid grid-cols-5 gap-x-2 justify-center items-center'>
              <div className='col-span-2 flex flex-col gap-y-2 text-center text-2xl uppercase font-semibold'>
                <span className='text-blue-600 font-bold font-press_start'>
                  X
                </span>
                <span className='break-all'>{data.players[0].name}</span>

                <div className='flex flex-col text-base'>
                  <span>Wins:</span>
                  <span>{getPlayerWins(data.players[0].id, data)}</span>
                </div>
              </div>
              <div className='col-span-1 flex items-center justify-center'>
                <Versus color='white' className='w-10 h-10' />
              </div>
              <div className='col-span-2 flex flex-col gap-y-2 text-center text-2xl uppercase font-semibold'>
                <span className='text-red-600 font-bold font-press_start'>
                  O
                </span>
                <span className='break-all'>{data.players[1].name}</span>

                <div className='flex flex-col text-base'>
                  <span>Wins:</span>
                  <span>{getPlayerWins(data.players[1].id, data)}</span>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-y-1 text-center'>
              <div className='flex flex-col'>
                <span>Total Rounds:</span>
                <span>{data.rounds?.length}</span>
              </div>

              <div className='flex flex-col'>
                <span>Draws:</span>
                <span>{getDrawRoundsLength(data)}</span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
