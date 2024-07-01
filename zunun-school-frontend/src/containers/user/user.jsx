import React, { useMemo, useState } from "react";
import { useQueryData, useRoleData } from "../../hooks/useQueryData";
import { Input, Dropdown, Space, Drawer, Select } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import StaffTableActions from "./staffTableAction";
import { usePermissionContext } from "../../context/permissionContext";
import { Button } from "../../components/UI/button";
import { BiFilter, BiX } from "react-icons/bi";
import { useRef } from "react";
import StudentTable from "../../components/table/studentTable";
import { IndeterminateCheckbox } from "../../components/table/indeterminateCheckBox";
import { useMutate, useUserSearchMutation } from "../../hooks/useMutateData";
import toast from "../../utils/toast";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import { ImArrowLeft2 } from "react-icons/im";
import ConfirmModel from "../profile/confirmModel";
import { useAuthContext } from "../../context/authContext";

const User = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const { auth } = useAuthContext();
  const location = useLocation();
  const [roleFilter, setRoleFilter] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmModel, setConfirmModel] = useState(false);
  const [firstAccess, setFirstAccess] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const tableRef = useRef();

  const useAssignTeacherMutation = () =>
    useMutate(["assign-teacher"], "/api/v1/section/assign-teacher/");
  const { mutateAsync } = useAssignTeacherMutation();
  const useRemoveTeacherMutation = () =>
    useMutate(["user"], "/api/v1/section/remove-teacher/");
  const { mutateAsync: removeTeacherMutateAsync } = useRemoveTeacherMutation();

  const useRemoveAssistantTeacherMutation = () =>
    useMutate(["user"], "/api/v1/section/remove-assistant-teacher/");
  const { mutateAsync: removeAssistantTeacherMutateAsync } =
    useRemoveAssistantTeacherMutation();
  const useAssignCoordinatorMutation = () =>
    useMutate(["cooridnator"], "/api/v1/grade/assign-coordinator/");
  const { mutateAsync: coordinatorMutateAsync } =
    useAssignCoordinatorMutation();
  const useAssignAssistantTeacherMutation = () =>
    useMutate(
      ["assign-assistant-teacher"],
      "/api/v1/section/assign-assistant-teacher/",
    );
  const { mutateAsync: assistantTeacherMutateAsync } =
    useAssignAssistantTeacherMutation();

  const searchMutation = useUserSearchMutation();

  const { data: roleData } = useRoleData();

  const roleOptions = [
    { id: null, name: "All" },
    ...(roleData ? roleData : []),
  ];

  const watchGrade = watch("grade");
  const { data: sectionData } = useQueryData(
    ["section", watchGrade],
    !watchGrade ? "api/v1/section/list/" : `api/v1/section/grade/${watchGrade}`,
    [],
    open ? true : false,
  );
  const { data: gradeList } = useQueryData(
    ["grade"],
    "api/v1/grade/list/",
    "",
    !!open,
  );
  const [sectionOptions, setSectionOptions] = useState([]);
  const [gradeOptions, setGradeOptions] = useState([]);
  const { permissions } = usePermissionContext().permissions;
  const userPermission = permissions
    .filter(each => each.url.path.includes("user"))
    .map(each => each.url.path);

  const sectionPermission = permissions
    .filter(each => each.url.path.includes("section"))
    .map(each => each.url.path);

  useEffect(() => {
    setSectionOptions(
      sectionData?.data?.map(each => {
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
  }, [gradeList, sectionData]);

  const useUserData = params => {
    return useQueryData(
      ["user", params, searchText],
      location?.state?.id
        ? `api/v1/user/list/?section=${location?.state?.id}&&role=${location?.state?.role}&&query=${searchText}`
        : `api/v1/user/list/?query=${searchText}`,
      params,
    );
  };

  const { data, isLoading, isError } = useUserData({
    role: roleFilter,
    page,
  });

  const userData = data && data;

  const [searchedUserList, setSearchUserList] = useState([]);

  useEffect(() => {
    setSearchUserList(userData);
  }, [userData]);

  const items = roleOptions?.map(each => {
    return {
      key: each.id,
      label: (
        <a
          className={`${roleFilter === each.id ? "font-semibold" : ""}`}
          onClick={() => {
            setRoleFilter(pre => (pre === each.id ? null : each.id));
          }}
        >
          {each.name.includes("director") ? (
            <span>Director</span>
          ) : each.name.includes("coordinator") ? (
            "Co-ordinator"
          ) : each.name.includes("teacher") ? (
            "Teacher"
          ) : each.name.includes("assistantTeacher") ? (
            "Assistant Teacher"
          ) : (
            "All "
          )}
        </a>
      ),
    };
  });
  roleFilter;

  const columns = useMemo(
    () => [
      {
        accessorFn: (_, index) => index + 1,
        id: "serialNo",
        cell: info => <div className="ml-5">{info.getValue()}</div>,
        header: () => <span className="ml-5">S/N</span>,
        footer: props => props.column.id,
      },
      {
        accessorKey: "username",
        header: () => "Username",
        footer: props => props.column.id,
      },

      {
        accessorKey: "email",
        header: () => "Email",
        footer: props => props.column.id,
      },

      {
        accessorFn: row => {
          let role = row?.role?.name?.includes("director")
            ? "Director"
            : row?.role?.name?.includes("coordinator")
            ? "Co-ordinator"
            : row?.role?.name?.includes("teacher")
            ? "Teacher"
            : row?.role?.name?.includes("assistantTeacher")
            ? "Assistant Teacher"
            : "Student";
          return role;
        },
        id: "role",
        cell: info => info.getValue(),
        header: () => <p>Role</p>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => {
          if (row.isActive) {
            return "Active";
          }
          return "Inactive";
        },
        id: "status",
        cell: info => info.getValue(),
        header: () => <span>Status</span>,
        footer: props => props.column.id,
      },
      {
        accessorFn: row => {
          return (
            <StaffTableActions
              data={row}
              hasCommonRole={row?.role?.id === auth?.user?.role?.id}
            />
          );
        },
        id: "actions",
        cell: info => <div className="w-[50px]">{info.getValue()}</div>,
        header: () => <span>Actions</span>,
        footer: props => props.column.id,
      },
    ],
    [roleData, roleFilter],
  );

  const showCheckBox =
    roleFilter === 2 ||
    location?.state?.role === 3 ||
    roleFilter === 3 ||
    location?.state?.role === 4 ||
    roleFilter === 4;

  showCheckBox &&
    columns.unshift({
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
      cell: ({ row }) => {
        return (
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
        );
      },
    });
  const onClose = () => {
    reset();
    setOpen(false);
  };

  const handleTeacherAssign = async data => {
    const postData = {
      users: selectedRows?.map(item => {
        return item;
      }),
    };
    try {
      const response = await mutateAsync(["post", data?.section, postData]);
      if (response.success) {
        toast.success("Teacher Assigned Successfully");
        setSelectedRows([]);
        reset();
        setOpen(false);
      }
    } catch (err) {
      toast.error(err.response.data.errors.teacher);
    }
  };
  const handleAssistanctTeacherAssign = async data => {
    const postData = {
      users: selectedRows?.map(item => {
        return item;
      }),
    };
    try {
      const response = await assistantTeacherMutateAsync([
        "post",
        data?.section,
        postData,
      ]);
      if (response.success) {
        toast.success("Assistant Teacher Assigned Successfully");
        setSelectedRows([]);
        reset();
        setOpen(false);
      }
    } catch (err) {
      toast.error(err.response.data.errors.teacher);
    }
  };
  const handleCoordinatorAssign = async data => {
    const postData = {
      users: selectedRows?.map(item => {
        return item;
      }),
      grade: data.grade,
    };
    try {
      const response = await coordinatorMutateAsync(["post", "", postData]);
      if (response.success) {
        toast.success("Coordinator Assigned Successfully");
        setSelectedRows([]);
        reset();
        setOpen(false);
      }
    } catch (err) {
      toast.error(err.response.data.errors.teacher);
    }
  };
  const handleUnAssignTeacher = async () => {
    const postData = {
      users: selectedRows?.map(item => {
        return item;
      }),
    };
    try {
      const response = await removeTeacherMutateAsync([
        "post",
        location?.state?.id,
        postData,
      ]);
      if (response.success) {
        toast.success("Teacher Unassigned Successfully");
        setSelectedRows([]);
        reset();
        setOpen(false);
        setConfirmModel(false);
      }
    } catch (err) {
      toast.error(err.response.data.errors.teacher);
    }
  };
  const handleUnAssignAssistantTeacher = async () => {
    const postData = {
      users: selectedRows?.map(item => {
        return item;
      }),
    };
    try {
      const response = await removeAssistantTeacherMutateAsync([
        "post",
        location?.state?.id,
        postData,
      ]);
      if (response.success) {
        toast.success("Assistant Teacher Unassigned Successfully");
        setSelectedRows([]);
        reset();
        setOpen(false);
        setConfirmModel(false);
      }
    } catch (err) {
      toast.error(err.response.data.errors.teacher);
    }
  };

  // const handleSearch = async e => {
  //   if (e.target.value === "") {
  //     setSearchUserList(userData);
  //   } else {
  //     const result = await searchMutation.mutateAsync([
  //       "post",
  //       "",
  //       {
  //         model: "user",
  //         query: e.target.value,
  //       },
  //     ]);
  //     setSearchUserList(result);
  //   }
  // };

  // useEffect(() => {
  //   let timerKey;
  //   if (!firstAccess) {
  //     timerKey = setTimeout(() => {
  //       handleSearch();
  //     }, 400);
  //   }
  //   return () => {
  //     setFirstAccess(false);
  //     clearTimeout(timerKey);
  //   };
  // }, [handleSearch, firstAccess]);

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-8">
          {location?.state?.id && (
            <Link
              to={-1}
              className="flex items-center gap-1 border border-blue bg-blue rounded-md  text-white  hover:bg-white hover:text-blue  cursor-pointer px-3 text-sm py-1"
            >
              {" "}
              <ImArrowLeft2 size={16} />
            </Link>
          )}
          <h2 className="text-2xl md:text-lg font-bold sm:font-medium sm:text-base">
            Staffs {roleFilter && "| "}
            {roleFilter === 1
              ? "Director"
              : roleFilter === 2
              ? "Co-ordinator"
              : roleFilter === 3
              ? "Teacher"
              : roleFilter === 4
              ? "Assistant Teacher"
              : ""}
          </h2>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search staffs"
              onChange={e => setSearchText(e.target.value)}
              className="md:w-1/2"
              allowClear={true}
              type="search"
            />
            {roleFilter ? (
              <p
                onClick={() => setRoleFilter(null)}
                className={`flex items-center gap-2 
                    bg-red border-red cursor-pointer hover:text-red  px-4 border  rounded py-[2px] hover:bg-white  text-white`}
              >
                Clear{" "}
                <BiX className="h-4 w-4  hover:cursor-pointer hover:text-rose-600" />
              </p>
            ) : (
              <Dropdown
                menu={{ items }}
                placement="bottomLeft"
                className={`flex items-center gap-2 ${
                  roleFilter
                    ? "bg-red border-red hover:text-red"
                    : "bg-blue border-blue hover:text-blue"
                }  px-4 border  rounded py-[2px] hover:bg-white  text-white`}
              >
                <a onClick={e => e.preventDefault()}>
                  <Space>
                    {" "}
                    Filter
                    <BiFilter
                      className={
                        "h-4 w-4  hover:cursor-pointer hover:text-cyan"
                      }
                    />
                  </Space>
                </a>
              </Dropdown>
            )}

            <div className="flex gap-1">
              {location?.state?.role !== 3 &&
                (userPermission.includes("/user/create/") ||
                  permissions[0].name === "Any") && (
                  <Button
                    type="primary"
                    onClick={() => navigate("/user/addUser")}
                  >
                    Add Staff
                  </Button>
                )}

              {(selectedRows?.length && roleFilter === 4) ||
              (selectedRows?.length && roleFilter === 3) ||
              (selectedRows?.length && roleFilter === 2) ||
              (selectedRows?.length &&
                location?.state?.id &&
                (location?.state?.role === 3 || location?.state?.role === 4)) ||
              (selectedRows?.length &&
                location?.state?.id &&
                location?.state?.role === 2) ? (
                <Button
                  type="primary"
                  onClick={() => {
                    location?.state?.id &&
                    (location?.state?.role === 3 || location?.state?.role === 4)
                      ? setConfirmModel(true)
                      : setOpen(true);
                  }}
                >
                  {location?.state?.id &&
                  (location?.state?.role === 3 ||
                    location?.state?.role === 4) &&
                  (sectionPermission.includes("/section/remove-teacher/") ||
                    permissions?.[0]?.name === "Any")
                    ? "UnAssign from Section"
                    : roleFilter === 2
                    ? "Assign to Grade"
                    : location?.state?.id && roleFilter === 2
                    ? "UnAssign from Grade"
                    : (sectionPermission.includes("/section/assign-teacher/") ||
                        permissions[0].name === "Any") &&
                      "Assign to Section"}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
        {userPermission.includes("/user/list/") ||
          (permissions?.[0]?.name === "Any" && (
            <StudentTable
              isFetching={isLoading}
              error={isError}
              columns={columns}
              data={searchedUserList?.data}
              rowSelectable={showCheckBox}
              setSelectedRows={setSelectedRows}
              ref={tableRef}
              handlePageChange={page => setPage(page)}
              currentPage={searchedUserList?.currentPage}
              totalPage={searchedUserList?.totalPage}
            />
          ))}
      </div>
      <Drawer
        title="Assign to Section"
        placement="right"
        onClose={onClose}
        open={open}
        setOpen={setOpen}
      >
        <form
          onSubmit={handleSubmit(data =>
            roleFilter === 3
              ? handleTeacherAssign(data)
              : roleFilter === 4
              ? handleAssistanctTeacherAssign(data)
              : handleCoordinatorAssign(data),
          )}
        >
          <div className="space-y-6 flex flex-col">
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
              {(roleFilter === 3 || roleFilter === 4) && (
                <>
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
                </>
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

            <Button type="primary" className=" w-1/2" htmlType="submit">
              {isLoading ? "Assigning..." : "Assign Staff"}
            </Button>
          </div>
        </form>
      </Drawer>
      {confirmModel && (
        <ConfirmModel
          title={`${
            location?.state?.role === 4
              ? "Unassign Assistant Teacher"
              : "Unassign  Teacher"
          }`}
          isOpen={confirmModel}
          setOpen={setConfirmModel}
          desc={`Are you sure you want to unassign ${
            location?.state?.role === 4 ? "assistant teacher" : "teacher"
          } ?`}
          btnName={"Unassign"}
          handleConfirm={() => {
            location?.state?.role === 4
              ? handleUnAssignAssistantTeacher()
              : handleUnAssignTeacher();
          }}
        />
      )}
    </>
  );
};

export default User;
