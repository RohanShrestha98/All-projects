import React, { useEffect } from "react";
import { Input } from "antd";
import { ShimmerThumbnail, ShimmerButton } from "react-shimmer-effects";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";
import useWindowsDimensions from "../../../components/customHooks/windowsDimesnions";
import useChangeLayout from "../../../components/customHooks/changeLayout";
import { Controller, useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";

const Family = ({
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
  } = useForm({
    defaultValues: data,
    mode: "onSubmit",
  });

  const saveData = data => {
    setData({ ...data });
    isPreviousClick ? prevStep() : nextStep();
  };

  return (
    <div className="w-full mt-10">
      <form onSubmit={handleSubmit(saveData)} className="flex flex-col gap-4">
        {/* <h3 className="flex justify-center text-lg underline underline-offset-2">
          Family Information
        </h3> */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Father&apos;s Name <span className="text-red">*</span>
                </label>
                <Controller
                  name="family.fathersName"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter father's name"
                      onChange={e => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.family?.fathersName?.type === "required" && (
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
                  Father&apos;s Phone <span className="text-red">*</span>
                </label>
                <Controller
                  name="family.fathersPhone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      placeholder="Enter phone number"
                      defaultCountry="es"
                      onChange={phone => {
                        field.onChange(phone);
                        field.value = phone;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.family?.fathersPhone?.type === "required" && (
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
                  Mother&apos;s Name <span className="text-red">*</span>
                </label>
                <Controller
                  name="family.mothersName"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter mother's name"
                      onChange={e => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.family?.mothersName?.type === "required" && (
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
                  Mother&apos;s Phone <span className="text-red">*</span>
                </label>
                <Controller
                  name="family.mothersPhone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      placeholder="Enter mother's phone"
                      defaultCountry="es"
                      onChange={phone => {
                        field.onChange(phone);
                        field.value = phone;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.family?.mothersPhone?.type === "required" && (
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
                  Home Address <span className="text-red">*</span>
                </label>
                <Controller
                  name="family.homeAddress"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter home address"
                      onChange={e => {
                        field.onChange(e.target.value);
                        field.value = e.target.value;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.family?.homeAddress?.type === "required" && (
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
                  Additional Phone
                </label>
                <Controller
                  name="family.additionalPhone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      placeholder="Enter additional phone"
                      defaultCountry="es"
                      onChange={phone => {
                        field.onChange(phone);
                        field.value = phone;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {/* {errors?.family?.additionalPhone?.type === "required" && (
                  <p className="text-sm text-red">Required</p>
                )} */}
              </>
            )}
          </div>
          <div className="flex flex-col">
            {isLoading ? (
              <ShimmerThumbnail line={1} height={40} />
            ) : (
              <>
                <label className="mb-2 ml-1 font-semibold text-[16px] text-gray-2">
                  Personal Incharge <span className="text-red">*</span>
                </label>
                <Controller
                  name="family.personInCharge"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter personal incharge name"
                      onChange={e => {
                        const trimmedValue = e.target.value.trimStart();
                        field.onChange(trimmedValue);
                        field.value = trimmedValue;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.family?.personInCharge?.type === "required" && (
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
                  Manager <span className="text-red">*</span>
                </label>
                <Controller
                  name="family.manager"
                  control={control}
                  rules={{
                    required: !isPreviousClick,
                  }}
                  render={({ field }) => (
                    <Input
                      placeholder="Enter manager name"
                      onChange={e => {
                        const trimmedValue = e.target.value.trimStart();
                        field.onChange(trimmedValue);
                        field.value = trimmedValue;
                      }}
                      value={field.value}
                    />
                  )}
                />
                {errors?.family?.manager?.type === "required" && (
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

export default Family;
