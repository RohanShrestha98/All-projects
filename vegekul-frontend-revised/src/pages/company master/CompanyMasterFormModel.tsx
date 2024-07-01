import React from 'react';
import { useForm } from 'react-hook-form';
import { TFunction } from 'i18next';
import { Row } from '@tanstack/react-table';
import * as Dialog from '@radix-ui/react-dialog';
import SubHeading from '../../components/Subheading';
import InputField from '../../ui/Inputfield';
import { withTranslation } from 'react-i18next';
import { useCourseData } from '../../hooks/UseCourseMasterQuery';

export interface CompanyType {
  idx: string;
  code: string;
  name: string;
  post_number: string;
  prefacture: string;
  city: string;
  street: string;
  telephone: string;
  fax: string;
}

interface Props {
  data?: PartnerType | undefined;
  children: React.ReactNode;
  triggerClassName?: string;
  isEdit?: boolean;
  error: any;
  handleCreate?: (d: any) => void;
  handleUpdate: (d: any) => void;
  t: TFunction;
}

function CompanyMasterFormModel({
  data,
  children,
  triggerClassName = '',
  isEdit = false,
  handleCreate,
  handleUpdate,
  t,
}: Props) {
  const { register, handleSubmit, setValue } = useForm<PartnerType>(
    isEdit
      ? {
        defaultValues: {
          idx: data?.idx,
          code: data?.code,
          name: data?.name,
          post_number: data?.post_number,
          prefacture: data?.prefacture,
          city: data?.city,
          street: data?.street,
          telephone: data?.telephone,
          fax: data?.fax,
        },
      }
      : {}
  );

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
                title={isEdit ? t('partnerInformation') : t('createPartner')}
              />
            </Dialog.Title>
            <article className="flex gap-6">
              <div className="basis-1/2 space-y-6">
                <InputField
                  label={t('partnerCode')}
                  placeholder={t('partnerCode')}
                  name="code"
                  register={register}
                />
                <InputField
                  label={t('name')}
                  placeholder={t('name')}
                  name="name"
                  register={register}
                />
                <InputField
                  label={t('postNumber')}
                  placeholder={t('postNumber')}
                  name="post_number"
                  register={register}
                />
                <InputField
                  label={t('city')}
                  placeholder={t('city')}
                  name="city"
                  register={register}
                />
              </div>
              <div className="basis-1/2 space-y-6">
                <InputField
                  label={t('prefacture')}
                  placeholder={t('prefacture')}
                  name="prefacture"
                  register={register}
                />
                <InputField
                  label={t('street')}
                  placeholder={t('street')}
                  name="street"
                  register={register}
                />
                <InputField
                  label={t('faxNumber')}
                  placeholder={t('faxNumber')}
                  name="fax_number"
                  register={register}
                />
                <InputField
                  label={t('telephone')}
                  placeholder={t('telephone')}
                  name="telephone"
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
export default withTranslation()(CompanyMasterFormModel);
