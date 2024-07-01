import React, { useEffect, useMemo } from "react";
import { Input, Select } from "antd";
import { ShimmerThumbnail, ShimmerButton } from "react-shimmer-effects";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import useWindowsDimensions from "../../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../../components/customHooks/changeLayout";
import { Controller, useForm } from "react-hook-form";
import { FlagEmoji, defaultCountries } from "react-international-phone";

const Address = ({
  prevStep,
  nextStep,
  isLoading,
  data,
  setData,
  isPreviousClick,
  setIsPreviousClick,
}) => {
  const width = useWindowsDimensions();
  const { changeLayout } = useChangeLayout();

  useEffect(() => {
    changeLayout(width, false, false, "white");
  }, [width]);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: data,
    mode: "onSubmit",
  });

  const countryOptions = useMemo(() => {
    return defaultCountries.map(item => {
      return {
        label: (
          <div className="flex justify-between items-center w-full">
            <span className="text-sm text-[#000000]">{item[0]}</span>
            <FlagEmoji iso2={item[2]} className="inline-block h-6 w-6" />
          </div>
        ),
        value: item[2],
      };
    });
  }, []);

  const saveData = data => {
    setData({ ...data });
    isPreviousClick ? prevStep() : nextStep();
  };

  return (
    <div className="w-full mt-10">
      <form onSubmit={handleSubmit(saveData)} className="flex flex-col gap-4">
        <h3 className="hidden sm:flex sm:justify-center sm:text-lg sm:underline sm:underline-offset-2">
          Address Information
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Address 1 <span className="text-red">*</span>
                </label>
                <Controller
                  name="address.address1"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter address 1"
                      onChange={e => {
                        const trimmedValue = e.target.value.trimStart();
                        field.onChange(trimmedValue);
                        field.value = trimmedValue;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.address?.address1?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Address 2
                </label>
                <Controller
                  name="address.address2"
                  control={control}
                  render={({ field }) => (
                    <Input
                      disabled={!watch("address.address1")}
                      placeholder="Enter address 2"
                      onChange={e => {
                        const trimmedValue = e.target.value.trimStart();
                        field.onChange(trimmedValue);
                        field.value = trimmedValue;
                      }}
                      value={field.value}
                    />
                  )}
                />
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Village
                </label>
                <Controller
                  name="address.village"
                  control={control}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter village name"
                      onChange={e => {
                        const trimmedValue = e.target.value.trimStart();
                        field.onChange(trimmedValue);
                        field.value = trimmedValue;
                      }}
                      value={field.value}
                    />
                  )}
                />
              </>
            )}
          </div>

          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Municipality <span className="text-red">*</span>
                </label>
                <Controller
                  name="address.municipality"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter municipality name"
                      onChange={e => {
                        const trimmedValue = e.target.value.trimStart();
                        field.onChange(trimmedValue);
                        field.value = trimmedValue;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.address?.municipality?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Department <span className="text-red">*</span>
                </label>
                <Controller
                  name="address.department"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter department"
                      onChange={e => {
                        const trimmedValue = e.target.value.trimStart();
                        field.onChange(trimmedValue);
                        field.value = trimmedValue;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.address?.department?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Country <span className="text-red">*</span>
                </label>
                <Controller
                  name="address.country"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  defaultValue={"es"}
                  render={({ field }) => (
                    <Select
                      onChange={country => {
                        field.onChange(country);
                        field.value = country;
                      }}
                      showSearch
                      value={field.value}
                      options={countryOptions}
                      placeholder="Select country name"
                    />
                  )}
                />
                {errors?.address?.country?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )}
              </>
            )}
          </div>
        </div>
        <div className="grid grid-cols-8">
          {isLoading ? (
            <div className="flex col-start-1 col-span-2 justify-center items-center  rounded-ful">
              <ShimmerButton size="md" />
            </div>
          ) : (
            <button
              onClick={() => {
                setIsPreviousClick(true);
              }}
              type="back"
              className="flex col-start-1 col-span-2 justify-center items-center gap-2 py-2 text-white rounded-full bg-blue-light "
            >
              <ImArrowLeft2 /> Prev
            </button>
          )}
          {isLoading ? (
            <div className="flex col-end-9 col-span-2 justify-center items-centertext-white rounded-full">
              <ShimmerButton size="md" />
            </div>
          ) : (
            <button
              onClick={() => {
                setIsPreviousClick(false);
              }}
              type="submit"
              className="flex col-end-9 col-span-2 justify-center items-center gap-2 py-2 text-white rounded-full bg-blue-light "
            >
              Next <ImArrowRight2 />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Address;
