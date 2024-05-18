import { useEffect, useState } from 'react';
import Modal from '../components/modal';
import PageContainer from '../components/page-container';
import Versus from '../components/versus';
import { useNewSession } from '../hooks/useSession';
import { useNavigate } from 'react-router-dom';

export default function App() {
  const startNewSession = useNewSession();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [players, setPlayers] = useState({
    player1: '',
    player2: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setPlayers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStartGame = () => {
    startNewSession.mutate(players);
  };

  useEffect(() => {
    if (startNewSession.isSuccess) {
      startNewSession.reset();
      navigate(`/play?sessionId=${startNewSession.data.data.id}`);
    }
  }, [startNewSession.isSuccess]);

  return (
    <>
      <PageContainer className='flex flex-col justify-center items-center'>
        <button
          onClick={() => setIsModalOpen(true)}
          className='relative font-press_start text-xs cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-white rounded-[16px] active:scale-95'
        >
          <span className='w-full h-full flex items-center gap-2 px-8 py-3  bg-[#134E4A] text-white rounded-[14px]'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              className='w-7 h-7'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
            >
              <path d='M8 13V9m-2 2h4m5-2v.001M18 12v.001m4-.334v5.243a3.09 3.09 0 0 1-5.854 1.382L16 18a3.618 3.618 0 0 0-3.236-2h-1.528c-1.37 0-2.623.774-3.236 2l-.146.292A3.09 3.09 0 0 1 2 16.91v-5.243A6.667 6.667 0 0 1 8.667 5h6.666A6.667 6.667 0 0 1 22 11.667Z'></path>
            </svg>
            START NEW GAME
          </span>
        </button>
      </PageContainer>

      <Modal
        isOpen={isModalOpen}
        onBackdropClick={() => setIsModalOpen(false)}
        className='flex flex-col justify-center items-center gap-y-8 py-8 w-[600px] mx-2'
      >
        <div className='flex flex-col sm:grid sm:grid-cols-3 gap-y-8 sm:gap-y-6 w-full'>
          <div className='flex flex-col justify-center items-center gap-y-2 sm:gap-y-4'>
            <span className='font-press_start font-bold text-center text-base'>
              PLAYER 1 NAME
            </span>
            <input
              onChange={handleInputChange}
              className='w-full bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-slate-300 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-slate-400'
              autoComplete='off'
              placeholder='Player name...'
              name='player1'
              type='text'
            />
          </div>
          <div className='flex justify-center items-center'>
            <Versus className='w-10 h-10' />
          </div>
          <div className='flex flex-col justify-center items-center gap-y-2 sm:gap-y-4'>
            <span className='font-press_start font-bold text-center text-base'>
              PLAYER 2 NAME
            </span>
            <input
              onChange={handleInputChange}
              className='w-full bg-zinc-200 text-zinc-600 font-mono ring-1 ring-zinc-400 focus:ring-2 focus:ring-slate-300 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 rounded-full px-4 py-2 shadow-md focus:shadow-lg focus:shadow-slate-400'
              autoComplete='off'
              placeholder='Player name...'
              name='player2'
              type='text'
            />
          </div>

          {startNewSession.isError && (
            <p className='text-red-600 text-center col-span-3'>
              {startNewSession.error.message}
            </p>
          )}

          <div className='col-span-3 flex justify-center'>
            <button
              onClick={handleStartGame}
              className='relative font-press_start text-xs cursor-pointer opacity-90 hover:opacity-100 transition-opacity p-[2px] bg-white rounded-[16px] active:scale-95'
            >
              <span className='w-full h-full flex items-center gap-2 px-8 py-3  bg-[#134E4A] text-white rounded-[14px] text-xs'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                >
                  <path d='M8 13V9m-2 2h4m5-2v.001M18 12v.001m4-.334v5.243a3.09 3.09 0 0 1-5.854 1.382L16 18a3.618 3.618 0 0 0-3.236-2h-1.528c-1.37 0-2.623.774-3.236 2l-.146.292A3.09 3.09 0 0 1 2 16.91v-5.243A6.667 6.667 0 0 1 8.667 5h6.666A6.667 6.667 0 0 1 22 11.667Z'></path>
                </svg>
                START
              </span>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
