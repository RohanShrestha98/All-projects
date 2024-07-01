import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TFunction } from 'i18next';
import * as Dialog from '@radix-ui/react-dialog';
import SubHeading from '../../components/Subheading';
import { withTranslation } from 'react-i18next';
import {
  BusinessPartnerResponseType,
  useBusinessPartnerData,
} from '../../hooks/UseBusinessPartnerQueryData';
import { useBusinessPartnerAssignMutation } from '../../hooks/UseBusinessPartnerMutatedData';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import SearchSelectField from '../../components/shared/SearchSelectField';
import { MultiValue, SingleValue } from 'react-select';
import { OptionType } from '../../components/shared/SearchSelect';
import { useSearchParams } from 'react-router-dom';

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

function UserAssignPartnerModal({
  data,
  children,
  triggerClassName = '',
  isEdit = false,
  t,
}: Props) {
  const partnerAssignMutation = useBusinessPartnerAssignMutation();
  const [searchParams] = useSearchParams();
  const userIdx = searchParams.get('user') || '';

  const [open, setOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<any>({
    label: data?.name,
    value: data?.idx,
  });
  const [selectedRole, setSelectedRole] = useState<any>(
    data?.manager?.roles?.map(item => {
      return { label: item, value: item };
    })
  );

  const { data: partnerData } = useBusinessPartnerData({
    page: 1,
    pageSize: 10,
  });

  const { handleSubmit, reset } = useForm<BusinessPartnerResponseType>();

  const closeHandler = () => {
    setOpen(false);
    reset();
  };

  const handleCreate = () => {
    const finalData = {
      user: userIdx,
      partner: selectedPartner?.value,
      roles: selectedRole.map((item: any) => {
        return item.value;
      }),
    };

    partnerAssignMutation
      .mutateAsync(['post', 'assign/', finalData])
      .then(response => {
        closeHandler();
        toast.success(t('partnerAssignedSuccessfully'));
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
      const finalData = {
        user: userIdx,
        partner: selectedPartner?.value,
        roles: selectedRole.map((item: any) => {
          return item.value;
        }),
      };

      const response = partnerAssignMutation
        .mutateAsync(['patch', `assign/`, finalData])
        .then(resp => {
          closeHandler();
          toast.success(t('partnerAssignedUpdatedSuccessfully'));
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

  const handlePartnerChange = (
    option: MultiValue<OptionType> | SingleValue<OptionType>
  ) => {
    setSelectedPartner(option);
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
                title={isEdit ? t('assignToPartner') : t('assignToPartner')}
              />
            </Dialog.Title>
            <div className="space-y-3">
              <SearchSelectField
                label={t('selectPartner')}
                value={selectedPartner}
                disabled={isEdit}
                options={partnerData?.results?.map(each => {
                  return { label: each.name, value: each.idx };
                })}
                changeHandler={option => {
                  handlePartnerChange(option);
                }}
              />

              <SearchSelectField
                label="Roles"
                value={selectedRole}
                isMulti
                options={['Partner Admin', 'Partner Staff']?.map(each => {
                  return { label: each, value: each };
                })}
                changeHandlerMultiple={option => {
                  setSelectedRole(option);
                }}
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

export default withTranslation()(UserAssignPartnerModal);
