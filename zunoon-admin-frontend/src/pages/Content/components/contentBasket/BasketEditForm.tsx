import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import httpMethods from "../../../../utils/http";
import config from "../../../../config";
import toast from "../../../../utils/toast";
import Button from "../../../../components/Button/Button";
import InputField from "../../../../components/InputField/InputField";
import { useForm } from "react-hook-form";
import { IBasket } from "../../../../@types/content";

const basketApi = config.endpoints.api.basket;

const BasketEditForm = ({ showEditModal, setShowEditModal, basketData, t }) => {
  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(
    basketData && {
      defaultValues: {
        id: basketData?.ID,
        name: basketData?.name,
        description: basketData?.description ? basketData?.description : t("no_description_available"),
      },
    },
  );

  useEffect(() => {
    setValue("name", basketData.name, { shouldDirty: true });
    setValue("description", basketData.description, { shouldDirty: true });
    setValue("id", basketData.id, { shouldDirty: true });
  }, [basketData, setValue]);

  const handleClickUpdate = async (data: IBasket) => {
    try {
      const response = await httpMethods.PATCH(basketApi.update(data.id), data);
      if (response.status === 200) {
        toast.success(`  ${t("basket")}${t("updated_successfully")}`);
        setShowEditModal(false);
      } else {
        toast.error(new Error(`${t("error_in_updating")} ${t("th_basket")}`));
      }
    } catch (error) {
      toast.error(error?.response?.data?.errors?.error);
    }
  };

  return (
    <>
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("update_basket")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleClickUpdate)} className="d-flex flex-column gap-4">
            <InputField
              required
              type="text"
              label={t("basket_name")}
              placeholder={t("placeholder_basket_name")}
              {...register("name", {
                required: true,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.name?.type === "required" && <p>{t("field_required")}</p>}
            <InputField
              required
              type="text"
              label={t("basket_description")}
              placeholder={t("placeholder_basket_description")}
              {...register("description", {
                required: true,
              })}
              onKeyUp={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.description?.type === "required" && <p>{t("field_required")}</p>}
            <div className="d-flex gap-5">
              <Button
                type="button"
                color="danger"
                buttonName={t("reset")}
                clickHandler={() =>
                  reset({
                    name: "",
                    description: "",
                  })
                }
              />
              <Button
                type="submit"
                color="success"
                buttonName={t("update")}
                // disabled={isSubmitting ? true : false}
                clickHandler={() => {}}
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default withTranslation()(BasketEditForm);
