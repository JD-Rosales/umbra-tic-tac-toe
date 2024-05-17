export default function LoadingOverlay({ isOpen }: { isOpen: boolean }) {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-all ${
        isOpen ? 'visible bg-black/10 backdrop-blur-sm' : 'invisible'
      }`}
    >
      <div className='wrapper'>
        <div className='circle-custom'></div>
        <div className='circle-custom'></div>
        <div className='circle-custom'></div>
        <div className='shadow-custom'></div>
        <div className='shadow-custom'></div>
        <div className='shadow-custom'></div>
      </div>
    </div>
  );
}
