import React from 'react';
import { useForm } from 'react-hook-form';
import { TFunction } from 'i18next';
import * as Dialog from '@radix-ui/react-dialog';
import SubHeading from '../../components/Subheading';
import InputField from '../../ui/Inputfield';
import { withTranslation } from 'react-i18next';
import { useCourseData } from '../../hooks/UseCourseMasterQuery';

import { CustomerMasterResponseType } from '../../hooks/UseCustomerMasterQueryData';
import toast from 'react-hot-toast';
import { useCustomerMasterMutation } from '../../hooks/UseCustomerMasterMutatedData';

interface Props {
  data?: CustomerMasterResponseType | undefined;
  children: React.ReactNode;
  triggerClassName?: string;
  isEdit?: boolean;
  error?: any;

  t: TFunction;
}

function CustomerMasterFormModel({
  data,
  children,
  triggerClassName = '',
  isEdit = false,

  t,
}: Props) {
  const customerMutation = useCustomerMasterMutation();
  const { register, handleSubmit, setValue } = useForm<CustomerType>(
    isEdit
      ? {
        defaultValues: {
          idx: data?.idx,
          code: data?.code,
          name: data?.name,
          address: data?.address,
          course: data?.course,
          telephone: data?.telephone,
          billing_code: data?.billing_code,
          fax: data?.fax,
        },
      }
      : {}
  );

  const handleCreate = async (data: CustomerType) => {
    const response = await customerMutation.mutateAsync(data);
    if (response) {
      toast.success(t('customerCreatedSuccessfully'));
    }
  };

  const handleUpdate = async (data: CustomerType) => {
    const response = await customerMutation.mutateAsync(data);
    if (response) {
      toast.success(t('customerUpdatedSuccessfully'));
    }
  };

  const { data: courseMasterList, isLoading: isLoadingCourseMaster } =
    useCourseData({});
  return (
    <Dialog.Root>
      <Dialog.Trigger className={triggerClassName}>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="modal-content px-8 py-6">
          <form
            className="space-y-8"
            onSubmit={handleSubmit(!isEdit ? handleCreate! : handleUpdate!)}
          >
            <Dialog.Title>
              <SubHeading
                title={isEdit ? t('updateCustomer') : t('createCustomer')}
              />
            </Dialog.Title>
            <article className="flex gap-6">
              <div className="basis-1/2 space-y-6">
                <InputField
                  label={t('code')}
                  placeholder={t('customerCode')}
                  name="code"
                  register={register}
                />
                <InputField
                  label={t('course')}
                  placeholder={t('enterCourse')}
                  name="course"
                  type="select"
                  options={
                    courseMasterList?.results
                      ? courseMasterList?.results.map(each => ({
                        value: each.idx,
                        label: each.text,
                      }))
                      : []
                  }
                  defaultValue={data?.course}
                  register={register}
                  disabled={isEdit}
                  setValue={value => setValue('course', value.value)}
                />
                <InputField
                  label={t('address')}
                  placeholder={t('address')}
                  name="address"
                  register={register}
                />
                <InputField
                  label={t('telephoneNumber')}
                  placeholder={t('telephoneNumber')}
                  name="telephone"
                  register={register}
                />
              </div>
              <div className="basis-1/2 space-y-6">
                <InputField
                  label={t('customerName')}
                  placeholder={t('customerName')}
                  name="customer_name"
                  register={register}
                />

                <InputField
                  label={t('billingCode')}
                  placeholder={t('billingCode')}
                  name="billing_code"
                  register={register}
                />
                <InputField
                  label={t('fax')}
                  placeholder={t('fax')}
                  name="fax"
                  register={register}
                />
              </div>
            </article>

            <div className="flex justify-end gap-4">
              <Dialog.Close className="bg-danger text-white px-6 h-9 rounded border border-danger hover:bg-white hover:text-danger">
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

export default withTranslation()(CustomerMasterFormModel);
