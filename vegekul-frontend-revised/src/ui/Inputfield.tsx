import React from 'react';
import MultiSelect from './MultiSelect';
import { UseFormSetValue } from 'react-hook-form/dist/types';

interface Props {
  label?: string;
  name: string;
  placeholder?: string;
  type?: string;
  defaultValue?:
    | string
    | string[]
    | {
        value: string;
        label: string;
      };
  register?: any;
  disabled?: boolean;
  required?: boolean;
  options?: object[] | null;
  setValue?: UseFormSetValue<any>;
  extraClass?: string;
  errorMessage?: string;
}
type refType = HTMLInputElement | null;
const InputField = React.forwardRef<refType, Props>(
  (
    {
      label,
      name,
      placeholder,
      type = 'text',
      defaultValue = '',
      register,
      disabled,
      required = false,
      options,
      setValue,
      errorMessage,
      ...rest
    },
    ref
  ) => {
    const inputClasses =
      'peer rounded border border-grayBorderDark py-2 px-3 text-[14.5px] w-full  placeholder:text-grayText hover:border-grayText focus:border-primary focus:outline-none';
    return (
      <div className="flex flex-grow flex-col-reverse gap-2">
        <p className="text-red-600 text-[13px]">{errorMessage}</p>
        {type === 'textarea' ? (
          <textarea
            id={name}
            className={`${inputClasses} min-h-[64px] flex-grow `}
            placeholder={placeholder}
            defaultValue={defaultValue}
            required={required}
            {...register(name)}
            {...rest}
          />
        ) : type === 'select' ? (
          <MultiSelect
            placeholder={placeholder}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            options={options!}
            triggerMinWidth={130}
            position="popper"
            triggerClassName="h-10 hover:border-grayText"
            defaultValue={defaultValue}
            setValue={setValue!}
            name={name}
            required={required}
            isMulti={false}
            {...register(name)}
            {...rest}
          />
        ) : type === 'multi-select' ? (
          <MultiSelect
            options={options || []}
            placeholder={placeholder}
            name={name}
            defaultValue={defaultValue}
            setValue={setValue!}
            {...rest}
          />
        ) : (
          <input
            type={type}
            id={name}
            className={inputClasses}
            placeholder={placeholder}
            defaultValue={defaultValue}
            ref={ref}
            {...register(name)}
            {...rest}
            disabled={disabled}
            required={required}
          />
        )}
        <label
          htmlFor={name}
          className="font-medium text-grayTextDark peer-hover:text-blackText peer-focus:text-primary"
        >
          {label}
        </label>
      </div>
    );
  }
);

export default InputField;
