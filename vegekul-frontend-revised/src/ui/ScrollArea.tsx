import * as ScrollAreaRadix from '@radix-ui/react-scroll-area';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function ScrollArea({ children, className }: Props) {
  return (
    <ScrollAreaRadix.Root className={`${className}`}>
      <ScrollAreaRadix.Viewport className="h-full w-full scrollbar shadow-none scroll-m-0">
        {children}
      </ScrollAreaRadix.Viewport>
      <ScrollAreaRadix.Corner />
    </ScrollAreaRadix.Root>
  );
}
