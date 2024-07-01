import { useForm } from "react-hook-form";
import Button from "../../components/Button/Button";
import InputField from "../../components/InputField/InputField";
import { withTranslation } from "react-i18next";
import { IForm } from "../../@types/form";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const AbilityCategoryForm = ({
  data,
  editform,
  handleCancel,
  handleClickSubmit,
  handleClickUpdate,
  isSubmitting,
  setIsFormOpen,
  t,
}: IForm) => {
  const inputRef = useRef(null);
  const {
    reset,
    register,
    handleSubmit,
    watch,
    setFocus,
    formState: { errors },
  } = useForm(
    editform && {
      defaultValues: {
        id: data && data.id,
        type: data && data.type,
      },
    },
  );

  useEffect(() => {
    setFocus("type");
  }, [setFocus]);

  return (
    <form
      className="grade-form-container d-flex gap-3"
      onSubmit={handleSubmit(editform ? handleClickUpdate()(handleCancel) : handleClickSubmit)}
    >
      <div className="row-container">
        <div className="col-container">
          <div className="row-container">
            <div className="col-container">
              <div className="row-container">
                <div className="fieldAndValidate">
                  <InputField
                    ref={inputRef}
                    required
                    type="text"
                    label={t("th_ability_category")}
                    placeholder={t("placeholder_content_title")}
                    {...register("type", {
                      required: true,
                    })}
                    onKeyUp={e => {
                      e.target.value = e?.target?.value?.trimStart();
                    }}
                    watchValue={watch("type")}
                  />
                  {errors?.type?.type === "required" && <p>{t("field_required")}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
        {!editform && (
          <FontAwesomeIcon
            onClick={() => {
              setIsFormOpen(false);
            }}
            icon={faClose}
            style={{ height: "20px" }}
          />
        )}
      </div>
      <div className="row-container">
        <div className="button-wrapper">
          <Button
            type="submit"
            color="success"
            buttonName={
              isSubmitting ? `${t("submitting")}` : editform ? `${t("update")}` : `${t("add")}`
            }
            disabled={isSubmitting ? true : false}
            clickHandler={() => {}}
          />
          {!editform && (
            <Button
              type="button"
              color="danger"
              buttonName={t("clear")}
              clickHandler={() => {
                reset({
                  type: "",
                });
              }}
            />
          )}
          {editform && (
            <Button
              type="button"
              color="danger"
              buttonName={t("cancel")}
              clickHandler={() => handleCancel()}
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default withTranslation()(AbilityCategoryForm);
