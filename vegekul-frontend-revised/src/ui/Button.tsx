import { forwardRef } from 'react';
import { LoadingSpinnerSvg } from '../icons/Allsvgs';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  color?: 'primary' | 'secondary' | 'danger';
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      children,
      variant = 'primary',
      color = 'primary',
      className = '',
      isLoading = false,
      disabled = false,
      ...rest
    },
    ref
  ) => {
    let classes = '';

    if (variant === 'primary')
      classes =
        color === 'primary'
          ? 'bg-primary hover:opacity-50'
          : color === 'secondary'
            ? 'bg-secondaryLight hover:bg-secondary'
            : 'bg-danger hover:bg-dangerLight';
    else
      classes =
        color === 'primary'
          ? 'border-primary text-primary hover:bg-primary'
          : color === 'secondary'
            ? 'border-secondary text-secondary hover:bg-secondary'
            : 'border-danger text-danger hover:bg-danger';

    return (
      <button
        className={`rounded text-[15px] font-medium shadow transition-all duration-200 disabled:pointer-events-none disabled:select-none disabled:opacity-50 ${variant === 'primary'
            ? 'text-whiteText'
            : 'border hover:text-whiteText'
          } ${classes} ${className} ${isLoading ? 'flex items-center gap-x-3 self-end' : null
          }`}
        ref={ref}
        {...rest}
        disabled={isLoading || disabled}
      >
        {children}
        {isLoading && <LoadingSpinnerSvg className="h-6" />}
      </button>
    );
  }
);

export default Button;
