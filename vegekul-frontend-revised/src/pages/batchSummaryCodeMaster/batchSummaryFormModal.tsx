import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TFunction } from 'i18next';
import * as Dialog from '@radix-ui/react-dialog';
import SubHeading from '../../components/Subheading';
import InputField from '../../ui/Inputfield';
import { withTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { useBatchSummaryCodeMasterMutation } from '../../hooks/useBatchSummaryCodeMutation';

import { BatchSummaryMasterResponseType } from '../../hooks/useBatchSummaryQueryData';
import SearchSelectField from '../../components/shared/SearchSelectField';
import { useBusinessPartnerData } from '../../hooks/UseBusinessPartnerQueryData';

interface Props {
  data?: BatchSummaryMasterResponseType | undefined;
  children: React.ReactNode;
  triggerClassName?: string;
  isEdit?: boolean;
  dialogOpen?: boolean;
  onSuccess?: () => void;
  t: TFunction;
}

function BatchSummaryFormModal({
  data,
  children,
  triggerClassName = '',
  isEdit = false,
  onSuccess = () => null,
  t,
}: Props) {
  const [, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedPartners, setSelectedPartners] = useState<any>([]);
  const batchSummaryCodeMutation = useBatchSummaryCodeMasterMutation();

  const partnersOptions = [];
  const { data: partnerList, isLoading } = useBusinessPartnerData({
    page: 1,
    pageSize: 10,
  });
  partnerList?.results?.map(item => {
    return partnersOptions.push({
      label: item?.name,
      value: item?.name,
      code: item?.code,
    });
  });

  const { register, handleSubmit, setValue, reset } =
    useForm<BatchSummaryMasterResponseType>(
      isEdit
        ? {
          defaultValues: {
            idx: '',
            code: '',
            partner_code: '',
            name: '',
            partner_name: '',
          },
        }
        : {}
    );

  useEffect(() => {
    if (data) {
      setValue('idx', data.idx);
      setValue('code', data.code);
      setValue('partner_code', selectedPartners?.code);
      setValue('name', data.name);
      setValue('partner_name', data.partner_name);
    }
  }, [data, isEdit]);

  const handleCreate = (data: any) => {
    const finalData = {
      code: data.code,
      name: data.name,
      partner_name: selectedPartners?.value,
      partner_code: selectedPartners?.code,
    };
    batchSummaryCodeMutation
      .mutateAsync(['post', '', finalData])
      .then(() => {
        closeHandler();
        toast.success(t('batchSummaryCodeAddedSuccessfully'));
      })
      .catch((err: AxiosError) => {
        const errData: any = err?.response?.data;
        if (errData?.partner_code) {
          toast.error(t('batchSummaryCodeCannotCreate'));
        }
        if (errData?.code?.[0]) {
          toast.error(t('batchSummaryCodeMustBeUnique'));
        }
        // errData &&
        //   Object.keys(errData).forEach(eachErr => {
        //     eachErr && toast.error(`${errData[eachErr][0]}`);
        //   });
      });
  };

  const handleUpdate = async (data: any) => {
    const partner = data.partner_code;
    try {
      const patchData = {
        code: data.code,
        name: data.name,
        idx: data.idx,
        partner_name: selectedPartners?.value,
        partner_code: selectedPartners?.code,
      };
      const response = batchSummaryCodeMutation
        .mutateAsync(['patch', `${patchData.idx}/`, patchData])
        .then(() => {
          reset();
          closeHandler();
          toast.success(t('batchSummaryCodeupdatedSuccessfully'));
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
    } catch (error: AxiosError | any) {
      if (error?.response) {
        error.response.detail.forEach((eachError: string) => {
          toast.error(eachError);
        });
      }
      return error;
    }
  };

  const closeHandler = () => {
    setOpen(false);
    setError(null);
    onSuccess();
  };
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className={triggerClassName}>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />
        <Dialog.Content className="modal-content w-2/5 min-h-max px-8 py-6">
          <form
            className="space-y-6"
            onSubmit={handleSubmit(!isEdit ? handleCreate! : handleUpdate!)}
          >
            <Dialog.Title>
              <SubHeading
                title={
                  isEdit
                    ? t('updateBatchSummaryCode')
                    : t('createBatchSummaryCode')
                }
              />
            </Dialog.Title>
            <article className="flex flex-col gap-4">
              <div className=" space-y-4">
                <InputField
                  label={t('batchSummaryCodeName')}
                  placeholder={t('batchSummaryCodeName')}
                  name="name"
                  register={register}
                />
                <InputField
                  label={t('batchSummaryCode')}
                  placeholder={t('batchSummaryCode')}
                  name="code"
                  register={register}
                />
                <SearchSelectField
                  label={t('partnerName')}
                  defaultValue={data?.partner_name}
                  value={selectedPartners}
                  required
                  className="z-10"
                  options={partnersOptions}
                  changeHandler={option => {
                    setSelectedPartners(option);
                  }}
                // errorMessage={errors.roles?.message}
                />
                <InputField
                  label={t('partnerCode')}
                  placeholder={t('partnerCode')}
                  name="partner_code"
                  disabled
                  value={selectedPartners?.code}
                  register={register}
                />

                {/* <SearchSelectField
                  label={t('selectPartner')}
                  value={selectedPartner}
                  options={Partners}
                  changeHandler={option => {
                    setSelectedPartner(option);
                  }}
                /> */}
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

export default withTranslation()(BatchSummaryFormModal);
