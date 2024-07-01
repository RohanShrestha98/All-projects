import { useForm } from 'react-hook-form';
import * as Dialog from '@radix-ui/react-dialog';
import { Row } from '@tanstack/react-table';
import SubHeading from '../../components/Subheading';
import InputField from '../../ui/Inputfield';
import { ItemResponseType } from '../../hooks/UseItemQueryData';
import { useBusinessPartnerData } from '../../hooks/UseBusinessPartnerQueryData';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { useState } from 'react';
import { useItemOpsMutation } from '../../hooks/UseItemMutatedData';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';

interface Props {
  data?: Row<ItemResponseType> | undefined;
  children: React.ReactNode;
  triggerClassName?: string;
  isEdit?: boolean;
  t: TFunction;
}

function ProductItemformmodal({
  data,
  children,
  triggerClassName = '',
  isEdit = false,
  t,
}: Props) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const itemMutation = useItemOpsMutation();

  const { register, handleSubmit, setValue, reset } = useForm<ItemResponseType>(
    isEdit
      ? {
        defaultValues: {
          idx: data?.idx,
          code: data?.code,
          text: data?.text,
          sort_key: data?.sort_key,
          supplier_code: data?.supplier_code,
          unit: data?.unit,
          variety: data?.variety,
          production_area: data?.production_area,
          partner: data?.partner,
          partner_product_code: data?.partner_product_code,
          size: data?.size,
        },
      }
      : {}
  );

  const { data: businessPartnerList, isLoading: isLoadingBusinessPartner } =
    useBusinessPartnerData({});

  const closeHandler = () => {
    setOpen(false);
    reset();
    setError(null);
  };

  const createHandler = (data: any) => {
    itemMutation.mutateAsync(['post', '', data], {
      onSuccess: () => {
        closeHandler();
        toast.success(t('productAddedSuccessfully'));
      },
      onError: (err: AxiosError) => {
        if (err?.response?.status === 400) setError(err?.response?.data);
        else toast.error(t('somethingWentWrong'));
      },
    });
  };

  const updateHandler = (data: any) => {
    const patchData = {
      idx: data?.idx,
      code: data?.code,
      text: data?.text,
      sort_key: data?.sort_key,
      supplier_code: data?.supplier_code,
      unit: data?.unit,
      variety: data?.variety,
      production_area: data?.production_area,
      partner: data?.partner,
      partner_product_code: data?.partner?.bp_item_code,
      size: data?.size,
    };

    itemMutation.mutateAsync(['patch', `${patchData.idx}/`, patchData], {
      onSuccess: () => {
        closeHandler();
        toast.success(t('productDetailsUpdatedSuccessfully'));
      },
      onError: (err: AxiosError) => {
        if (err?.response?.status === 400) setError(err?.response?.data);
        else toast.error(t('somethingWentWrong'));
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
                title={isEdit ? t('updateProduct') : t('createProduct')}
              />
            </Dialog.Title>
            <article className="flex gap-6">
              <div className="basis-1/2 space-y-6">
                <InputField
                  label={t('code')}
                  placeholder={t('enterCode')}
                  name="code"
                  register={register}
                  errorMessage={error?.code?.[0]}
                />

                <InputField
                  label={t('sortKey')}
                  placeholder={t('enterSortKey')}
                  name="sort_key"
                  type="number"
                  register={register}
                  errorMessage={error?.sort_key?.[0]}
                />
                <InputField
                  label={t('unit')}
                  placeholder={t('enterUnit')}
                  name="unit"
                  type="select"
                  options={['kg'].map(each => ({
                    value: each,
                    label: t(each),
                  }))}
                  defaultValue={data?.unit}
                  register={register}
                  disabled={isEdit}
                  setValue={value => setValue('unit', value.value)}
                  errorMessage={error?.unit?.[0]}
                />
                <InputField
                  label={t('productionArea')}
                  placeholder={t('enterProductionArea')}
                  name="production_area"
                  register={register}
                  errorMessage={error?.production_area?.[0]}
                />
                <InputField
                  label={t('partnerProductCode')}
                  placeholder={t('enterPartnerProductCode')}
                  name="partner_product_code"
                  register={register}
                  errorMessage={error?.partner_product_code?.[0]}
                />
              </div>
              <div className="basis-1/2 space-y-6">
                <InputField
                  label={t('text')}
                  placeholder={t('enterText')}
                  register={register}
                  name="text"
                  errorMessage={error?.text?.[0]}
                />
                <InputField
                  label={t('supplierCode')}
                  placeholder={t('enterSupplierCode')}
                  name="supplier_code"
                  register={register}
                  errorMessage={error?.supplier_code?.[0]}
                />
                <InputField
                  label={t('variety')}
                  placeholder={t('enterVariety')}
                  name="variety"
                  register={register}
                  errorMessage={error?.variety?.[0]}
                />
                <InputField
                  label={t('partner')}
                  placeholder={t('enterPartner')}
                  name="partner"
                  type="select"
                  options={
                    businessPartnerList?.results
                      ? businessPartnerList?.results.map(each => ({
                        value: each.idx,
                        label: each.text,
                      }))
                      : []
                  }
                  defaultValue={data?.partner}
                  register={register}
                  disabled={isEdit}
                  setValue={value => setValue('partner', value.value)}
                  errorMessage={error?.partner?.[0]}
                />
                <InputField
                  label={t('size')}
                  placeholder={t('enterSize')}
                  name="size"
                  register={register}
                  errorMessage={error?.size?.[0]}
                />
              </div>
            </article>

            <div className="flex justify-end gap-4">
              <Dialog.Close
                className="bg-danger text-white px-6 h-9 rounded border border-danger hover:bg-white hover:text-danger"
                onClick={closeHandler}
              >
                {t('cancel')}
              </Dialog.Close>
              <button
                type="submit"
                className="bg-primary text-white px-6 h-9 rounded border border-primary hover:bg-white hover:text-primary"
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

export default withTranslation()(ProductItemformmodal);
