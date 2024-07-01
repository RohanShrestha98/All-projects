import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TFunction } from 'i18next';
import * as Dialog from '@radix-ui/react-dialog';
import SubHeading from '../../components/Subheading';
import InputField from '../../ui/Inputfield';
import { withTranslation } from 'react-i18next';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import SearchSelectField from '../../components/shared/SearchSelectField';
import { useParams } from 'react-router-dom';
import { useConversionFactorMutation } from '../../hooks/useConversionFactorMutation';
import { ConversionFactorResponseType } from '../../hooks/useConversionFactorQuery';

const QuantityUnits = [
  { label: 'Cases', value: 'cases' },
  { label: 'Piece', value: 'piece' },
  { label: 'Kg', value: 'kg' },
];

interface Props {
  data?: ConversionFactorResponseType | undefined;
  children: React.ReactNode;
  triggerClassName?: string;
  isEdit?: boolean;
  dialogOpen?: boolean;
  onSuccess?: () => void;
  t: TFunction;
}

function ConversionRatesFormModal({
  data,
  children,
  triggerClassName = '',
  isEdit = false,
  onSuccess = () => null,
  t,
}: Props) {
  const [, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const { code } = useParams<{ code: string }>();

  const [selectedQuantityUnit, setSelectedQuantityUnit] = useState<any>({
    label: data?.quantity_unit,
    value: data?.quantity_unit,
  });

  const conversionFactorMutation = useConversionFactorMutation();

  const { register, handleSubmit, setValue, reset } =
    useForm<ConversionFactorResponseType>(
      isEdit
        ? {
          defaultValues: {
            idx: data?.idx,
            quantity_unit: '',
            conversion_factor: '',
          },
        }
        : {}
    );

  useEffect(() => {
    if (data) {
      setValue('conversion_factor', data.conversion_factor);
      setValue('quantity_unit', data.quantity_unit);
    }
  }, [data, isEdit]);

  const handleCreate = (data: any) => {
    const finalData = {
      product_code: code,
      quantity_unit: selectedQuantityUnit.value,
      conversion_factor: data?.conversion_factor,
    };
    conversionFactorMutation
      .mutateAsync(['post', '', finalData])
      .then(() => {
        closeHandler();
        toast.success(t('conversionFactorAddedSuccessfully'));
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
        idx: data.idx,
        product_code: code,
        quantity_unit: selectedQuantityUnit.value,
        conversion_factor: data?.conversion_factor,
      };
      const response = conversionFactorMutation
        .mutateAsync(['patch', `${patchData.idx}/`, patchData])
        .then(() => {
          reset();
          closeHandler();
          toast.success(t('conversionRateUpdatedSuccessfully'));
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
                  isEdit ? t('updateConversionRate') : t('createConversionRate')
                }
              />
            </Dialog.Title>
            <article className="flex flex-col gap-4">
              <div className=" space-y-4">
                <SearchSelectField
                  label={t('selectQuantityUnit')}
                  placeholder={t('selectQuantityUnit')}
                  value={selectedQuantityUnit}
                  options={QuantityUnits}
                  changeHandler={option => {
                    setSelectedQuantityUnit(option);
                  }}
                />
                <InputField
                  label={t('conversionFactor')}
                  placeholder={t('conversionFactor')}
                  name="conversion_factor"
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

export default withTranslation()(ConversionRatesFormModal);
