import React, { useState, useEffect, useRef } from "react";
import { ShimmerTable } from "react-shimmer-effects";
import { useForm, Controller } from "react-hook-form";
import { Badge, Drawer, Dropdown, Select, Space, message } from "antd";
import { useMutate } from "../../hooks/useMutateData";
import { useQueryData } from "../../hooks/useQueryData";
import toast from "../../utils/toast";
import { Button } from "../../components/UI/button";
import StudentTable from "../../components/table/studentTable";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ImArrowLeft2 } from "react-icons/im";
import { BiBookContent, BiEdit, BiFilter } from "react-icons/bi";
import { useMemo } from "react";
import { IndeterminateCheckbox } from "../../components/table/indeterminateCheckBox";
import { usePermissionContext } from "../../context/permissionContext";
import { BsEye, BsFileText } from "react-icons/bs";
import ErrorPage from "../../components/errorPage/errorPage";
import { OptionVerticalSvg } from "../../assets/icons/allSvg";
import FilterByGrades from "../section/filterByGrades";
import { RxCross2 } from "react-icons/rx";
import BulkUploadStudent from "../../components/modal/BulkUploadStudent";
import noStudent from "../../assets/images/noStudent.png";

function StudentPage() {
  const {
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [openFilter, setOpenFilter] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [bulkUploadModal, setBulkUploadModal] = useState(false);
  const [gradeId, setGradeId] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [buttonType, setButtonType] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { permissions } = usePermissionContext().permissions;
  const sectionPermission = permissions
    .filter(each => each.url.path.includes("section"))
    .map(each => each.url.path);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    reset();
  };

  const useUserData = params => {
    return useQueryData(
      ["allStudents", searchText],
      `api/v1/student/list/?query=${searchText}`,
      params,
    );
  };

  const { data, isFetching, error } = useUserData();

  const { data: dataListByGrade } = useQueryData(
    ["allStudentsListByGrade", location, gradeId && searchText, gradeId],
    `api/v1/student/list/?grade=${
      location?.state?.id || location?.state?.assignStudentFronGrade || gradeId
    }&&query=${searchText}`,
    "",
    !!location?.state?.id ||
      !!location?.state?.assignStudentFronGrade ||
      !!gradeId,
  );
  const { data: dataListBySection } = useQueryData(
    ["allStudentsListBySection", location, location && searchText],
    `api/v1/student/list/?section=${location?.state?.idx}&&query=${searchText}`,
    "",
    !!location?.state?.idx,
  );

  const watchGrade = watch("grade");

  const { data: sectionData } = useQueryData(
    ["section", watchGrade],
    `api/v1/section/grade/${watchGrade}`,
    [],
    open && watchGrade ? true : false,
  );

  const { data: gradeData } = useQueryData(
    ["grade"],
    "api/v1/grade/list/",
    [],
    open ? true : false,
  );

  const [sectionOptions, setSectionOptions] = useState([]);
  const [gradeOptions, setGradeOptions] = useState([]);

  useEffect(() => {
    selectedRows?.length ? setButtonType("primary") : setButtonType("disabled");
  }, [selectedRows.length]);

  useEffect(() => {
    setGradeOptions(
      gradeData?.data.map(each => {
        return {
          label: each.name,
          value: each.id,
        };
      }),
    );
  }, [gradeData]);

  useEffect(() => {
    watchGrade
      ? setSectionOptions(
          sectionData?.data?.map(each => {
            return {
              label: each.name,
              value: each.id,
            };
          }),
        )
      : setSectionOptions([]);
  }, [sectionData, watchGrade]);

  const useAssignStudentMutation = () =>
    useMutate(["assign"], "api/v1/section/assign-student/");
  const useUnAssignStudentMutation = () =>
    useMutate(["allStudentsListBySection"], "api/v1/section/remove-student/");

  const { mutateAsync, isLoading } = useAssignStudentMutation();
  const unAssignStudent = useUnAssignStudentMutation().mutateAsync;

  const tableRef = useRef();

  const handleAssign = async data => {
    const postData = {
      users: selectedRows,
    };

    try {
      const response = await mutateAsync(["post", data?.section, postData]);
      if (response?.success) {
        setOpen(false);
        toast.success("Student assigned successfully!");
        tableRef.current.clearSelection();
        reset();
      }
    } catch (err) {
      toast.warning(err?.response?.data?.errors?.error);
    }
  };

  const handleUnAssign = async () => {
    const postData = {
      users: selectedRows,
    };
    try {
      const response = await unAssignStudent([
        "post",
        `${location?.state?.idx}`,
        postData,
      ]);
      if (response?.success) {
        toast.success("Student Unassigned successfully!");
        tableRef.current.clearSelection();
        reset();
      }
    } catch (err) {
      toast.warning(err);
    }
  };

  const columns = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            className={"ml-1"}
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        accessorFn: (_, index) => index + 1,
        id: "serialNo",
        cell: info => <div className={"ml-3"}>{info.getValue()}</div>,
        header: () => <span className={"ml-3"}>S/N</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.student.firstName + " " + row.student.surname,
        id: "name",
        cell: info => info.getValue(),
        header: () => <span>Student&apos;s Name</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.student.username,
        id: "username",
        cell: info => info.getValue(),
        header: () => <span>Username</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => {
          return <p className="ml-10">{row.coursesEnrolled || 0}</p>;
        },
        id: "enrolled",
        cell: info => info.getValue(),
        header: () => <span>Courses Enrolled</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => row.student.minEducId,
        id: "minEducId",
        cell: info => info.getValue(),
        header: () => <span>Min Educ ID</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => (row.student.isActive ? "Active" : "Deactivated"),
        id: "account",
        cell: info => info.getValue(),
        header: () => <span>Account</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => {
          let lastActive = row.student.lastActive;
          return lastActive ? (
            <p
              className={`py-[2px] w-24 rounded-full text-white px-5 ${
                lastActive < 5 ? "bg-green" : "bg-red"
              }`}
            >
              <nobr className="">{lastActive} days ago</nobr>
            </p>
          ) : (
            <Badge text={"Inactive"} className={"bg-zinc-400"} />
          );
        },
        id: "status",
        cell: info => <div className="w-[50px]">{info.getValue()}</div>,
        header: () => <span>Last Active</span>,
        footer: props => props.column.id,
      },
      {
        id: "action",
        cell: info => {
          const items = [
            {
              key: "1",
              label: (
                <NavLink
                  to={"/grading"}
                  state={{ id: info?.row?.original?.student?.id }}
                  className="text-blue flex cursor-pointer "
                >
                  View Grading Report
                </NavLink>
              ),
              icon: <BsEye />,
            },
            {
              key: "2",
              label: (
                <NavLink
                  to={"/grading-card"}
                  state={{ id: info?.row?.original?.student?.id }}
                  className="text-blue flex cursor-pointer "
                >
                  View Grading Card
                </NavLink>
              ),
              icon: <BsFileText />,
            },
            {
              key: "3",
              label: (
                <NavLink
                  to={"/courses"}
                  state={{
                    studentId: info?.row?.original?.student?.id,
                    firstName: info?.row?.original?.student?.firstName,
                  }}
                  className="text-blue flex cursor-pointer "
                >
                  View Courses
                </NavLink>
              ),
              icon: <BiBookContent />,
            },
          ];
          return (
            <div className="flex gap-2">
              <NavLink
                to={"/student/edit-profile"}
                state={{ data: info?.row?.original, edit: true }}
                className="text-blue flex  cursor-pointer "
              >
                <BiEdit size={20} />
              </NavLink>
              <Dropdown
                menu={{ items }}
                placement="bottomLeft"
                className="flex justify-end"
              >
                <NavLink
                  state={{ id: info?.row?.original?.student?.id }}
                  onClick={e => e.preventDefault()}
                >
                  <Space>
                    <OptionVerticalSvg
                      className={"h-5 w-5 hover:cursor-pointer"}
                    />
                  </Space>
                </NavLink>
              </Dropdown>
            </div>
          );
        },
        header: () => <span>Action</span>,
        footer: props => props.column.id,
      },
    ],
    [],
  );


  return (
    <div>
      {contextHolder}
      <div className="flex justify-between items-center mb-8 bg-">
        {(location?.state?.idx ||
          location?.state?.id ||
          location?.state?.assignStudentFronGrade) && (
          <Link
            to={-1}
            className="flex items-center gap-1 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3 text-sm py-1"
          >
            <ImArrowLeft2 size={16} />
          </Link>
        )}
        <h3 className="text-2xl md:text-lg font-bold sm:font-medium sm:text-base">
          {location?.state?.name ? `${location?.state?.name} -` : ""} Students
        </h3>
        <div className="flex gap-1">
          <div className="flex items-center gap-2 bg-white px-4  rounded-md outline-none ">
            <input
              type="text"
              placeholder="Search"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="outline-none w-full bg-transparent"
            />
            {searchText && <RxCross2 onClick={() => setSearchText("")} />}
          </div>
          <div
            className={`flex gap-2 ${
              isFiltered
                ? "font-bold bg-red text-white hover:text-red hover:bg-white border border-red px-4 py-[2px]"
                : "bg-blue text-white px-4 py-[2px] hover:bg-white hover:text-blue cursor-pointer border border-blue"
            }  rounded cursor-pointer`}
            onClick={() => {
              !isFiltered ? setOpenFilter(true) : setIsFiltered(false);
            }}
          >
            {!isFiltered ? "Filter" : "Clear "}
            {!isFiltered ? <BiFilter size={22} /> : " X"}
          </div>
          {!location?.state?.assignStudentFronGrade && !location?.state?.idx && (
            <Button
              type={"primary"}
              onClick={() =>
                navigate(
                  location?.state?.idx ? "/student" : "/student/add-student",
                  {
                    state: {
                      add: true,
                      assignStudentFronGrade: location?.state?.grade,
                    },
                  },
                )
              }
            >
              {location?.state?.idx ? "Assign Student" : "Add Student"}
            </Button>
          )}
          <Button type={"primary"} onClick={() => setBulkUploadModal(true)}>
            Bulk upload
          </Button>
        </div>
      </div>
      <>
        {selectedRows?.length ? (
          <div className="flex mb-4 justify-between bg-blue-light items-center h-12 rounded px-4 text-white">
            {selectedRows?.length} Student Selected
            <div className="unassign_button">
              {(sectionPermission.includes("/section/assign-student/") ||
                sectionPermission.includes("/section/remove-student/") ||
                permissions[0].name === "Any") && (
                <button
                  className={`border-2 px-4 py-1 rounded font-semibold bg-white ${
                    location?.state?.idx
                      ? "text-red hover:bg-red"
                      : "text-blue hover:bg-blue-light"
                  }  hover:text-white`}
                  type={buttonType}
                  onClick={() => {
                    selectedRows?.length
                      ? location?.state?.idx
                        ? handleUnAssign()
                        : showDrawer()
                      : messageApi.warning({
                          type: "error",
                          content: location?.state?.idx
                            ? "No students selected to unassign"
                            : "No students selected to assign",
                        });
                  }}
                >
                  {location?.state?.idx &&
                  (sectionPermission?.includes("/section/remove-student/") ||
                    permissions[0].name === "Any")
                    ? "UnAssign from Section"
                    : (sectionPermission.includes("/section/assign-student/") ||
                        permissions[0].name === "Any") &&
                      "Assign to Section"}
                </button>
              )}
            </div>
          </div>
        ) : null}
      </>
      {isFetching ? (
        <ShimmerTable col={5} row={10} />
      ) : location?.state?.id || location?.state?.idx || data?.data ? (
        <StudentTable
          data={
            location?.state?.id ||
            location?.state?.assignStudentFronGrade ||
            (isFiltered && gradeId)
              ? dataListByGrade?.data
              : location?.state?.idx
              ? dataListBySection?.data
              : data
              ? data?.data
              : []
          }
          columns={columns}
          setSelectedRows={setSelectedRows}
          rowSelectable
          tableRef={tableRef}
          currentPage={
            location?.state?.id ||
            location?.state?.assignStudentFronGrade ||
            (isFiltered && gradeId)
              ? dataListByGrade?.currentPage
              : location?.state?.idx
              ? dataListBySection?.currentPage
              : data?.currentPage
          }
          totalPage={
            location?.state?.id ||
            location?.state?.assignStudentFronGrade ||
            (isFiltered && gradeId)
              ? dataListByGrade?.totalPage
              : location?.state?.idx
              ? dataListBySection?.totalPage
              : data?.totalPage
          }
          handlePageChange={page => setPage(page)}
        />
      ) : (
        <div className="w-full  bg-white flex items-center justify-center rounded-md">
          <ErrorPage
            emptyImage={noStudent}
            data={data?.data}
            isFetching={isLoading}
            error={error}
            title={"No student to show"}
          />
        </div>
      )}

      <FilterByGrades
        open={openFilter}
        setOpen={setOpenFilter}
        title={"Filter student by grade"}
        setIsFiltered={setIsFiltered}
        setGradeId={setGradeId}
        gradeId={gradeId}
      />
      {bulkUploadModal && (
        <BulkUploadStudent
          isOpen={bulkUploadModal}
          setOpen={setBulkUploadModal}
        />
      )}
      <Drawer
        title={"Assign to Section"}
        placement="right"
        onClose={onClose}
        open={open}
      >
        <form onSubmit={handleSubmit(data => handleAssign(data))}>
          <div className="space-y-4">
            <div className="space-y-2">
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

            <div className="space-y-2">
              <label className="text-gray-dark1 font-medium">
                Section <span className="text-red-2">*</span>
              </label>
              <Controller
                name="section"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
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
                <p className="text-red text-end ">This field is required</p>
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-20">
            <Button
              type="outlined"
              className="w-1/2 flex items-center justify-center"
              onClick={() =>
                reset({
                  section: null,
                  grade: null,
                })
              }
            >
              Clear
            </Button>

            <Button type="primary" className=" w-1/2 " htmlType="submit">
              {isLoading ? "Assigning..." : "Assign to Section"}
            </Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}

export default StudentPage;
