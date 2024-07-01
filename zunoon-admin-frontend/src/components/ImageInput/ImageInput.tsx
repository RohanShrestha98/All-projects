import React from "react";
import * as styles from "./ImageInput.module.scss";
import Button from "../Button/Button";
import { withTranslation } from "react-i18next";
import Loader from "../Loader/Loader";

type RefType = HTMLInputElement | null;
type PropsType = {
  image?: any;
  setImage?: Function;
  isUploading?: boolean;
  buttonDisable?: boolean;
  editform?: boolean;
  question?: boolean;
  staffForm?: React.FC | any;
  edit?: boolean;
  onChange?: Function;
  rest?: any;
  t: Function;
};

const ImageInput = React.forwardRef<RefType, PropsType>(
  (
    {
      // validateImage,
      image,
      setImage,
      isUploading,
      editform,
      question,
      staffForm,
      edit = false,
      onChange,
      t,
      buttonDisable,
      ...rest
    },
    ref,
  ) => {
    const handleFile = e => {
      console.log("e.target.files[0]", e.target.files[0])
      if (e.target.files && e.target.files[0]) {
        setImage(URL.createObjectURL(e.target.files[0]));
      }
    };

    const fileSelect = e => {
      const imageElement: HTMLElement | null = document.getElementById("staff_img");
      if (imageElement) imageElement.click();
    };

    return (
      <div>
        {
          !question ? <div className={styles.inputContainer}>
            <div className={styles.imageContainer}>
              {image ? (
                <img id="staff-image" src={image} alt="staff" /> //remove staff form here
              ) : staffForm ? (
                <i className="fas fa-user-alt"></i>
              ) : (
                <i className="far fa-image"></i>
              )}
            </div>
            <div className={styles.inputBtnWrapper}>
              <input
                id="staff_img"
                hidden
                type="file"
                ref={ref}
                accept="image/jpeg, image/jpg, image/png"
                {...rest}
                onChange={e => {
                  onChange(e);
                  handleFile(e);
                }}
              />
              <Button
                type="button"
                color="success"
                buttonName={
                  isUploading ? (
                    <Loader />
                  ) : editform ? (
                    staffForm ? (
                      t("update_photo")
                    ) : (
                      t("update_image")
                    )
                  ) : staffForm ? (
                    t("select_photo")
                  ) : (
                    t("select_image")
                  )
                }
                clickHandler={fileSelect}
                disabled={isUploading || buttonDisable}
              />
            </div>
          </div> : <p>
            <input type="file"
              ref={ref}
              accept="image/jpeg, image/jpg, image/png"
              {...rest}
              onChange={e => {
                onChange(e);
                handleFile(e);
              }} />
          </p>
        }

      </div>
    );
  },
);

export default withTranslation()(ImageInput);
