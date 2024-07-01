import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Drawer, Select } from "antd";

import { useMutate } from "../../hooks/useMutateData";
import { useQueryData } from "../../hooks/useQueryData";

import toast from "../../utils/toast";
import { Button } from "../../components/UI/button";

const AddGrading = ({ open, setOpen, studentId }) => {
  const {
    handleSubmit,
    reset,
    register,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const [error,setError] = useState()

  const onClose = () => {
    reset();
    setOpen(false);
  };

  const watchCourseId = watch("courseId");

  const useUpdateGradingMutation = () =>
    useMutate(["grading"], "api/v1/grading-report/update/");

  const { mutateAsync, isLoading } = useUpdateGradingMutation();

  const handleAssignCourse = async data => {
    const postData = {
      courseId: data.courseId,
      unitId: data.unitId,
      gradingCriteriaId: data.gradingCriteriaId,
      point: parseInt(data.point),
    };
    try {
      const response = await mutateAsync(["patch", studentId, postData]);
      if (response.success) {
        setOpen(false);
        toast.success("Update Grading successfully!");
        reset();
      }
    } catch (err) {
      toast.error(err.response.data.errors.grade);
      setError(err.response.data.errors)
    }
  };
  const [courseOptions, setCourseOptions] = useState([]);
  const [gradingCriteriaOptions, setGradingCriteriaOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);

  const { data, isError } = useQueryData(
    ["course"],
    "api/v1/course/list/",
    [],
    open ? true : false,
  );
  const { data: gradingCriteriaData, isFetching } = useQueryData(
    ["grading"],
    "api/v1/grading-criteria/list/",
    [],
    open ? true : false,
  );

  const { data: unitData } = useQueryData(
    ["unit-by-course", watchCourseId],
    `api/v1/course/units/${watchCourseId}`,
    [],
    watchCourseId && open ? true : false,
  );

  useEffect(() => {
    setCourseOptions(
      data?.data?.map(each => {
        return {
          label: each.name,
          value: each.id,
        };
      }),
    );
  }, [data]);

  useEffect(() => {
    setGradingCriteriaOptions(
      gradingCriteriaData?.data?.map(each => {
        return {
          label: each.title,
          value: each.id,
        };
      }),
    );
  }, [gradingCriteriaData]);

  useEffect(() => {
    setUnitOptions(
      unitData?.data?.map(each => {
        return {
          label: each.name,
          value: each.id,
        };
      }),
    );
  }, [unitData]);

  return (
    <Drawer
      title="Update Grading Points"
      placement="right"
      onClose={onClose}
      open={open}
      setOpen={setOpen}
    >
      <form
        onSubmit={handleSubmit(data => handleAssignCourse(data))}
        className="flex flex-col gap-2"
      >
        <div className="space-y-1 flex flex-col">
          <label className="text-cyan">Select Course</label>
          <div className="">
            <Controller
              name="courseId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  size="large"
                  defaultValue={field.defaultValue}
                  showSearch
                  placeholder="Select course"
                  className="w-full"
                  allowClear
                  required
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
            {error?.courses && (
              <p className="text-red text-end">{error?.courses}</p>
            )}
          </div>
        </div>
        <div className="space-y-1 flex flex-col">
          <label className="text-cyan">Select Unit</label>
          <div className="">
            <Controller
              name="unitId"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  size="large"
                  defaultValue={field.defaultValue}
                  showSearch
                  placeholder="Select unit"
                  className="w-full"
                  allowClear
                  required
                  options={unitOptions}
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
            {errors?.unit?.type === "required" && (
              <p className="text-red text-end">This field is required</p>
            )}
            {error?.unit && (
              <p className="text-red text-end">{error?.unit}</p>
            )}
          </div>
        </div>
        <div className="space-y-1 flex flex-col">
          <label className="text-cyan">Select grading criteria</label>
          <div className="">
            <Controller
              name="gradingCriteriaId"
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    {...field}
                    size="large"
                    defaultValue={field.defaultValue}
                    showSearch
                    placeholder="Select grading criteria"
                    className="w-full"
                    allowClear
                    required
                    options={gradingCriteriaOptions?.filter(
                      item => item?.value !== 2 && item?.value !== 1,
                    )}
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
                );
              }}
            />
            {errors?.gradingCriteriaId?.type === "required" && (
              <p className="text-red text-end">This field is required</p>
            )}
             {error?.gradingCriteriaId && (
              <p className="text-red text-end">{error?.gradingCriteriaId}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-cyan">Grade Point</label>
          <input
            {...register("point")}
            className="border border-gray-8 px-3 py-2  rounded-lg"
          />
            {error?.point && (
              <p className="text-red text-end">{error?.point}</p>
            )}
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
            {isLoading ? "Updating..." : "Update Points"}
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default AddGrading;
