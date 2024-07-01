import { SubmitHandler, useForm } from 'react-hook-form';
import * as Dialog from '@radix-ui/react-dialog';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import SubHeading from '../../components/Subheading';
import InputField from '../../ui/Inputfield';
import { z } from 'zod';

import { QuantityUnitResponseType } from '../../types';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuantityUnitMasterMutation } from '../../hooks/useQuantityUnitMutation';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

interface Props {
  data?: QuantityUnitResponseType;
  triggerClassName: string;

  isEdit?: boolean;

  onSuccess?: () => void;
  children: React.ReactNode;
  t: TFunction;
}

function QuantityUnitFormModal({
  data,
  triggerClassName,

  children,
  onSuccess,
  isEdit = false,
  t,
}: Props) {
  const [open, setOpen] = useState(false);

  const quantityUnitMutation = useQuantityUnitMasterMutation();

  const validationSchema = z.object({
    idx: z.string().optional(),
    partner_code: z.string().nonempty(t('partnerCodeRequired')),
    product_code: z.string().nonempty(t('productCodeRequired')),
    product_name: z.string().optional(),
    alternate_quantity_unit: z
      .string()
      .nonempty(t('alternateQuantityUnitRequired')),
    product_code_by_unit: z.string().optional(),
    unit_quantity: z.string().optional(),
    cargo_classification: z.string().optional(),
    cargo_category_name: z.string().optional(),
    order_classification: z.string().optional(),
    order_packaging_category: z.string().optional(),
    procurement_classification: z.string().optional(),
    purchase_cargo_classification: z.string().optional(),
    conversion_factor: z.string().nonempty(t('conversionFactorRequired')),
  });

  type ValidationSchema = z.infer<typeof validationSchema>;

  const closeHandler = () => {
    setOpen(false);
    reset();
    onSuccess && onSuccess();
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(validationSchema),
    defaultValues: isEdit
      ? {
        idx: data?.idx,
        partner_code: data?.partner_code,
        product_code: data?.product_code,
        product_name: data?.product_name,
        alternate_quantity_unit: data?.alternate_quantity_unit,
        product_code_by_unit: data?.product_code_by_unit,
        unit_quantity: data?.unit_quantity,
        cargo_classification: data?.cargo_classification,
        cargo_category_name: data?.cargo_category_name,
        order_classification: data?.order_classification,
        order_packaging_category: data?.order_packaging_category,
        procurement_classification: data?.procurement_classification,
        purchase_cargo_classification: data?.purchase_cargo_classification,
        conversion_factor: data?.conversion_factor,
      }
      : {},
  });

  const createHandler: SubmitHandler<ValidationSchema> = data => {
    quantityUnitMutation.mutateAsync(['post', '/quantity-unit/', data], {
      onSuccess: () => {
        closeHandler();
        toast.success('quantityUnitAddedSuccessfully');
      },
      onError: (err: AxiosError<any>) => {
        if (err?.response?.status === 400) {
        } else toast.error(t('somethingWentWrong'));
      },
    });
  };

  const updateHandler: SubmitHandler<ValidationSchema> = data => {
    quantityUnitMutation.mutateAsync(['patch', `${data.idx}/`, data], {
      onSuccess: () => {
        closeHandler();
        toast.success(t('quantityUnitUpdated'));
      },
      onError: (err: AxiosError<any>) => {
        if (err?.response?.status === 400) {
        } else toast.error(t('somethingWentWrong'));
      },
    });
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={triggerClassName}>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="modal-content px-8 py-6">
          <form
            className="space-y-8"
            onSubmit={handleSubmit(!isEdit ? createHandler : updateHandler)}
          >
            <Dialog.Title>
              <SubHeading
                title={
                  isEdit ? t('updateQunaitytUnit') : t('createQunaitytUnit')
                }
              />
            </Dialog.Title>
            <div className="space-y-6">
              <div className="flex gap-3">
                <InputField
                  label={t('partnerCode')}
                  placeholder={t('partnerCode')}
                  name="partner_code"
                  register={register}
                  errorMessage={errors.partner_code?.message}
                />
                <InputField
                  label={t('productCode')}
                  placeholder={t('productCode')}
                  register={register}
                  name="product_code"
                  errorMessage={errors.product_code?.message}
                />
              </div>
              <div className="flex gap-3">
                <InputField
                  label={t('productName')}
                  placeholder={t('productName')}
                  name="product_name"
                  register={register}
                  errorMessage={errors.product_name?.message}
                />
                <InputField
                  label={t('alternateQuantityUnit')}
                  placeholder={t('alternateQuantityUnit')}
                  register={register}
                  name="alternate_quantity_unit"
                  errorMessage={errors.alternate_quantity_unit?.message}
                />
              </div>
              <div className="flex gap-3">
                <InputField
                  label={t('productCodeByUnit')}
                  placeholder={t('productCodeByUnit')}
                  name="product_code_by_unit"
                  register={register}
                  errorMessage={errors.product_code_by_unit?.message}
                />
                <InputField
                  label={t('unitQuantity')}
                  placeholder={t('unitQuantity')}
                  register={register}
                  name="unit_quantity"
                  errorMessage={errors.unit_quantity?.message}
                />
              </div>
              <div className="flex gap-3">
                <InputField
                  label={t('cargoClassification')}
                  placeholder={t('cargoClassification')}
                  name="cargo_classification"
                  register={register}
                  errorMessage={errors.cargo_classification?.message}
                />
                <InputField
                  label={t('cargoCategoryName')}
                  placeholder={t('cargoCategoryName')}
                  register={register}
                  name="cargo_category_name"
                  errorMessage={errors.cargo_category_name?.message}
                />
              </div>
              <div className="flex gap-3">
                <InputField
                  label={t('orderClassification')}
                  placeholder={t('orderClassification')}
                  name="order_classification"
                  register={register}
                  errorMessage={errors.order_classification?.message}
                />
                <InputField
                  label={t('orderPackagingCategory')}
                  placeholder={t('orderPackagingCategory')}
                  register={register}
                  name="order_packaging_category"
                  errorMessage={errors.order_packaging_category?.message}
                />
              </div>
              <div className="flex gap-3">
                <InputField
                  label={t('procurementClassification')}
                  placeholder={t('procurementClassification')}
                  name="procurement_classification"
                  register={register}
                  errorMessage={errors.procurement_classification?.message}
                />
                <InputField
                  label={t('purchaseCargoClassification')}
                  placeholder={t('purchaseCargoClassification')}
                  register={register}
                  name="purchase_cargo_classification"
                  errorMessage={errors.purchase_cargo_classification?.message}
                />
              </div>
              <div className="flex gap-3">
                <InputField
                  label={t('conversionFactor')}
                  placeholder={t('conversionFactor')}
                  name="conversion_factor"
                  register={register}
                  errorMessage={errors.conversion_factor?.message}
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Dialog.Close
                className="bg-danger text-white px-6 h-9 rounded border border-danger hover:bg-white hover:text-danger"
                onClick={() => closeHandler()}
              >
                {t('cancel')}
              </Dialog.Close>
              <button
                type="submit"
                className="bg-primary text-white px-6  h-9 rounded border border-primary hover:bg-white hover:text-primary"
              >
                {!isEdit ? t('create') : t('update')}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default withTranslation()(QuantityUnitFormModal);
