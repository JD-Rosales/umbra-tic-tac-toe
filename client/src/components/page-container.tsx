import { cn } from '../lib/utils';

export default function PageContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn('min-h-screen w-full bg-[#111B22] text-white', className)}
    >
      {children}
    </div>
  );
}
