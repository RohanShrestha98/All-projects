import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Drawer, Select } from "antd";

import { useMutate } from "../../../hooks/useMutateData";
import { useQueryData } from "../../../hooks/useQueryData";

import toast from "../../../utils/toast";
import { Button } from "../../../components/UI/button";

const AddCourse = ({ open, setOpen, sectionId }) => {
  const onClose = () => {
    reset();
    setOpen(false);
  };

  const useAddSecionMutation = () =>
    useMutate(["course"], "api/v1/section/assign-course/");

  const { mutateAsync, isLoading } = useAddSecionMutation();

  const handleAddCourse = async data => {
    try {
      const response = await mutateAsync(["post", sectionId, data]);
      if (response.success) {
        setOpen(false);
        toast.success("Courses added successfully!");
        reset();
      }
    } catch (err) {
      toast.error(err.response.data.errors.course);
    }
  };

  const { data } = useQueryData(
    ["courses"],
    "api/v1/course/list/",
    [],
    open ? true : false,
  );
  const [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    setCourseOptions(
      data?.data.map(each => {
        return {
          label: each.name,
          value: each.id,
        };
      }),
    );
  }, [data]);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Drawer
      title="Add Course"
      placement="right"
      onClose={onClose}
      open={open}
      setOpen={setOpen}
    >
      <form onSubmit={handleSubmit(data => handleAddCourse(data))}>
        <div className="space-y-6 flex flex-col">
          <div className="space-y-2">
            <Controller
              name="courses"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  size="large"
                  defaultValue={field.defaultValue}
                  showSearch
                  mode="multiple"
                  placeholder="Select courses"
                  className="w-full"
                  allowClear
                  options={courseOptions}
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

            {errors?.courses?.type === "required" && (
              <p className="text-red text-end">This field is required</p>
            )}
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

          <Button
            type="primary"
            className="bg-blue text-white hover:!text-white w-1/2 hover:border-none"
            htmlType="submit"
          >
            {isLoading ? "Adding..." : "Add Courses"}
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default AddCourse;
