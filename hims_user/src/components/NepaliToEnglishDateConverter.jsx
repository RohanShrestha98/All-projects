/* eslint-disable react/prop-types */
import InputField from './InputField';
import NepaliDate from "nepali-date-converter";
import ConvertDateFormat from "../utils/ConvertDateFormat"
import NepaliDatePicker from "react-nepali-date-picker-lite";
import { useEffect, useState } from 'react';
export default function NepaliToEnglishDateConverter({label,setValue,register,watch,registerName,max,min}) {

  const [npDate, setNpDate] = useState()

  useEffect(() => {
    if (watch(registerName)) {
      let date = new NepaliDate(new Date(watch(registerName))).format(
        "YYYY-MM-DD"
      );
      setNpDate(ConvertDateFormat(date));
    }
  }, [watch(registerName)]);

  return (
    <div className='grid grid-cols-2 sm:grid-cols-1 gap-2 my-2 '>
      <div className="flex flex-col w-full">
              <label
                htmlFor=""
                className={"text-sm mb-1 text-gray-600  font-semibold"}
              >
                {label} (NP)
                {<span className="text-red-600 font-bold">*</span>}
              </label>
              <div
                className={`w-full border flex items-center justify-between relative border-gray-dark3 h-10 rounded-lg`}
              >
                <NepaliDatePicker
                  className="w-full outline-none"
                  value={npDate}
                  onSelect={(e) => {
                    let nepDateChange = new NepaliDate(e).toJsDate();
                    setValue(registerName, ConvertDateFormat(nepDateChange));
                  }}
                  renderInput={(props) => (
                    <input
                      className="outline-none h-9 w-full text-sm bg-transparent px-3"
                      type="text"
                      placeholder="Select Nepali Date"
                      {...props}
                    />
                  )}
                />
              </div>
            </div>
            <div>
              <InputField
                register={register}
                iconName="user"
                label={label}
                registerName={registerName}
                max={max}
                min={min}
                type="date"
                defaultValue={watch(registerName)}
              />
            </div>
    </div>
  )
}
