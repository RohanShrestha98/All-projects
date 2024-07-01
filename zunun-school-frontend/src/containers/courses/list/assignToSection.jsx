import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import { Drawer, Select } from "antd";

import { useMutate } from "../../../hooks/useMutateData";
import { useQueryData } from "../../../hooks/useQueryData";

import toast from "../../../utils/toast";
import { Button } from "../../../components/UI/button";

const AssignToSection = ({ open, setOpen, checkboxes, setCheckboxes }) => {
  const onClose = () => {
    reset();
    setOpen(false);
  };

  const useAssignSecionMutation = () =>
    useMutate(["assign-course"], "api/v1/section/assign-course/");

  const { mutateAsync, isLoading } = useAssignSecionMutation();
  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm();
  const watchGrade = watch("grade");

  const handleAssignCourse = async data => {
    const postData = {
      section: data.section,
      courses: checkboxes,
    };
    try {
      const response = await mutateAsync(["post", "", postData]);
      if (response.success) {
        setOpen(false);
        toast.success("Assign Courses successfully!");
        setCheckboxes([]);
        reset();
      }
    } catch (err) {
      toast.error(err.response.data.errors.course);
    }
  };

  const { data } = useQueryData(
    ["section", watchGrade],
    !watchGrade ? "api/v1/section/list/" : `api/v1/section/grade/${watchGrade}`,
    [],
    open ? true : false,
  );
  const { data: gradeList } = useQueryData(["grade"], "api/v1/grade/list/", []);
  const [sectionOptions, setSectionOptions] = useState([]);
  const [gradeOptions, setGradeOptions] = useState([]);

  useEffect(() => {
    setSectionOptions(
      data?.data?.map(each => {
        return {
          label: each.name,
          value: each.id,
        };
      }),
    );
    setGradeOptions(
      gradeList?.data?.map(each => {
        return {
          label: each.name,
          value: each.id,
        };
      }),
    );
  }, [gradeList, data]);

  return (
    <Drawer
      title="Assign to Section"
      placement="right"
      onClose={onClose}
      open={open}
      setOpen={setOpen}
    >
      <form onSubmit={handleSubmit(data => handleAssignCourse(data))}>
        <div className="space-y-3 flex flex-col">
            <label className="text-gray-dark1 font-medium">
                Grade <span className="text-red-2">*</span>
            </label>
            <Controller
              name="grade"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  size="large"
                  defaultValue={field.defaultValue}
                  showSearch
                  placeholder="Select grade"
                  className="w-full"
                  allowClear
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
            {errors?.grade?.type === "required" && (
              <p className="text-red text-end">This field is required</p>
            )}

            <label className="text-gray-dark1 font-medium ">
                Section <span className="text-red-2">*</span>
            </label>
            <Controller
              name="section"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  size="large"
                  defaultValue={field.defaultValue}
                  showSearch
                  placeholder="Select section"
                  className="w-full"
                  allowClear
                  options={sectionOptions}
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
            {errors?.section?.type === "required" && (
              <p className="text-red text-end">This field is required</p>
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

          <Button type="primary" className=" w-1/2 " htmlType="submit">
            {isLoading ? "Assigning..." : "Assign Courses"}
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default AssignToSection;
