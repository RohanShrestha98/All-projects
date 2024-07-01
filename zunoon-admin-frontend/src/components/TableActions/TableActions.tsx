import React, { ReactElement, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import "./TableActions.scss";
import DeleteModal from "../DeleteModal/DeleteModal";
// import StaffForm from "../../pages/Staff/components/staffForm/StaffForm";

import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type PropsType = {
  id?: string;
  ID?: string;
  checkedContentsFromBasket?: string[];
  data: object | any;
  handleDelete: Function;
  handleClickUpdate: Function;
  formToEdit: ReactElement;
  deactivateButton?: boolean;
  userStatus?: boolean;
  disableDelete?: boolean;
  isLoading?: boolean;
  assignAction?: boolean;
  handleAssign?: Function;
  formToAssign?: ReactElement;
  staffAction?: boolean;
  contentBasketAction?: boolean;
};

export default function TableAction({
  id,
  ID,
  data,
  handleDelete,
  handleClickUpdate,
  formToEdit,
  deactivateButton,
  userStatus,
  disableDelete,
  isLoading,
  assignAction = false,
  handleAssign,
  formToAssign,
  staffAction,
  contentBasketAction,
}: PropsType) {
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const handleClose = () => setShowDeleteModal(false);
  const handleShow = () => setShowDeleteModal(true);

  const toggleModal = () => {
    setShowEditModal(!showEditModal);
  };

  const { t } = useTranslation();

  return (
    <>
      <td
        className="actions"
        style={{
          display: "flex",
          justifyContent: "center",
          border: "none",
          borderStyle: "none",
        }}
      >
        {!staffAction && !contentBasketAction && (
          <FontAwesomeIcon
            onClick={toggleModal}
            className="edit_btn"
            // style={{
            //   marginTop: "0.2rem",
            // }}
            icon={faEdit as IconProp}
          />
        )}
        {deactivateButton ? (
          <>
            <label
              className={`toggle-wrapper ${userStatus === true && "active"}`}
              onClick={handleShow}
            >
              <span className={`slider ${userStatus === true && "active"}`}></span>
            </label>
          </>
        ) : (
          <>
            {disableDelete ? null : (
              <FontAwesomeIcon
                onClick={handleShow}
                className="trash_btn"
                // style={{
                //   marginTop: "0.2rem",
                // }}
                icon={faTrashCan as IconProp}
              />
            )}
          </>
        )}
      </td>

      <Modal
        size="lg"
        show={showEditModal}
        onHide={toggleModal}
        dialogClassName={"modal_container"}
        centered
      >
        <Modal.Header className="modalTitle" closeButton>
          <Modal.Title>{t("update_form")}</Modal.Title>
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
        contentBasketAction={contentBasketAction}
        show={showDeleteModal}
        handleClose={handleClose}
        id={data?.id}
        ID={ID}
        name={data?.name || data?.firstName}
        handleDelete={handleDelete}
      />
    </>
  );
}
