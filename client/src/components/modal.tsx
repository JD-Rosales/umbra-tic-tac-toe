import { cn } from '../lib/utils';

export default function Modal({
  className,
  open,
  setIsOpen,
  children,
}: {
  className?: string;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={() => setIsOpen(false)}
      className={`fixed inset-0 flex justify-center items-center transition-colors ${
        open ? 'visible bg-black/20' : 'invisible'
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cn(
          ' bg-white rounded-xl shadow p-6 transition-all duration-300',
          open ? 'scale-100 opacity-100' : 'scale-125 opacity-0',
          className
        )}
      >
        <button
          onClick={() => setIsOpen(false)}
          className='absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600'
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
}
