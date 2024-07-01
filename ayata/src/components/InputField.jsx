/* eslint-disable react/prop-types */
export default function InputField({ placeholder, label, required, type }) {
  return (
    <div className="flex flex-col gap-[6px]">
        <label className="text-sm text-[#667085] leading-5 flex">
          {label}
          {required &&
            <span className="text-red-600">*</span>
          }
        </label>
        <input
          type="text"
          className="h-11 px-4 border outline-none rounded-lg w-full"
          placeholder={placeholder}
        />
    </div>
  );
}
