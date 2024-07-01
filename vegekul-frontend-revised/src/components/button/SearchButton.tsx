import React from 'react';

export default function SearchButton({
  register,
  registerValue,
  handleSubmit,
  watchDateFields,
  handleResetDate,
  defaultValue,
  placeholder,
}: any) {
  return (
    <div className=" px-3 py-2 basis-1/4 flex flex-row  rounded-4 font-normal text-sm border  bg-white text-inputColor">
      <input
        placeholder={placeholder}
        className="w-full outline-none"
        defaultValue={defaultValue}
        onFocus={e => {
          e.currentTarget.type = 'date';
          e.target.showPicker();
        }}
        {...register(registerValue)}
      />
      {watchDateFields && (
        <button className="ml-2" onClick={handleSubmit(handleResetDate)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 384 512"
          >
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </button>
      )}
    </div>
  );
}
