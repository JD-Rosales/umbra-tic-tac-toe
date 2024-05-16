import { cn } from '../lib/utils';

export default function Modal({
  className,
  isOpen,
  onBackdropClick,
  children,
}: {
  className?: string;
  isOpen: boolean;
  onBackdropClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      onClick={() => onBackdropClick()}
      className={`fixed inset-0 flex justify-center items-center transition-all ${
        isOpen ? 'visible bg-black/10 backdrop-blur-sm' : 'invisible'
      }`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={cn(
          ' bg-white rounded-lg shadow p-6 transition-all duration-300',
          isOpen ? 'scale-100 opacity-100' : 'scale-125 opacity-0',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
