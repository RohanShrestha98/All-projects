import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DatePicker } from "antd";
import { Drawer, Select } from "antd";

import { useMutate } from "../../hooks/useMutateData";
import { useQueryData } from "../../hooks/useQueryData";

import toast from "../../utils/toast";
import { Button } from "../../components/UI/button";
import dayjs from "dayjs";

const AddCycle = ({ open, setOpen, edit, editData }) => {
  const {
    handleSubmit,
    reset,
    register,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const onClose = () => {
    reset();
    setOpen(false);
  };

  const [error, setError] = useState();

  const [selectedOpenDate, setSelectedOpenDate] = useState(
    edit ? dayjs(editData?.start).utc() : "",
  );
  const [selectedDueDate, setSelectedDueDate] = useState(
    edit ? dayjs(editData?.end).utc() : "",
  );

  const [selectedGrade, setSelectedGrade] = useState(
    editData?.grades?.map(grade => grade?.id) || [],
  );

  useEffect(() => {
    setValue("grade", selectedGrade);
  }, [selectedGrade, selectedGrade?.length]);

  const [isSubmit, setIsSubmit] = useState(false);

  const formData = watch();

  const useCycleMutation = () => useMutate(["cycle"], "api/v1/cycle/create");
  const useCycleUpdateMutation = () =>
    useMutate(["cycle"], `api/v1/cycle/update/${editData?.id}`);

  const { mutateAsync } = useCycleMutation();
  const { mutateAsync: mutateUpdateAsync } = useCycleUpdateMutation();

  const handleCreateCycle = async () => {
    const postData = {
      grade: selectedGrade,
      title: formData?.title,
      end: formData?.end,
      start: formData?.start,
    };
    try {
      const response = await mutateAsync(["post", "", postData]);
      if (response.success) {
        setOpen(false);
        toast.success("Cycle added successfully!");
        reset();
      }
    } catch (err) {
      setError(err.response.data.errors);
      // toast.error(err.response.data.errors.cycle);
    }
  };
  const handleUpdateCycle = async data => {
    const postData = {
      ...data,
      title: data?.title ?? editData?.title,
      end: data?.end ?? editData?.end,
      start: data?.start ?? editData?.start,
      grade: selectedGrade,
    };

    try {
      const response = await mutateUpdateAsync(["patch", "", postData]);
      if (response.success) {
        setOpen(false);
        toast.success("Cycle updated successfully!");
        reset();
      }
    } catch (err) {
      toast.error(err.response.data.errors.cycle);
    }
  };

  const { data } = useQueryData(
    ["grade"],
    "api/v1/grade/list/",
    [],
    open ? true : false,
  );
  const [gradeOptions, setGradeOptions] = useState([]);

  useEffect(() => {
    setGradeOptions(
      data?.data.map(each => {
        return {
          label: each.name,
          value: each.id,
        };
      }),
    );
  }, [data]);

  const onChangeDate = (name, date) => {
    name === "start"
      ? setSelectedOpenDate(date)
      : name === "end"
      ? setSelectedDueDate(date)
      : null;
    setValue(name, dayjs(date?.$d).utc().format());
  };

  const handleClear = () => {
    reset({
      grade: [],
      title: "",
      start: "",
      end: "",
    });
    setSelectedOpenDate("");
    setSelectedDueDate("");
  };

  const handleReset = () => {
    reset({
      grade: editData?.grades?.map(grade => grade?.id),
      title: editData?.title,
      start: dayjs(editData?.start).utc(),
      end: dayjs(editData?.end).utc(),
    });
    setSelectedOpenDate(dayjs(editData?.start).utc());
    setSelectedDueDate(dayjs(editData?.end).utc());
    setSelectedGrade(editData?.grades?.map(grade => grade?.id));
  };

  return (
    <Drawer
      title={edit ? "Edit Cycle" : "Add Cycle"}
      placement="right"
      onClose={onClose}
      open={open}
      setOpen={setOpen}
    >
      <form
        onSubmit={handleSubmit(data => {
          edit ? handleUpdateCycle(data) : handleCreateCycle(data);
        })}
      >
        <div className="space-y-6 flex flex-col">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-gray-dark1 font-medium">
                Title <span className="text-red-2">*</span>
              </label>
              <input
                type="text"
                {...register("title", { required: true })}
                defaultValue={edit ? editData?.title : ""}
                className="w-full h-10 border border-gray-6 rounded-md outline-none px-3 "
                placeholder="Enter Title"
              />
              {errors?.title?.type && (
                <p className="text-sm text-red ">Title is required</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-gray-dark1 font-medium">
                Grade <span className="text-red-2">*</span>
              </label>
              <Select
                size="large"
                {...register("grade", { required: true })}
                showSearch
                mode="multiple"
                placeholder="Select grades"
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
                value={selectedGrade}
                onChange={data => {
                  setSelectedGrade(data);
                }}
              />
              {errors?.grade?.type === "required" && (
                <p className="text-sm text-red ">{"Grade is required"}</p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-gray-dark1 font-medium">
                Start Date <span className="text-red-2">*</span>
              </label>
              <DatePicker
                showTime
                allowClear
                defaultValue={edit ? editData?.start : ""}
                disabledDate={d => !d || d?.isBefore(new Date())}
                value={selectedOpenDate}
                onChange={e => onChangeDate("start", e)}
                className="w-full h-10 border border-gray-6  rounded-md outline-none px-3 mb-2"
                placeholder="Start date"
              />
              {(error?.start || (isSubmit && !selectedOpenDate)) && (
                <p className="text-sm text-red ">
                  {errors?.start ?? "Start Date is required"}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label className="text-gray-dark1 font-medium">
                End Date <span className="text-red-2">*</span>
              </label>
              <DatePicker
                showTime
                allowClear
                defaultValue={edit ? editData?.end : ""}
                value={selectedDueDate}
                disabledDate={d => !d || d?.isBefore(selectedOpenDate)}
                required
                onChange={e => onChangeDate("end", e)}
                className="w-full h-10 border border-gray-6 rounded-md outline-none px-3 mb-2"
                placeholder="End Date"
              />
              {(error?.end || (isSubmit && selectedDueDate === "")) && (
                <p className="text-sm text-red ">
                  {errors?.end ?? "End Date is required"}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-20">
          <Button
            type="outlined"
            className="w-1/2 flex items-center justify-center"
            onClick={e => {
              e.preventDefault();
              edit ? handleReset() : handleClear();
            }}
          >
            {edit ? "Reset" : "Clear"}
          </Button>

          <Button
            onClick={() => setIsSubmit(true)}
            type="primary"
            className=" w-1/2"
            htmlType="submit"
          >
            {edit ? "Edit Cycle" : "Add Cycle"}
          </Button>
        </div>
      </form>
    </Drawer>
  );
};

export default AddCycle;
