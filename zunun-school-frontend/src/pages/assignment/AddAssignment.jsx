/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { DatePicker, Tooltip } from "antd";
import { Select } from "antd";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useMutate } from "../../hooks/useMutateData";
import toast from "../../utils/toast";
import {
  useCourseByGradeData,
  useCourseData,
  useGradeData,
  useSectionByGradeData,
  useSectionData,
  useStudentByGradeData,
  useStudentData,
  useUnitByCourseData,
  useUserByGrade,
} from "../../hooks/useQueryData";
import { convertToSelectOptions } from "../../utils/convertToSelectOptions";

const assignToTypeOptions = [
  {
    label: "Section",
    value: "section",
  },
  {
    label: "Student",
    value: "student",
  },
];

export default function AddAssignment() {
  const location = useLocation();
  const { data: stateData, edit } = location.state !== null && location.state;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm(
    edit && stateData
      ? {
          defaultValues: {
            id: stateData?.id,
            openDate: stateData?.openDate,
            title: stateData?.title,
            dueDate: stateData?.dueDate,
            description: stateData?.description,
            userIds: stateData?.userIds,
          },
        }
      : { defaultValues: {} },
  );

  const watchAssignType = watch("assignToType");
  const watchGrade = watch("grade");
  const watchCourse = watch("courseId");

  const { data: courseData } = watchGrade
    ? useCourseByGradeData({ gradeId: watchGrade })
    : useCourseData();
  const { data: unitByCourseData } = useUnitByCourseData({
    courseId: edit ? stateData?.course?.id : watchCourse,
  });
  const [selectedGrade, setSelectedGrade] = useState(
    stateData
      ? { value: stateData?.grade?.id, label: stateData?.grade?.name }
      : null,
  );
  const { data: gradeData } = useGradeData();
  const { data: userBygradeData } = useUserByGrade({ gradeId: selectedGrade });
  const { data: studentData } = watchGrade
    ? useStudentByGradeData({ gradeId: watchGrade })
    : useStudentData();
  const { data: sectionData } = useSectionData();
  const { data: sectionByGrade } = useSectionByGradeData({
    gradeId: watchGrade,
  });

  const courseOptions = convertToSelectOptions(courseData?.data);
  const unitOptions = convertToSelectOptions(unitByCourseData?.data);

  const [defaultVal, setDefaultVal] = useState([]);
  const [sectionGrade, setSectionGrade] = useState();
  const [error, setError] = useState();

  const [checkedSwitch, setCheckedSwitch] = useState(true);
  const [defaultAssignType, setDefaultAssignType] = useState([]);

  const [selectedOpenDate, setSelectedOpenDate] = useState(
    (location.state !== null && dayjs(stateData?.openDate).utc()) || null,
  );
  const [selectedDueDate, setSelectedDueDate] = useState(
    (location.state !== null && dayjs(stateData?.dueDate).utc()) || "",
  );
  const [selectedAssignToType, setSelectedAssignToType] = useState(
    edit
      ? assignToTypeOptions.find(
          item => item.value === stateData?.assignToType?.toLowerCase(),
        )
      : null,
  );

  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [titleCharacterLimit] = useState(100);
  const [descCharacterLimit] = useState(500);

  const handleChangeTitle = e => {
    setInputTitle(e.target.value);
  };
  const handleChangeDesc = e => {
    setInputDescription(e.target.value);
  };

  const [selectedCourse, setSelectedCourse] = useState(
    edit
      ? [{ value: stateData?.course?.id, label: stateData?.course?.name }]
      : null,
  );
  const [selectedUnit, setSelectedUnit] = useState(
    edit ? [{ value: stateData?.unit?.id, label: stateData?.unit?.name }] : [],
  );
  const [selectedSections, setSelectedSections] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const navigate = useNavigate();

  const useAssignmentMutation = () =>
    useMutate(["assignment-create"], "api/v1/assignment/create/");
  const { mutateAsync } = useAssignmentMutation();

  const useAssignmentUpdateMutation = () =>
    useMutate(["assignment-create"], "api/v1/assignment/update/");
  const { mutateAsync: mutateUpdateAsync } = useAssignmentUpdateMutation();
  const filteredStudent = [];
  userBygradeData?.data?.map(item => {
    return filteredStudent?.push({
      label: item?.student?.firstName,
      value: item?.student?.id,
    });
  });

  useEffect(() => {
    if (stateData?.students) {
      setDefaultVal(
        stateData?.students?.map(item => {
          return { label: item.name, value: item.id };
        }),
      );
    }
  }, [stateData?.students]);
  const onChangeDate = (name, date) => {
    name === "openDate"
      ? setSelectedOpenDate(date)
      : name === "dueDate"
      ? setSelectedDueDate(date)
      : null;
    setValue(name, dayjs(date.$d).utc().format());
  };

  const onChangeSelect = (name, value) => {
    name === "assignToType"
      ? setSelectedAssignToType(value)
      : name === "grade"
      ? (setSelectedGrade(value),
        setSelectedCourse(null),
        setSelectedUnit(null),
        setValue("courseId", null),
        setValue("unitId", null))
      : name === "courseId"
      ? (setSelectedCourse(value),
        setSelectedUnit(null),
        setValue("unitId", null))
      : name === "unitId"
      ? setSelectedUnit(value)
      : null;
    setValue(name, value);
    setValue("isPublic", checkedSwitch);
  };

  const onChangeMultiSelect = (name, value) => {
    name === "sectionIds"
      ? setSelectedSections(value)
      : name === "studentIds"
      ? setSelectedUsers(value)
      : [];
    setValue(name, value);
  };

  const gradeOptions = [];
  const gradeList = gradeData?.data;
  gradeList?.map(item => {
    gradeOptions.push({
      label: item.name,
      value: item.id,
    });
  });

  const userOptions = [];
  const userList = studentData?.data;
  userList?.map(item => {
    userOptions.push({
      label: item?.student?.firstName,
      value: item?.student?.id,
    });
  });

  useEffect(() => {
    const sectionOptions = [];
    if (!edit && watchGrade) {
      const sectionList = sectionByGrade?.data;
      sectionList?.map(item => {
        sectionOptions.push({
          label: item.name,
          value: item.id,
        });
      });
    } else {
      const sectionList = sectionData?.data;
      sectionList?.map(item => {
        sectionOptions.push({
          label: item.name,
          value: item.id,
        });
      });
    }
    setSectionGrade(sectionOptions);
  }, [sectionByGrade, watchGrade, edit]);

  const [isSubmit, setIsSubmit] = useState(false);
  const handleCreate = async data => {
    if (selectedOpenDate && selectedDueDate && selectedUnit && selectedCourse) {
      try {
        const response = await mutateAsync(["post", "", data]);
        if (response.success) {
          toast.success("Assignment Added Successfully!");
          reset();
          navigate("/assignment/list");
        }
      } catch (err) {
        setError(err?.response?.data?.errors);
        toast.error(Object.values(err?.response?.data?.errors));
      }
    }
  };

  const handleUpdate = async data => {
    const students = []
    stateData?.students?.map((item)=> students.push(item?.id) )
    const sections = []
    stateData?.sections?.map((item)=> sections.push(item?.id) )
    const postData = {
      courseid: stateData?.course?.id,
      unitid: stateData?.unit?.id,
      studentIds:students,
      sectionIds:sections,
      grade: stateData?.grade?.id,
      assignToType: stateData?.assignToType,
      ...data,
    };
    try {
      const response = await mutateUpdateAsync([
        "patch",
        `${data.id}/`,
        postData,
      ]);
      if (response.success) {
        toast.success("Assignment Updated Successfully!");
        reset();
        navigate("/assignment/list");
      }
    } catch (err) {
      toast.error(Object.values(err?.response?.data?.errors));
    }
  };

  useEffect(() => {
    if (edit) {
      setDefaultAssignType(
        userOptions?.filter(each => {
          return stateData?.students?.filter(item => item.id === each.value);
        }),
      );
    }
  }, []);

  const updateSectionOption = [];
  sectionData?.data?.map(item => {
    updateSectionOption.push({
      label: item.name,
      value: item.id,
    });
  });
  const defaultStudents = [];

  stateData?.students?.map(item => {
    return defaultStudents.push({ label: item.name, value: item.id });
  });
  const defaultSections = [];

  stateData?.sections?.map(item => {
    return defaultSections.push({ label: item.name, value: item.id });
  });

  useEffect(() => {
    setSelectedSections(defaultSections);
  }, [edit]);

  useEffect(() => {
    setSelectedUsers(defaultStudents);
  }, [edit]);

  const handleClear = () => {
    reset();
    setValue("openDate", null);
    setValue("dueDate", null);
    setValue("assignToType", null);
    setValue("grade", null);
    setValue("courseId", null);
    setValue("unitId", null);
    setValue("sectionIds", []);
    setValue("studentIds", []);
    setSelectedOpenDate(null);
    setSelectedDueDate(null);
    setSelectedAssignToType(null);
    setSelectedGrade(null);
    setSelectedCourse(null);
    setSelectedUnit(null);
    setSelectedSections([]);
    setSelectedUsers([]);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <button
          className=" flex items-center gap-1 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3 text-sm py-1"
          onClick={() => navigate(-1)}
        >
          <BiArrowBack size={16} />
        </button>
        <h2 className="text-2xl md:text-lg font-semibold  sm:font-medium sm:text-base">
          {edit ? "Update " : "Create "}
          Assignment
        </h2>
        <div className="flex items-center gap-2">
          {/* <p className="text-sm sm:text-xs">Set Public:</p>
          <Switch defaultChecked onChange={onChange} /> */}
        </div>
      </div>
      <form
        onSubmit={handleSubmit(edit ? handleUpdate : handleCreate)}
        className="flex justify-center mt-10"
      >
        <div className="w-3/4 md:w-full flex flex-col gap-4">
          <section className="w-ful space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-base text-gray-2">
                Title <span className="text-red-2">*</span>
              </label>
              <p
                className={`text-xs flex justify-end items-end ${
                  inputTitle?.length == titleCharacterLimit
                    ? "text-red"
                    : "text-gray"
                }`}
              >
                {inputTitle?.length}/{titleCharacterLimit}
              </p>
            </div>
            <input
              maxLength={100}
              type="text"
              {...register("title", { required: true })}
              onChange={handleChangeTitle}
              className="w-full outline-none h-10 rounded-md border pl-2 border-gray-dark3 hover:border-cyan"
              placeholder="Assignment title.."
            />
            {errors?.title?.type === "required" && (
              <p className="text-sm text-red mt-[-16px]">Title is required</p>
            )}
            {errors?.title?.type === "maxLength" && (
              <p className="text-sm text-red mt-[-16px]">
                Title should be max 50 characters
              </p>
            )}
          </section>
          <div className="flex flex-row sm:inline-block  w-full gap-4">
            <div className="w-1/2 sm:w-full">
              <div className="w-full space-y-2">
                <label className="font-semibold text-base text-gray-2">
                  Open Date <span className="text-red-2">*</span>
                </label>
                <DatePicker
                  showTime
                  required
                  disabledDate={d => !d || d?.isBefore(new Date())}
                  value={selectedOpenDate}
                  onChange={e => onChangeDate("openDate", e)}
                  placeholder="Open date"
                  className="w-full pl-2  sm:mb-4 border border-gray-dark3 h-10 hover:border-cyan"
                />
              </div>
              {(error?.opendate || (isSubmit && !selectedOpenDate)) && (
                <p className="text-sm text-red ">
                  {error?.opendate ?? "Open date is required"}
                </p>
              )}
            </div>
            <div className="w-1/2 sm:w-full">
              <div className="w-full space-y-2">
                <label className="font-semibold text-base text-gray-2">
                  Due Date <span className="text-red-2">*</span>
                </label>
                <DatePicker
                  showTime
                  required
                  disabledDate={
                    d => !d || d?.isBefore(selectedOpenDate)
                    // dayjs().add("month") <= d
                  }
                  value={selectedDueDate}
                  onChange={e => onChangeDate("dueDate", e)}
                  placeholder="Due date"
                  className="w-full pl-2 border border-gray-dark3 h-10 hover:border-cyan"
                />
                {(error?.duedate || (isSubmit && !selectedDueDate)) && (
                  <p className="text-sm text-red ">
                    {error?.duedate ?? "Due date is required"}
                  </p>
                )}
              </div>
            </div>
          </div>
          <section className="w-full space-y-2">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-base text-gray-2">
                Description
              </label>
              <p
                className={`text-xs flex justify-end items-end ${
                  inputDescription?.length == descCharacterLimit
                    ? "text-red"
                    : "text-gray"
                }`}
              >
                {inputDescription?.length}/{descCharacterLimit}
              </p>
            </div>
            <textarea
              maxLength={500}
              className="border w-full h-24 border-gray-dark3 outline-none px-4 py-1 rounded-md hover:border-cyan"
              placeholder="Description..."
              {...register("description")}
              onChange={handleChangeDesc}
              // cols="30"
              // rows="10"
            />
          </section>
          <div className="grid grid-cols-2 gap-4">
            <section className="w-full space-y-2">
              <label className="font-semibold text-base text-gray-2">
                Assign To Type <span className="text-red-2">*</span>
              </label>
              <div className="sm:w-full">
                <Select
                  className="w-full "
                  placeholder="Select assign to type"
                  onChange={e => onChangeSelect("assignToType", e)}
                  size="large"
                  allowClear={false}
                  showSearch
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  disabled={edit && stateData?.assignToType}
                  defaultValue={stateData?.assignToType}
                  options={assignToTypeOptions}
                  value={selectedAssignToType}
                />
              </div>
            </section>
            <section className="w-full space-y-2">
              <label className="font-semibold text-base text-gray-2">
                Grade <span className="text-red-2">*</span>
              </label>
              <Select
                className="w-full "
                placeholder="Select grade"
                onChange={e => {
                  onChangeSelect("grade", e);
                }}
                size="large"
                options={gradeOptions}
                allowClear
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                value={selectedGrade}
              />
            </section>
          </div>
          {selectedAssignToType && (
            <>
              {watchAssignType === "section" ||
              stateData?.assignToType === "SECTION" ? (
                <section className="w-full space-y-2">
                  <label className="font-semibold text-base text-gray-2">
                    Section <span className="text-red-2">*</span>
                  </label>
                  <Tooltip
                    placement="topRight"
                    title={selectedGrade ? undefined : "Select grade first"}
                    color="#1fb6ffff"
                    className="line-clamp-1"
                  >
                    <Select
                      mode="multiple"
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      required
                      disabled={!selectedGrade}
                      allowClear
                      placeholder="Select sections"
                      size="large"
                      defaultValue={defaultSections}
                      onChange={e => onChangeMultiSelect("sectionIds", e)}
                      options={edit ? updateSectionOption : sectionGrade}
                      className="w-full"
                      value={selectedSections}
                    />
                  </Tooltip>
                  {(error?.sectionIds ||
                    (isSubmit && selectedSections?.length === 0)) && (
                    <p className="text-sm text-red ">
                      {error?.sectionIds ?? "Section is required"}
                    </p>
                  )}
                </section>
              ) : (
                <section className="w-full space-y-2">
                  <label className="font-semibold text-base text-gray-2">
                    Student <span className="text-red-2">*</span>
                  </label>
                  <Tooltip
                    placement="topRight"
                    title={selectedGrade ? undefined : "Select grade first"}
                    color="#1fb6ffff"
                    className="line-clamp-1"
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      required
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label ?? "")
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      disabled={!selectedGrade}
                      placeholder="Select students"
                      size="large"
                      defaultValue={defaultStudents}
                      onChange={e => onChangeMultiSelect("studentIds", e)}
                      options={
                        filteredStudent?.length === 0
                          ? userOptions
                          : filteredStudent
                      }
                      className="w-full"
                      value={selectedUsers}
                    />
                  </Tooltip>
                  {(error?.studentIds ||
                    (isSubmit && selectedUsers?.length === 0)) && (
                    <p className="text-sm text-red ">
                      {error?.studentIds ?? "Student is required"}
                    </p>
                  )}
                </section>
              )}
            </>
          )}

          <div className="grid grid-cols-2 gap-4">
            <section className="w-full space-y-2">
              <label className="font-semibold text-base text-gray-2">
                Course <span className="text-red-2">*</span>
              </label>

              <div className="sm:w-full">
                <Tooltip
                  placement="topRight"
                  title={selectedGrade ? undefined : "Select grade first"}
                  color="#1fb6ffff"
                  className="line-clamp-1"
                >
                  <Select
                    className="w-full"
                    placeholder="Select course"
                    onChange={e => onChangeSelect("courseId", e)}
                    size="large"
                    allowClear
                    required
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    disabled={edit ? stateData?.assignToType : !selectedGrade}
                    defaultValue={stateData?.assignToType}
                    options={courseOptions}
                    value={selectedCourse}
                  />
                </Tooltip>
                {(error?.courseid ||
                  (isSubmit && selectedCourse?.length === 0)) && (
                  <p className="text-sm text-red ">
                    {error?.courseid ?? "Course is required"}
                  </p>
                )}
              </div>
            </section>
            <section className="w-full space-y-2">
              <label className="font-semibold text-base text-gray-2">
                Unit <span className="text-red-2">*</span>
              </label>

              <div className="sm:w-full">
                <Tooltip
                  title={selectedCourse ? undefined : "Select course first"}
                  color="#1fb6ffff"
                  className="line-clamp-1"
                  placement="topRight"
                >
                  <Select
                    className="w-full "
                    placeholder="Select unit"
                    onChange={e => onChangeSelect("unitId", e)}
                    size="large"
                    allowClear
                    required
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    disabled={
                      edit
                        ? stateData?.assignToType
                        : selectedCourse?.length === 0 || !selectedCourse
                    }
                    options={unitOptions}
                    value={selectedUnit}
                  />
                </Tooltip>
                {error?.unitid ||
                  (isSubmit && selectedUnit?.length === 0 && (
                    <p className="text-sm text-red ">
                      {error?.unitid ?? "Unit is required"}
                    </p>
                  ))}
              </div>
            </section>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="reset"
              onClick={() => handleClear()}
              className="px-6 py-1 bg-red text-white border border-red  rounded hover:text-red hover:bg-white"
            >
              Clear
            </button>
            <button
              onClick={() => setIsSubmit(true)}
              className="px-6 py-1 bg-cyan text-white border border-cyan rounded hover:text-cyan hover:bg-white"
            >
              {!edit ? (
                <>{checkedSwitch ? "Assign" : " Save Draft"}</>
              ) : (
                <>{checkedSwitch ? "Update Assign" : " Save Draft"}</>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
