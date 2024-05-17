import { useEffect, useState } from 'react';
import Modal from '../components/modal';
import PageContainer from '../components/page-container';
import { useLocation } from 'react-router-dom';
import type { boxStateType } from '../types';

export default function Play() {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [boxState, setBoxState] = useState<boxStateType[]>([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const handleBoxClick = (index: number) => {
    setBoxState((prevBoxState) => {
      const updatedBoxState = [...prevBoxState];
      updatedBoxState[index] = 'X';
      return updatedBoxState;
    });
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
      if (boxState[a] === 'O' && boxState[b] === 'O' && boxState[c] === 'O') {
        console.log('player O wins');
        return;
      } else if (
        boxState[a] === 'X' &&
        boxState[b] === 'X' &&
        boxState[c] === 'X'
      ) {
        console.log('player X wins');
        return;
      }

      if (boxState.every((box) => box !== '')) {
        console.log("It's a draw!");
        return;
      }
    }
  };

  useEffect(() => {
    if (location.search) {
      console.log(location);
    }
  }, [location]);

  // check if there's a winner when the boxState array change
  useEffect(() => {
    checkIfWon();
    console.log('test');
  }, [boxState]);

  return (
    <>
      <PageContainer className='flex flex-col gap-y-8 justify-center items-center'>
        <h1 className='font-bold text-4xl'>
          <span className=''>Player 1</span> turn
        </h1>
        <div className='grid grid-cols-3 gap-2'>
          {boxState.map((box, index) => (
            <div
              onClick={() => handleBoxClick(index)}
              key={index}
              className='flex justify-center items-center font-bold text-3xl h-[90px] w-[90px] rounded-md cursor-pointer select-none md:text-4xl md:h-[100px] md:w-[100px] xl:text-5xl xl:h-[110px] xl:w-[110px] bg-teal-900'
            >
              {box === 'X' ? 'X' : box === 'O' ? 'O' : ''}
            </div>
          ))}
        </div>
      </PageContainer>

      <Modal isOpen={modalOpen} onBackdropClick={() => setModalOpen(false)}>
        modal
      </Modal>
    </>
  );
}
