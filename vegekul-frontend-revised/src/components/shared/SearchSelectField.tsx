import { useState } from 'react';
import SearchSelect, {
  OptionType,
  type SearchSelectProps,
} from './SearchSelect';

interface Props extends SearchSelectProps {
  label: string;
  required?: boolean;
  errorMessage?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  value?: OptionType | null;
}

export default function SearchSelectField({
  label,
  required = false,
  errorMessage,
  className,
  orientation = 'vertical',
  value,
  ...rest
}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      className={`relative flex ${className} ${orientation === 'horizontal'
          ? 'flex-row-reverse items-center justify-end gap-4'
          : 'flex-col-reverse gap-2'
        }`}
    >
      {errorMessage ? (
        <span
          className={`text-xs italic text-danger ${orientation === 'horizontal'
              ? 'absolute right-0.5 top-full mt-1.5'
              : 'ml-0.5'
            }`}
        >
          {errorMessage}
        </span>
      ) : null}
      <SearchSelect
        defaultValue={value!}
        className="peer w-full text-[14.5px]"
        setOpen={setIsMenuOpen}
        type="field"
        {...rest}
      />
      <label
        className={`flex gap-1 whitespace-nowrap font-medium ${rest.disabled
            ? 'text-grayText'
            : isMenuOpen
              ? 'text-primary'
              : 'text-grayTextDark peer-hover:text-blackText'
          }`}
      >
        <span>{label}</span>
        {required ? <span className="text-danger">*</span> : null}
      </label>
    </div>
  );
}
