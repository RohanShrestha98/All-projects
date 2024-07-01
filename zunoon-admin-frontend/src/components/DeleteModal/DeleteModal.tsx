import { Modal } from "react-bootstrap";
import React from "react";
import Button from "../Button/Button";
import "./DeleteModal.scss";
import { withTranslation } from "react-i18next";
import { DeleteModalType } from "../../@types/modal";

const DeleteModal: React.FC<DeleteModalType> = ({
  id,
  ID,
  name,
  show,
  handleClose,
  handleDelete,
  isDeactivate,
  isConfirm,
  contentBasketAction,
  t,
}) => {
  const confirmDelete = () => {
    contentBasketAction
      ? handleDelete({
          basketID: ID,
          contentID: [id],
        })
      : handleDelete(id);
    handleClose();
  };

  return (
    <>
      <Modal className="modal-box" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isDeactivate
              ? `${t("toggle_status")}`
              : isConfirm
              ? `${t("confirm")}`
              : `${t("delete")}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isDeactivate
            ? `${t("toggle_confirmation")} ${name}?`
            : isConfirm
            ? `${t("Are you sure you want to change the status")} ?`
            : `${t("delete_confirmation")} ${name}?`}
        </Modal.Body>
        <Modal.Footer>
          <div className="button_wrapper">
            <div className="btn_yes">
              <Button
                type="button"
                color={`${isConfirm ? "success" : "danger"}`}
                buttonName={t("yes")}
                clickHandler={confirmDelete}
              />
            </div>
            <div className="btn_no">
              <Button
                type="button"
                color={`${isConfirm ? "danger" : "success"}`}
                buttonName={"No"}
                clickHandler={handleClose}
              />
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default withTranslation()(DeleteModal);
