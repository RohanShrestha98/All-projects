import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TFunction } from 'i18next';

import * as Dialog from '@radix-ui/react-dialog';
import SubHeading from '../../components/Subheading';
import InputField from '../../ui/Inputfield';
import { withTranslation } from 'react-i18next';

import { BusinessPartnerResponseType } from '../../hooks/UseBusinessPartnerQueryData';
import { useBusinessPartnerMutation } from '../../hooks/UseBusinessPartnerMutatedData';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export interface PartnerType {
  idx: string;
  code: string;
  name: string;
  address: string;
  telephone: string;
  fax: string;
}

interface Props {
  data?: BusinessPartnerResponseType | undefined;
  children: React.ReactNode;
  triggerClassName?: string;
  isEdit?: boolean;

  t: TFunction;
  dialogOpen?: boolean;
}

function PartnerMasterFormModel({
  data,
  children,
  triggerClassName = '',
  isEdit = false,

  t,
}: Props) {
  const partnerMutation = useBusinessPartnerMutation();

  const [open, setOpen] = useState(false);

  const { register, handleSubmit, setValue, reset } =
    useForm<BusinessPartnerResponseType>(
      isEdit
        ? {
          defaultValues: {
            idx: data?.idx,
            code: data?.code,
            name: data?.name,
            address: data?.address,
            telephone: data?.telephone,
            fax: data?.fax,
          },
        }
        : {}
    );

  const closeHandler = () => {
    setOpen(false);
    reset();
  };

  const handleCreate = (data: any) => {
    partnerMutation
      .mutateAsync(['post', 'add/', data])
      .then(response => {
        closeHandler();
        toast.success(t('partnerAddedSuccessfully'));
      })
      .catch((err: AxiosError) => {
        const errData: any = err?.response?.data;
        errData &&
          Object.keys(errData).forEach(eachErr => {
            eachErr && toast.error(` ${errData[eachErr][0]}`);
          });
      });
  };

  const handleUpdate = async (data: any) => {
    try {
      const patchData = {
        idx: data?.idx,
        code: data?.code,
        name: data?.name,
        address: data?.address,
        telephone: data?.telephone,
        fax: data?.fax,
      };
      const response = partnerMutation
        .mutateAsync(['patch', `${patchData.idx}/`, patchData])
        .then(resp => {
          closeHandler();
          toast.success(t('partnerDetailsUpdatedSuccessfully'));
        })
        .catch((err: AxiosError) => {
          const errData: any = err?.response?.data;

          errData && errData.detail
            ? toast.error(errData.detail)
            : Object.keys(errData).forEach(eachErr => {
              eachErr && toast.error(`${eachErr}: ${errData[eachErr][0]}`);
            });
        });

      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.response) {
        error.response.detail.forEach((eachError: string) => {
          toast.error(eachError);
        });
      }
      return error;
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
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
                {!isEdit && (
                  <InputField
                    label={t('partnerEmail')}
                    placeholder={t('partnerEmail')}
                    name="email"
                    register={register}
                    type="email"
                  />
                )}
                <InputField
                  label={t('partnerCode')}
                  placeholder={t('partnerCode')}
                  name="code"
                  register={register}
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
                {!isEdit && (
                  <InputField
                    label={t('partnerPassword')}
                    placeholder={t('partnerPassword')}
                    name="password"
                    register={register}
                    type="password"
                  />
                )}
                <InputField
                  label={t('partnerName')}
                  placeholder={t('partnerName')}
                  name="name"
                  register={register}
                  defaultValue={'Supplier'}
                />
                <InputField
                  label={t('faxNumber')}
                  placeholder={t('faxNumber')}
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

export default withTranslation()(PartnerMasterFormModel);
