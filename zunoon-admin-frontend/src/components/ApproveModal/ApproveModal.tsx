import { Modal } from "react-bootstrap";
import Button from "../Button/Button";
import "./ApproveModal.scss";
import { withTranslation } from "react-i18next";

const DeleteModal = ({ name, show, handleClose, isApproved, handleApprove, t }) => {
  return (
    <>
      <Modal className="modal-box" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("confirm")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`${!isApproved ? t("approve_confirmation") : t("unapprove_confirmation")} ${name} ?`}</Modal.Body>
        <Modal.Footer>
          <div className="button_wrapper">
            <div className="btn_yes">
              <Button
                type="button"
                color="success"
                buttonName={isApproved ? t("unapprove") : t("approve")}
                clickHandler={handleApprove}
              />
            </div>
            <div className="btn_no">
              <Button
                type="button"
                color="danger"
                buttonName={t("cancel")}
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
