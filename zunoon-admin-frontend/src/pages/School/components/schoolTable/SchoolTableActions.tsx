import React, { ReactElement, useState } from "react";

import "../../../../components/TableActions/TableActions.scss";
import DeleteModal from "../../../../components/DeleteModal/DeleteModal";

import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import ViewAssignedCoursesModal from "./ViewAssignedCoursesModal";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../constants/routes";
import { useSchoolContext } from "../../../../context/SchoolContextProvider";
import { getPermissions } from "../../../../utils/storage";
import { useTranslation } from "react-i18next";

type PropsType = {
  id?: string;
  data: object | any;
  handleToggleStatus?: Function;
  handleClickUpdate: Function;
  formToEdit: ReactElement;
  deactivateButton?: boolean;
  userStatus?: boolean;
  disableDelete?: boolean;
  isLoading?: boolean;
  assignAction?: boolean;
  handleShowAssignModal: () => void;
  handleViewAssignedCoursesModal: () => void;
  formToAssign?: ReactElement;
};

export default function SchoolTableActions({
  id,
  data,
  handleToggleStatus,
  handleClickUpdate,
  formToEdit,
  deactivateButton,
  userStatus,
  disableDelete,
  isLoading,
  assignAction = false,
  handleShowAssignModal,
  handleViewAssignedCoursesModal,
  formToAssign,
}: PropsType) {
  const { t } = useTranslation();
  const isAdmin = getPermissions()[0]?.name === "Any";

  const schoolPermissions = getPermissions()
    .filter(each => each.url.path.includes("school"))
    .map(each => each.url.path);

  const dropdownPermissions = ["/school/update/", "/school/courses/", "/school/assign-course/"];

  const hasDropDown = dropdownPermissions.some(value => {
    return schoolPermissions.includes(value);
  });

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showAssignedCourses, setShowAssignedCourses] = useState<boolean>(false);

  const { handleSchoolUpdate } = useSchoolContext();
  const navigate = useNavigate();

  const handleClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowDeleteModal(true);

  const toggleModal = () => {
    setShowEditModal(!showEditModal);
  };

  return (
    <>
      {
        <td
          className="actions"
          style={{
            height: "50px",
            display: "flex",
            alignItems: "center",
          }}
          role="cell"
        >
          {(schoolPermissions.includes("/school/toggle-visibility/") || isAdmin) && (
            <label
              className={`toggle-wrapper ${userStatus === true && "active"}`}
              onClick={handleShow}
            >
              <span className={`slider ${userStatus === true && "active"}`}></span>
            </label>
          )}
          <span>
            {(hasDropDown || isAdmin) && (
              <DropdownButton
                id={`dropdown-variants-info-size-extra-small-no-caret`}
                variant=""
                title=""
              >
                {(schoolPermissions.includes("/school/update/") || isAdmin) && (
                  <Dropdown.Item>
                    <div
                      onClick={() => {
                        handleSchoolUpdate({ ...data });
                        navigate(PATH.UPDATE_SCHOOL);
                      }}
                    >
                      {`${t("edit")} ${t("school")}`}
                    </div>
                  </Dropdown.Item>
                )}
                {(schoolPermissions.includes("/school/assign-course/") || isAdmin) && (
                  <Dropdown.Item
                    // onClick={handleShowAssignModal}
                    onClick={() => {
                      navigate(PATH.ASSIGN_NEW_COURSES, {
                        state: { id: data.id, name: data.name },
                      });
                    }}
                  >
                    {`${t("assign")} ${t("course")}`}
                  </Dropdown.Item>
                )}
                {/* <Dropdown.Item onClick={handleShowAssignedCourses}> */}
                {(schoolPermissions.includes("/school/courses/") || isAdmin) && (
                  <Dropdown.Item
                    onClick={() => {
                      navigate(PATH.ASSIGNED_COURSES, {
                        state: { id: data.id, name: data.name },
                      });
                    }}
                  >
                    {`${t("view")} ${t("assigned")} ${t("sidebar_courses")}`}
                  </Dropdown.Item>
                )}
              </DropdownButton>
            )}
          </span>
        </td>
      }

      <Modal
        size="lg"
        show={showEditModal}
        onHide={toggleModal}
        dialogClassName={"modal_container"}
        centered
      >
        <Modal.Header className="modalTitle" closeButton>
          <Modal.Title>Update School</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalBody">
          {React.cloneElement(formToEdit, {
            data: data,
            editform: 1,
            handleCancel: toggleModal,
            handleClickUpdate,
            isLoading,
          })}
        </Modal.Body>
      </Modal>

      <DeleteModal
        isDeactivate={deactivateButton}
        show={showDeleteModal}
        handleClose={handleClose}
        id={data?.id}
        name={data?.name || data?.firstName}
        handleDelete={handleToggleStatus}
        isConfirm={true}
      />

      {showAssignedCourses && (
        <ViewAssignedCoursesModal
          show={showAssignedCourses}
          handleClose={() => setShowAssignedCourses(false)}
          id={data.id}
          name={data.name}
        />
      )}
    </>
  );
}
