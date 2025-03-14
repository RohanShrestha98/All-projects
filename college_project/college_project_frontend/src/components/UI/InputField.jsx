/* eslint-disable react/prop-types */

export default function InputField({
  placeholder,
  registerName,
  label,
  defaultValue,
  classes,
  className,
  type,
  register,
}) {
  return (
    <div className={className}>
      <label>{label}</label>
      <input
        defaultValue={defaultValue}
        type={type}
        className={`w-full border  mt-1 px-3 py-1 rounded outline-none ${classes}`}
        placeholder={placeholder}
        {...register(registerName)}
      />
    </div>
  );
}
