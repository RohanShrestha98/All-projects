import { forwardRef, useState } from 'react';
import { EyeClosedSvg, EyeOpenSvg } from '../icons/Allsvgs';

interface Props extends React.HTMLProps<HTMLInputElement> {
  Icon: ({ className }: { className: string }) => JSX.Element;
  errorMessage?: string;
}

const IconInput = forwardRef<HTMLInputElement, Props>(
  ({ Icon, placeholder, errorMessage, ...rest }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <article className="text-start">
        <div className="relative flex items-center">
          <input
            {...rest}
            type={
              rest.type === 'password'
                ? showPassword
                  ? 'text'
                  : 'password'
                : rest.type
            }
            className={`peer w-full rounded border border-grayBorderDark py-2.5 pl-12 text-sm placeholder:text-grayText hover:border-blackText focus:border-primary focus:outline-none md:text-[13px] xs:pl-10 xs:text-xs ${rest.type === 'password' ? 'pr-14 xs:pr-12' : 'pr-6 xs:pr-4'
              }`}
            name={rest.name}
            placeholder={placeholder}
            ref={ref}
          />
          <Icon className="absolute left-4 h-5 w-5 text-grayText peer-hover:text-blackText peer-focus:text-primary xs:left-3 xs:h-[18px] xs:w-[18px]" />
          {rest.type === 'password' && rest.value ? (
            <div
              className="absolute right-4 h-6 w-6 cursor-pointer text-grayText hover:text-primary peer-hover:text-blackText peer-focus:text-primary xs:h-5 xs:w-5"
              onClick={() => setShowPassword(prev => !prev)}
              title={showPassword ? 'Hide Password' : 'Show Password'}
            >
              {showPassword ? <EyeClosedSvg /> : <EyeOpenSvg />}
            </div>
          ) : null}
        </div>
        {errorMessage ? (
          <span className="ml-2 text-xs italic text-rose-700 md:text-[11px] xs:text-[10px]">
            {errorMessage}
          </span>
        ) : null}
      </article>
    );
  }
);

export default IconInput;
