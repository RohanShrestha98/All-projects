/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import ImageInput from '../../ui/ImageInput';
import InputField from '../../ui/Inputfield';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/Authcontext';
import { UserType } from '../../types';
import { useUserOpsMutation } from '../../hooks/UseUserMutated';
import {
  removeAccessToken,
  removeRefreshToken,
  setUserDetails,
} from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../../components/navbar/Navbar';
import { LockSvg } from '../../icons/Allsvgs';
import IconInput from '../../ui/IconInput';
import { TFunction, t } from 'i18next';
import { withTranslation } from 'react-i18next';

interface IUserProfileData {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  newPassword1: string;
  newPassword2: string;
  avatar?: File;
  t: TFunction
}

function SettingsPage() {
  const [activeNav, setActiveNav] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const userMutation = useUserOpsMutation();
  const { user, setUser } = useAuth();
  const { register, handleSubmit, setValue, watch } = useForm<UserType>({
    defaultValues: {
      firstName: user.first_name && user.first_name,
      lastName: user.last_name && user.last_name,
      email: user.email,
      oldPassword: "",
      newPassword1: "",
      newPassword2: "",
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    setValue('avatar', image);
  }, [image]);

  const profileUpdateHandler = async (data: UserType) => {
    const postData = {
      first_name: data.firstName,
      last_name: data.lastName,
    }

    if (activeNav === 0) {
      if (data.firstName || data.lastName) {
        try {
          const response = await userMutation.mutateAsync([
            'patch',
            `user/${user.idx}/`,
            postData,
            true,
          ]);
          setUserDetails(response);
          setUser(response);

          toast.success(t('profileUpdatedSuccessfully'));
        } catch (error) {
          const errData: any = error?.response?.data;
          toast.error(t('errorUpdatingProfile'));
        }
      }
    }
    if (activeNav === 1) {
      if (data.oldPassword && data.newPassword1 && data.newPassword2) {
        if (data.newPassword1 !== data.newPassword2) {
          toast.error(t('newPasswordsMustBeSame'));
        }
        const changePasswordData = {
          old_password: data.oldPassword,
          new_password1: data.newPassword1,
          new_password2: data.newPassword2,
        };
        try {
          const response = await userMutation.mutateAsync([
            'post',
            `user/change-password/`,
            changePasswordData,
          ]);
          setUserDetails(response);
          setUser(response);

          removeAccessToken();
          removeRefreshToken();
          toast.success(t('passwordUpdatedSuccessfully'));
          navigate('/login');
        } catch (error) {
          const errData: any = error?.response?.data;

          errData &&
            Object.keys(errData).forEach(eachErr => {
              eachErr &&
                toast.error(
                  `${eachErr.replace('_', ' ').toUpperCase()}: ${errData[eachErr][0]
                  }`
                );
            });
        }
      }
    }
  };

  return (
    <div className="rightSidePart">
      <Navbar pagetitle={t("userProfile")} />
      <div className="space-y-6">
        <form
          className="space-y-8 rounded  bg-white px-8 py-6  m-8 "
          onSubmit={handleSubmit(profileUpdateHandler)}
        >
          <div className="flex gap-6">
            <div className="w-2/5 min-w-[400px]  border  px-6 py-4">
              <div className="flex gap-4">
                <p onClick={() => setActiveNav(0)}
                  className={`${activeNav === 0
                    ? 'font-semibold text-secondary border-secondary border-b-[3px] '
                    : 'cursor-pointer font-semibold'
                    }`}
                >
                  {t("personalInformation")}
                </p>
                <p onClick={() => setActiveNav(1)}
                  className={`${activeNav === 1
                    ? 'font-semibold text-secondary border-secondary border-b-[3px] '
                    : 'cursor-pointer font-semibold'
                    }`}
                >
                  {t("changePassword")}
                </p>
              </div>
              {activeNav === 0 ? (
                <>

                  <article className="flex flex-wrap items-center gap-8 my-6">
                    <section className="flex-grow  space-y-3">
                      <InputField
                        label={t("firstName")}
                        name="firstName"
                        placeholder={t("enterFirstName")}
                        register={register}
                      />
                      <InputField
                        label={t("lastName")}
                        name="lastName"
                        placeholder={t("enterLastName")}
                        register={register}
                      />
                      <InputField
                        label={t("email")}
                        name="email"
                        type="email"
                        disabled
                        register={register}
                      />
                    </section>

                  </article>
                  <div className="flex justify-end gap-4">
                    <button type="submit" className="bg-secondary border border-secondary h-9 button  text-white px-6 rounded hover:text-secondary hover:bg-white">
                      {t("saveChanges")}
                    </button>
                  </div>
                </>
              ) : activeNav === 1 ? (
                <>

                  <article className="flex  gap-6 my-6">
                    <section className="flex-grow  space-y-4">
                      <div className='space-y-2'>
                        <label htmlFor="oldPassword" className=''>
                          {t("oldPassword")}</label>
                        <IconInput
                          type="password"
                          placeholder={t("enterOldPassword")}
                          Icon={LockSvg}
                          value={watch('oldPassword') || ''}
                          {...register('oldPassword')}
                        />
                      </div>
                      <div className='space-y-2'>
                        <label htmlFor="newPassword1">
                          {t("newPassword")}</label>
                        <IconInput
                          type="password"
                          placeholder={t("enterNewPassword")}
                          Icon={LockSvg}
                          value={watch('newPassword1') || ''}
                          {...register('newPassword1')}
                        />
                      </div>
                      <div className='space-y-2'>
                        <label htmlFor="newPassword2">
                          {t("confirmNewPassword")}</label>
                        <IconInput
                          type="password"
                          placeholder={t("reEnterNewPassword")}
                          Icon={LockSvg}
                          value={watch('newPassword2') || ''}
                          {...register('newPassword2')}
                        />
                      </div>
                    </section>

                  </article>
                  <div className="flex justify-end gap-4">
                    <button type="submit" className="bg-secondary border border-secondary h-9 button text-white px-6 rounded hover:text-secondary hover:bg-white">
                      {t("saveChanges")}
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          </div>


        </form>
      </div>
    </div>
  );
}

export default withTranslation()(SettingsPage)
