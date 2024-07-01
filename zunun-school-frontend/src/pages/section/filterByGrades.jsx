import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Drawer, Select } from "antd";
import { useQueryData } from "../../hooks/useQueryData";
import { Button } from "../../components/UI/button";

const FilterByGrades = ({
  open,
  setOpen,
  setGradeId,
  title,
  setIsFiltered,
}) => {
  const onClose = () => {
    reset();
    setOpen(false);
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const { data } = useQueryData(["grade"], "api/v1/grade/list/", "", !!open);
  const [gradeOptions, setGradeOptions] = useState([]);
  const handleSearch = item => {
    setGradeId(item?.grade);
    setIsFiltered(true);
  };

  useEffect(() => {
    setGradeOptions(
      data?.data?.map(each => {
        return {
          label: each.name,
          value: each.id,
        };
      }),
    );
  }, [data]);

  return (
    <Drawer
      title={title}
      placement="right"
      onClose={onClose}
      open={open}
      setOpen={setOpen}
    >
      <form onSubmit={handleSubmit(handleSearch)}>
        <div className="space-y-6 flex flex-col">
          <div className="space-y-2">
            {/* <p className="text-blue">Grade *</p> */}
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
          </div>
        </div>

        <div className="flex gap-2 mt-20">
          <Button
            type="outlined"
            className="w-1/2 flex items-center justify-center"
            onClick={() =>
              reset({
                grade: null,
              })
            }
          >
            Clear
          </Button>

          <Button type="primary" className=" w-1/2 " htmlType="submit">
            Search
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default FilterByGrades;
