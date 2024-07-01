import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Drawer, Select } from "antd";

import { useMutate } from "../../hooks/useMutateData";
import { useQueryData } from "../../hooks/useQueryData";

import toast from "../../utils/toast";
import { Button } from "../../components/UI/button";

const AddSection = ({ open, setOpen, data: editData, edit }) => {
  const onClose = () => {
    setOpen(false);
    reset();
  };
  const [gradeOptions, setGradeOptions] = useState([]);
  const [defaultGradeOptions, setDefaultGradeOptions] = useState([]);
  const {
    handleSubmit,
    reset,
    register,
    control,
    formState: { errors },
  } = useForm();

  const [inputSection, setInputSection] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [sectionCharacterLimit] = useState(50);
  const [descCharacterLimit] = useState(200);

  const handleChangeSection = e => {
    setInputSection(e.target.value);
  };
  const handleChangeDesc = e => {
    setInputDescription(e.target.value);
  };

  const useAddSecionMutation = () =>
    useMutate(["section"], "api/v1/section/create/");

  const { mutateAsync, isLoading } = useAddSecionMutation();
  const [error, setError] = useState();

  const useUpdateSecionMutation = () =>
    useMutate(["section"], "api/v1/section/update/");

  const mutateUpdateAsync = useUpdateSecionMutation().mutateAsync;

  const { data } = useQueryData(
    ["grade"],
    "api/v1/grade/list/",
    [],
    open ? true : false,
  );

  useEffect(() => {
    setGradeOptions(
      data?.data?.map(each => {
        return {
          label: each.name,
          value: each.id,
        };
      }),
    );
    if (edit) {
      setDefaultGradeOptions(
        data?.data.filter(each => each.id === editData?.grade),
      );
    }
  }, [data, edit]);
  const handleAddSection = async data => {
    try {
      const response = await mutateAsync(["post", [], data]);
      if (response.success) {
        setOpen(false);
        toast.success("Section added successfully!");
        reset();
      }
    } catch (err) {
      setError(err?.response?.data?.errors);
      toast.error(err?.response?.data?.errors?.error);
    }
  };

  const handleEditSection = async data => {
    try {
      const postData = {
        name: data.name,
        description: data.description,
        grade: defaultGradeOptions?.[0]?.id,
      };
      const response = await mutateUpdateAsync([
        "patch",
        editData.id,
        postData,
      ]);
      if (response.success) {
        setOpen(false);
        toast.success("Section update successfully!");
        reset();
      }
    } catch (err) {
      toast.error(err?.response?.data?.errors?.error);
    }
  };

  return (
    <Drawer
      title={edit ? "Edit Section" : "Add Section"}
      placement="right"
      onClose={onClose}
      open={open}
      setOpen={setOpen}
    >
      <form
        onSubmit={handleSubmit(edit ? handleEditSection : handleAddSection)}
      >
        <div className="space-y-2 flex flex-col">
          <div className="space-y-2">
            <div>
              <label className="text-gray-dark1 font-medium">
                {" "}
                Grade <span className="text-red-2">*</span>
              </label>
              <Controller
                name="grade"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    size="large"
                    defaultValue={editData?.grade}
                    showSearch
                    disabled={edit}
                    placeholder="Select grade"
                    className="w-full"
                    allowClear
                    required
                    options={gradeOptions}
                    optionFilterProp="children"
                    filterOption={(input, option) => {
                      {
                        option.label = option.label.toLowerCase();
                        return (option?.label ?? "").includes(input);
                      }
                    }}
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? "")
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? "").toLowerCase())
                    }
                  />
                )}
              />
            </div>

            {errors?.grade?.type === "required" && (
              <p className="text-red text-end">This field is required</p>
            )}
            {error?.grade && (
              <p className="text-red text-end">This field is required</p>
            )}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-gray-dark1 font-medium">
                {" "}
                Section <span className="text-red-2">*</span>
              </label>
              <p
                className={`text-xs flex justify-end items-end ${
                  inputSection.length == sectionCharacterLimit
                    ? "text-red"
                    : "text-gray"
                }`}
              >
                {inputSection.length}/{sectionCharacterLimit}
              </p>
            </div>
            <input
              maxLength={50}
              type="text"
              className="focus:border-cyan hover:border-cyan w-full first-letter outline-none placeholder:text-[16px] placeholder-zinc-300 border-zinc-300 p-2 px-[10px] border rounded-md"
              placeholder="Section name"
              defaultValue={editData && editData.name}
              {...register("name", {
                required: true,
              })}
              onChange={handleChangeSection}
            />
            {errors?.name?.type === "required" && (
              <p className="text-red text-end">This field is required</p>
            )}
            {/* {errors?.name?.type === "maxLength" && (
              <p className="text-sm text-red ">{"Title should be max 50 characters"}</p>
            )} */}
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label className="text-gray-dark1 font-medium">
                {" "}
                Description <span className="text-red-2">*</span>
              </label>
              <p
                className={`text-xs flex justify-end items-end ${
                  inputDescription.length == descCharacterLimit
                    ? "text-red"
                    : "text-gray"
                }`}
              >
                {inputDescription.length}/{descCharacterLimit}
              </p>
            </div>
            <textarea
              maxLength={200}
              className="focus:border-cyan hover:border-cyan w-full p-2 px-[10px] border rounded-md placeholder:text-[16px] outline-none border-zinc-300 placeholder-zinc-300"
              placeholder="Description"
              defaultValue={edit && editData.description}
              rows={5}
              {...register("description", {
                required: true,
              })}
              onChange={handleChangeDesc}
            />
            {errors?.description?.type === "required" && (
              <p className="text-red text-end">This field is required</p>
            )}
            {/* {errors?.description?.type === "maxLength" && (
              <p className="text-sm text-red ">{"Title should be max 200 characters"}</p>
            )} */}
          </div>
        </div>

        <div className="flex gap-2 mt-20">
          <Button
            type="outlined"
            className="w-1/2 flex items-center justify-center"
            onClick={() =>
              reset({
                grade: null,
                name: "",
                description: "",
              })
            }
          >
            Clear
          </Button>

          <Button type="primary" className=" w-1/2" htmlType="submit">
            {edit
              ? isLoading
                ? "Updating..."
                : "Edit Section"
              : isLoading
              ? "Adding..."
              : "Add Section"}
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default AddSection;
