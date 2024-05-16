import { useEffect, useState } from 'react';
import Modal from '../components/modal';
import PageContainer from '../components/page-container';
import { useLocation } from 'react-router-dom';

export default function Play() {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (location.search) {
      console.log(location);
    }
  }, [location]);

  return (
    <>
      <PageContainer className='flex flex-col gap-y-8 justify-center items-center'>
        <h1 className='font-bold text-4xl'>
          <span className=''>Player 1</span> turn
        </h1>
        <div className='grid grid-cols-1 gap-2'>
          <div className='grid grid-cols-3 gap-2'>
            <div className='flex justify-center items-center h-[90px] w-[90px] rounded-md cursor-pointer md:h-[100px] md:w-[100px] xl:h-[110px] xl:w-[110px] bg-teal-900'>
              1
            </div>
            <div className='flex justify-center items-center h-[90px] w-[90px] rounded-md cursor-pointer md:h-[100px] md:w-[100px] xl:h-[110px] xl:w-[110px] bg-teal-900'>
              1
            </div>
            <div className='flex justify-center items-center h-[90px] w-[90px] rounded-md cursor-pointer md:h-[100px] md:w-[100px] xl:h-[110px] xl:w-[110px] bg-teal-900'>
              1
            </div>
          </div>

          <div className='grid grid-cols-3 gap-2'>
            <div className='flex justify-center items-center h-[90px] w-[90px] rounded-md cursor-pointer md:h-[100px] md:w-[100px] xl:h-[110px] xl:w-[110px] bg-teal-900'>
              1
            </div>
            <div className='flex justify-center items-center h-[90px] w-[90px] rounded-md cursor-pointer md:h-[100px] md:w-[100px] xl:h-[110px] xl:w-[110px] bg-teal-900'>
              1
            </div>
            <div className='flex justify-center items-center h-[90px] w-[90px] rounded-md cursor-pointer md:h-[100px] md:w-[100px] xl:h-[110px] xl:w-[110px] bg-teal-900'>
              1
            </div>
          </div>

          <div className='grid grid-cols-3 gap-2'>
            <div className='flex justify-center items-center h-[90px] w-[90px] rounded-md cursor-pointer md:h-[100px] md:w-[100px] xl:h-[110px] xl:w-[110px] bg-teal-900'>
              1
            </div>
            <div className='flex justify-center items-center h-[90px] w-[90px] rounded-md cursor-pointer md:h-[100px] md:w-[100px] xl:h-[110px] xl:w-[110px] bg-teal-900'>
              1
            </div>
            <div className='flex justify-center items-center h-[90px] w-[90px] rounded-md cursor-pointer md:h-[100px] md:w-[100px] xl:h-[110px] xl:w-[110px] bg-teal-900'>
              1
            </div>
          </div>
        </div>
      </PageContainer>

      <Modal isOpen={modalOpen} onBackdropClick={() => setModalOpen(false)}>
        modal
      </Modal>
    </>
  );
}
