import React from "react";
import Modal from "react-bootstrap/Modal";
import { withTranslation } from "react-i18next";
import Button from "../../../components/Button/Button";

type PropsType = {
  title?: string;
  show?: boolean;
  handleClose: () => void;
  handleClickSubmit: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  t: any;
};

const SubmitModal = ({ handleClose, show, handleClickSubmit, t, title }: PropsType) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      {/* <Modal.Body>{t("open_modal_confirm_submit")}</Modal.Body> */}
      <Modal.Body>{t("open_modal_confirm_create_school")}</Modal.Body>
      <Modal.Footer>
        <div className="d-flex gap-2">
          <div>
            <Button
              buttonName={t("close")}
              disabled={false}
              type="button"
              color="danger"
              clickHandler={handleClose}
            />
          </div>
          <div className="pull-right">
            <Button
              buttonName={t("confirm_submit")}
              disabled={false}
              type="submit"
              color="info"
              clickHandler={handleClickSubmit}
            />
          </div>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default withTranslation()(SubmitModal);
