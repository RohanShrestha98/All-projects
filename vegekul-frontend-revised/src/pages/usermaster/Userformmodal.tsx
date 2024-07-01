import React, { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as Dialog from '@radix-ui/react-dialog';
import SubHeading from '../../components/Subheading';
import InputField from '../../ui/Inputfield';
import './usermaster.scss';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { useUserOpsMutation } from '../../hooks/UseUserMutated';
import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';
import { UserResponseType } from '../../types';
import { useApp } from '../../context/AppContext';
import SearchSelectField from '../../components/shared/SearchSelectField';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export interface UserType {
  idx: string;
  email?: string;
  first_name: string;
  last_name: string;
  roles?: string[];
  oldPassword?: string;
  newPassword1?: string;
  newPassword2?: string;
}

interface Props {
  data?: UserResponseType | undefined;
  children: React.ReactNode;
  triggerClassName?: string;
  isEdit?: boolean;
  onSuccess?: () => null;
  dialogOpen?: boolean;
  t: TFunction;
}

function UserFormModal({
  data,
  children,
  triggerClassName = '',
  isEdit = false,
  onSuccess,
  t,
}: Props) {
  // const [error, setError] = useState<UserFormErrorType | null>({});
  const [open, setOpen] = useState(false);
  const { isPartnerDomain } = useApp();

  const [selectedRoles, setSelectedRoles] = useState<any>(
    data?.roles?.map((item: any) => {
      return { label: item, value: item };
    }) || []
  );

  const validationSchema = z.object({
    idx: z.string().optional(),
    first_name: z.string().trim().min(1, 'First name is required').max(255),
    last_name: z.string().trim().min(1, 'Last name is required').max(255),
    email: z.string().trim().email('Invalid email').max(255),
    password: isEdit
      ? z.string().optional()
      : z.string().trim().min(8, 'Password must be 8 characters long'),
    roles: !selectedRoles.length
      ? z.array(z.string())
      : z.array(z.string()).optional(),
  });
  const roles = [
    { value: 'Super Dashboard Admin', label: t('superDashboardAdmin') },
    { value: 'Super Dashboard Staff', label: t('superDashboardStaff') },
    { value: 'Partner Admin', label: t('partnerAdmin') },
    { value: 'Partner Staff', label: t('partnerStaff') },
  ];

  const PartnerRoles = [
    { value: 'Partner Admin', label: t('partnerAdmin') },
    { value: 'Partner Staff', label: t('partnerStaff') },
  ];

  type ValidationSchema = z.infer<typeof validationSchema>;

  const userMutation = useUserOpsMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
    defaultValues: isEdit
      ? {
        idx: data?.idx,
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        roles: data?.roles || [],
      }
      : {},
  });

  const closeHandler = () => {
    setOpen(false);
    reset();
    onSuccess && onSuccess();
  };

  const userCreateUrl = useMemo(() => {
    return isPartnerDomain ? 'business-partner-user/' : 'user/create/';
  }, [isPartnerDomain]);

  const createHandler: SubmitHandler<ValidationSchema> = data => {
    const finalData = {
      ...data,
      roles: selectedRoles?.map((item: any) => item.value),
    };
    userMutation.mutateAsync(['post', userCreateUrl, finalData], {
      onSuccess: () => {
        closeHandler();
        toast.success(t('userAddedSuccessfully'));
      },
      onError: (err: AxiosError<any>) => {
        if (err?.response?.status === 400) {
          setError('email', { message: err?.response?.data?.email });
        } else toast.error(t('somethingWentWrong'));
      },
    });
  };

  const updateHandler: SubmitHandler<ValidationSchema> = data => {
    if (selectedRoles?.length === 0)
      return setError('roles', { message: 'Roles is required' });

    const patchData = {
      first_name: data.first_name,
      idx: data.idx,
      last_name: data.last_name,
      roles: selectedRoles?.map((item: any) => item.value),
    };
    userMutation.mutateAsync(
      [
        'patch',
        isPartnerDomain
          ? `business-partner-user/${data?.idx}/`
          : `user/${data.idx}/`,
        patchData,
      ],
      {
        onSuccess: () => {
          closeHandler();
          toast.success(t('userDetailsUpdatedSuccessfully'));
        },
        onError: (err: AxiosError<any>) => {
          if (err?.response?.status === 400)
            setError('email', { message: err?.response?.data?.email });
          else toast.error(t('somethingWentWrong'));
        },
      }
    );
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
              <SubHeading title={isEdit ? t('updateUser') : t('createUser')} />
            </Dialog.Title>
            <>
              <div className="space-y-6">
                <div className="flex gap-3">
                  <InputField
                    label={t('firstName')}
                    placeholder={t('enterFirstName')}
                    name="first_name"
                    register={register}
                    errorMessage={errors.first_name?.message}
                  />
                  <InputField
                    label={t('familyName')}
                    placeholder={t('enterFamilyName')}
                    register={register}
                    name="last_name"
                    errorMessage={errors.last_name?.message}
                  />
                </div>
                {/* {!isEdit && (
                  <SearchSelectField
                    label={t('roles')}
                    value={selectedRoles}
                    isMulti
                    required
                    options={isPartnerDomain ? PartnerRoles : Roles}
                    changeHandlerMultiple={option => {
                      setSelectedRoles(option);
                    }}
                    errorMessage={errors.roles?.message}
                  />
                )} */}
                <div className="flex gap-3">
                  <InputField
                    label={t('emailAddress')}
                    placeholder={t('enterEmail')}
                    type="email"
                    name="email"
                    register={register}
                    disabled={isEdit}
                    errorMessage={errors.email?.message}
                  />
                  {!isEdit && (
                    <InputField
                      label={t('password')}
                      placeholder={t('enterPassword')}
                      type="password"
                      name="password"
                      register={register}
                      disabled={isEdit}
                      errorMessage={errors.password?.message}
                    />
                  )}
                </div>
                <SearchSelectField
                  label={t('roles')}
                  value={selectedRoles}
                  isMulti
                  required
                  placeholder={t('selectAnItem')}
                  className="z-10"
                  options={isPartnerDomain ? PartnerRoles : roles}
                  changeHandlerMultiple={option => {
                    setSelectedRoles(option);
                  }}
                  errorMessage={errors.roles?.message}
                />
              </div>
            </>

            <div className="flex justify-end gap-4">
              <Dialog.Close
                className="bg-danger text-white px-6  h-9 rounded border border-danger hover:bg-white hover:text-danger"
                onClick={() => closeHandler()}
              >
                {t('cancel')}
              </Dialog.Close>
              <button
                type="submit"
                className="bg-primary text-white px-6  h-9 rounded border border-primary hover:bg-white hover:text-primary"
              >
                {!isEdit ? t('createUser') : t('updateUser')}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default withTranslation()(UserFormModal);
