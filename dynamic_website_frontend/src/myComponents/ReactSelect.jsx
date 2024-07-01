/* eslint-disable react/prop-types */
import { Controller } from "react-hook-form";
import Select from "react-select";

export default function ReactSelect({
  width,
  options,
  title,
  control,
  registerName,
}) {
  return (
    <div className={`${width} h-10`}>
      <label htmlFor="">{title}</label>
      <Controller
        name={registerName}
        control={control}
        defaultValue={null}
        render={({ field }) => (
          <Select {...field} options={options} isClearable={true} />
        )}
      />
    </div>
  );
}
