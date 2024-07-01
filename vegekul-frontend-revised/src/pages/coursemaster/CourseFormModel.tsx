import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TFunction } from 'i18next';
import * as Dialog from '@radix-ui/react-dialog';
import SubHeading from '../../components/Subheading';
import InputField from '../../ui/Inputfield';
import { withTranslation } from 'react-i18next';
import { useCourseMasterMutation } from '../../hooks/UseCourseMasterMutatedData';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { CourseResponseType } from '../../types';
import SearchSelectField from '../../components/shared/SearchSelectField';

const options = [
  {
    value: 'vegekul_vegekul',
    label: "deliveredToVegekul'sCustomers&DeliveredByVegekul",
  },
  {
    value: 'vegekul_partner',
    label: "deliveredToVegekul'sCustomers&DeliveredbyPartner",
  },
  {
    value: 'partner_partner',
    label: "deliveredToPartner'sCustomers&DeliveredByPartner",
  },
];

interface Props {
  data?: CourseResponseType | undefined;
  children: React.ReactNode;
  triggerClassName?: string;
  isEdit?: boolean;
  dialogOpen?: boolean;

  t: TFunction;
}

function CourseFormModal({
  data,
  children,
  triggerClassName = '',
  isEdit = false,
  t,
}: Props) {
  const [, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const courseMutation = useCourseMasterMutation();

  const { register, handleSubmit, reset, setValue } =
    useForm<CourseResponseType>(
      isEdit
        ? {
          defaultValues: {
            idx: data?.idx,
            code: data?.code,
            name: data?.name,
            partner_code: data?.partner_code,
            type_of_delivery: data?.type_of_delivery,
            // allocation_partner_code: data?.allocation_partner_code,
          },
        }
        : {}
    );

  const handleCreate = (data: any) => {
    courseMutation
      .mutateAsync(['post', '', data])
      .then(() => {
        closeHandler();
        toast.success(t('courseAddedSuccessfully'));
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
        code: data.code,
        idx: data.idx,
        name: data.name,
        partner_code: data.partner_code,
        type_of_delivery: data.type_of_delivery,
      };
      const response = courseMutation
        .mutateAsync(['patch', `${patchData.idx}/`, patchData])
        .then(() => {
          closeHandler();
          toast.success(t('courseDetailsUpdatedSuccessfully'));
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

  const translatedOptions = options.map(option => ({
    ...option,
    label: t(option.label),
  }));
  const closeHandler = () => {
    setOpen(false);
    reset();
    setError(null);
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
                title={isEdit ? t('updateCourse') : t('createCourse')}
              />
            </Dialog.Title>
            <article className="flex flex-col gap-4">
              <div className=" space-y-4">
                <InputField
                  label={t('courseCode')}
                  placeholder={t('courseCode')}
                  name="code"
                  register={register}
                />

                <InputField
                  label={t('partnerCode')}
                  placeholder={t('partnerCode')}
                  name="partner_code"
                  register={register}
                />
              </div>
            </article>
            <InputField
              label={t('courseName')}
              placeholder={t('courseName')}
              name="name"
              register={register}
            />
            {/* <InputField
              label={t('allocationPartnerCode')}
              placeholder={t('allocationPartnerCode')}
              name="allocation_partner_code"
              register={register}
            /> */}

            <div className="flex flex-col gap-y-2">
              <label className="font-medium text-grayTextDark peer-hover:text-blackText peer-focus:text-primary">
                {t('typeOfDelivery')}
              </label>
              <SearchSelectField
                label=""
                value={translatedOptions?.find(
                  item => item.value === data?.type_of_delivery
                )}
                changeHandler={option => {
                  setValue('type_of_delivery', option?.value.toString() ?? '');
                }}
                options={translatedOptions}
                placeholder={t('selectAnItem')}
                {...register('type_of_delivery')}
              />
            </div>

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

export default withTranslation()(CourseFormModal);
