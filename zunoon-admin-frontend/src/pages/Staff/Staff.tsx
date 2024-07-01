import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination/Pagination";
import Tables from "../../components/Tables/Tables";
import http from "../../utils/http";
import toast from "../../utils/toast";
import Search from "../../components/Search/Search";
import { PATH } from "../../constants/routes";
import useFetch from "../../hooks/useFetch";
import "./Staff.scss";
import config from "../../config";
import { withTranslation } from "react-i18next";
import type { IStaff } from "../../@types/staff";
import { getPermissions } from "../../utils/storage";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import StaffForm from "./components/staffForm/StaffForm";

const userApi = config.endpoints.api.user;

const Staff = ({ t }: { t: (key: string) => string }) => {
  const isAdmin = getPermissions()[0]?.name === "Any";

  const staffPermissions = getPermissions()
    .filter(each => each.url.path.includes("user"))
    .map(each => each.url.path);

  const mutatePermissions = ["/user/update/", "/user/toggle-status/", "/user/assign-permissions/"];

  const hasMutate = mutatePermissions.some(value => {
    return staffPermissions.includes(value);
  });

  const navigate = useNavigate();

  const { loading, error, fetchedData, fetchNewData } = useFetch();

  const selectedElementRef = useRef<null | HTMLElement>(null);
  const [staffs, setStaffs] = useState<IStaff[] | null>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [totalPageNumber, setTotalPageNumber] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [selectedStaff, setSelectedStaff] = useState<IStaff>();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleShow = () => setShowDeleteModal(true);
  const handleClose = () => setShowDeleteModal(false);

  useEffect(() => {
    fetchNewData(userApi.list);
  }, [fetchNewData]);

  useEffect(() => {
    setStaffs(fetchedData.data);
    setTotalPageNumber(fetchedData.totalPage);
    setCurrentPageNumber(fetchedData.currentPage);
  }, [fetchedData]);

  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const toggleEditStaffModal = () => {
    setShowEditModal(!showEditModal);
  };

  const columns: any = [
    {
      Header: t("th_name"),
      accessor: "name",
      Cell: (tableProps: {
        row: {
          original: {
            file: any;
            image: string;
            firstName: string;
            lastName: string;
          };
        };
      }) => {
        const original = tableProps.row.original;

        return (
          <div className="profile_container">
            <div className="profile_pic_container">
              {original?.file?.url ? (
                <img src={`${original?.file?.url}`} alt="profile" />
              ) : (
                (original.firstName ? original.firstName[0] : "") +
                (original.lastName ? original.lastName[0] : "")
              )}
            </div>
            {`${original.firstName ? original.firstName : "No"} ${original.lastName ? original.lastName : "Name"
              }`}
          </div>
        );
      },
    },
    {
      Header: t("th_email"),
      accessor: "email",
    },
    {
      Header: t("th_role"),
      accessor: "role",
      Cell: ({ row }) => {
        let role = row?.original?.role?.name?.includes("superadmin")
          ? "Super Admin"
          : row?.original?.role?.name?.includes("admin")
            ? "Admin"
            : row?.original?.role?.name?.includes("contentdeveloper")
              ? "Content Developer"
              : row?.original?.role?.name?.includes("contentsupervisor")
                ? "Content Supervisor"
                : "Some Role";
        return role;
      },
    },
    {
      Header: t("th_status"),
      accessor: "active",
      Cell: ({ row }) => {
        if (row.original.isActive) {
          return "Active";
        }
        return "Inactive";
      },
    },
  ];

  (hasMutate || isAdmin) &&
    columns.push({
      Header: `${t("th_action")}`,
      accessor: "action",
      disableSortBy: true,
      Cell: tableProps => {
        const original = tableProps.row.original;

        return (
          <div className="staff_table_actions">
            {(staffPermissions.includes("/user/toggle-status/") || isAdmin) && (
              <label
                className={`toggle-wrapper ${original?.isActive === true && "active"}`}
                onClick={() => {
                  setSelectedStaff(original);
                  handleShow();
                }}
              >
                <span className={`slider ${original?.isActive === true && "active"}`}></span>
              </label>
            )}
            {(staffPermissions.includes("/user/update/") ||
              staffPermissions.includes("/user/assign-permissions/") ||
              isAdmin) && (
                <DropdownButton id={`dropdown-variants-info`} variant="default" title="">
                  {(staffPermissions.includes("/user/update/") || isAdmin) && (
                    <Dropdown.Item
                      onClick={() => {
                        toggleEditStaffModal();
                        setSelectedStaff(original);
                      }}
                    >
                      {`${t("edit")} ${t("staff")}`}
                    </Dropdown.Item>
                  )}
                  {(staffPermissions.includes("/user/assign-permissions/") || isAdmin) && (
                    <Dropdown.Item
                      onClick={() => {
                        const permissionIds = original.permissions?.map(each => each.id);
                        navigate(`./${PATH.PERMISSION}`, {
                          state: {
                            userId: original.id,
                            name: `${original.firstName || ""} ${original.middleName || ""} ${original.lastName || ""
                              }`,
                            role: original.role,
                            permissions: permissionIds || [],
                          },
                        });
                      }}
                    >
                      {`${t("edit")} ${t("permission")}`}
                    </Dropdown.Item>
                  )}
                </DropdownButton>
              )}
          </div>
        );
      },
    });

  const handleDelete = async (id: string) => {
    try {
      const response = await http.PATCH(userApi.delete(id), "");
      if (response.status === 200) {
        toast.success(t("staff_status_toggled"));
        fetchNewData(userApi.list);
      } else {
        toast.error(new Error(t("error_in_deleting_the_staff")));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleClickUpdate = (toggleModal: () => unknown) => (data: IStaff) => {
    const permissions = data && data?.permissions;
    delete data?.permissions;

    async function pushUpdate(): Promise<void> {
      setIsSubmitting(true);
      try {
        const response = await http.PATCH(userApi.update(data.id), data);
        if (response.status === 200) {
          toggleModal();
          fetchNewData(userApi.list);
          toast.success(`${t("staff")} ${t("updated_successfully")}`);

          if (data.isRoleUpdated) {
            setTimeout(() => {
              navigate(`./${PATH.PERMISSION}`, {
                state: {
                  userId: data.id,
                  name: `${data.firstName} ${data.middleName} ${data.lastName}`,
                  role: data.role,
                  permissions,
                },
              });
            }, 500);
          }
        } else {
          toast.error(new Error(t("error_in_updating_the_staff")));
        }
      } catch (error) {
        setIsSubmitting(false);
        toast.error(error?.response?.data?.errors?.error);
      }
      setIsSubmitting(false);
    }
    pushUpdate();
  };

  const handleSearch = useMemo(() => {
    return async (searchText: string) => {
      if (searchText === "") {
        return fetchNewData(userApi.list);
      }
      try {
        const response = await http.POST(userApi.globalSearch, {
          query: searchText,
          model: "user",
        });

        setStaffs(response && response?.data?.data);
        setTotalPageNumber(response?.data?.totalPage);
        setCurrentPageNumber(response?.data?.currentPage);
      } catch (err) {
        toast.error(err.message?.toString());
        setStaffs(null);
      }
    };
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setStaffs([]);
    fetchNewData(`${userApi.list}?page=${pageNumber}`);
  };

  if (error) {
    toast.error(error);
  }

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{t("sidebar_staffs")}</h4>
        <div className="header_actions">
          <div className="search_wrapper">
            <Search
              handleSearch={handleSearch}
              setTotalPageNumber={setTotalPageNumber}
              setCurrentPageNumber={setCurrentPageNumber}
              setFilteredData={setStaffs}
            />
          </div>
          {(staffPermissions?.includes("/user/create/") || isAdmin) && (
            <div className="button_wrapper">
              <Link to={PATH.ADD_STAFF}>
                <Button buttonName={`${t("add")} ${t("staff")}`} color="success" type={"button"} />
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="table_container staff_table_container">
        <Tables
          data={staffs}
          hasError={error}
          columns={columns}
          isFetching={loading}
          isLoading={isSubmitting}
          formToEdit={<StaffForm />}
          handleDelete={handleDelete}
          selectedElementRef={selectedElementRef}
          handleClickUpdate={() => handleClickUpdate}
          deactivateButton={true}
          staffAction={true}
          hasActions={false}
        />
      </div>

      <Modal
        size="lg"
        show={showEditModal}
        onHide={toggleEditStaffModal}
        dialogClassName={"modal_container"}
        centered
      >
        <Modal.Header className="modalTitle" closeButton>
          <Modal.Title>{`${t("update")} ${t("staff")}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalBody">
          {React.cloneElement(<StaffForm handleClickUpdate={() => handleClickUpdate} />, {
            data: selectedStaff,
            editform: 1,
            handleCancel: toggleEditStaffModal,
            loading,
          })}
        </Modal.Body>
      </Modal>

      <DeleteModal
        isDeactivate={true}
        show={showDeleteModal}
        handleClose={handleClose}
        id={selectedStaff?.id}
        name={selectedStaff?.firstName}
        handleDelete={handleDelete}
        isConfirm={true}
      />

      {staffs && staffs?.length ? (
        <div className="pages_container">
          <Pagination
            currentPageNumber={currentPageNumber}
            totalPageNumber={totalPageNumber}
            handlePageChange={handlePageChange}
          />
        </div>
      ) : null}
    </>
  );
};

Staff.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Staff);
