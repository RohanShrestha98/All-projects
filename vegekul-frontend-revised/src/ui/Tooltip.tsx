import * as TooltipRadix from '@radix-ui/react-tooltip';

interface Props {
  children: React.ReactNode;
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  sideOffset?: number;
  delayDuration?: number;
  asChild?: boolean;
  triggerClassName?: string;
  type?: 'primary' | 'error';
}

const Tooltip = ({
  children,
  content,
  side = 'top',
  sideOffset = 4,
  delayDuration = 500,
  asChild = false,
  triggerClassName = '',
  type = 'primary',
}: Props) => (
  <TooltipRadix.Provider delayDuration={delayDuration}>
    <TooltipRadix.Root>
      <TooltipRadix.Trigger asChild={asChild} className={triggerClassName}>
        {children}
      </TooltipRadix.Trigger>
      <TooltipRadix.Portal>
        <TooltipRadix.Content
          className={`z-[100] select-none rounded px-3 py-1 text-sm shadow ${type === 'primary'
              ? 'bg-primary text-whiteText'
              : type === 'error'
                ? 'bg-rose-200 text-dangerDark'
                : ''
            }`}
          sideOffset={sideOffset}
          side={side}
        >
          {content}
          <TooltipRadix.Arrow
            className={
              type === 'primary'
                ? 'fill-primary'
                : type === 'error'
                  ? 'fill-rose-200'
                  : ''
            }
          />
        </TooltipRadix.Content>
      </TooltipRadix.Portal>
    </TooltipRadix.Root>
  </TooltipRadix.Provider>
);

export default Tooltip;
