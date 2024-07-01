import { toast } from 'react-hot-toast';
import axios, { isAxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useForm, type SubmitHandler, set } from 'react-hook-form';

import { EmailSvg, LockSvg } from '../../icons/Allsvgs';
import AuthFormLayout from '../../layout/Authformlayout';
import { useAuth } from '../../context/Authcontext';
import type { FormProps } from '../../layout/Authformlayout';
import {
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setPartnerCode,
  setRefreshToken,
  setUserDetails,
} from '../../utils/cookie';
import backendApi from '../../utils/axios';
import { BACKEND_BASE_URL } from '../../utils/constants';
import IconInput from '../../ui/IconInput';

import { useApp } from '../../context/AppContext';
import { useEffect, useState } from 'react';
import InputField from '../../ui/Inputfield';
import { withTranslation } from 'react-i18next';

type FormType = {
  email: string;
  password: string;
  partner_code: string;
};

type UserLoginResponse = {
  idx: string;
  avatar: null;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  roles: string[];
  refresh: string;
  access: string;
};

function LogInForm({ changeView, view, direction, t }: FormProps) {
  const [loginUrl, setLoginUrl] = useState<string>('');
  const [userData, setUserData] = useState<UserLoginResponse | null>();
  const [showPartnerDropdown, setShowPartnerDropdown] =
    useState<boolean>(false);
  const mutation = useMutation({
    mutationFn: (data: FormType) =>
      axios.post(loginUrl, data).then(res => res.data),
  });
  const navigate = useNavigate();
  const { setAuth, setRoles, setUser } = useAuth();
  const { isPartnerDomain } = useApp();

  const { register, handleSubmit, watch, getValues, setValue } =
    useForm<FormType>();
  const [partners, setPartners] = useState<any>([]);

  useEffect(() => {
    const getPartners = async () => {
      backendApi.defaults.headers[
        'Authorization'
      ] = `Bearer ${userData?.access}`;
      const { data } = await backendApi.get('business-partner/partner-users/');

      if (data.length === 0) {
        toast.error(`${'noPartnersFound'}!`);
        removeAccessToken();
        removeRefreshToken();
        setShowPartnerDropdown(false);
        navigate('/login');
        return;
      }
      setPartners(data);
    };

    showPartnerDropdown && getPartners();
  }, [showPartnerDropdown]);

  useEffect(() => {
    // set login url based on partner domain
    if (isPartnerDomain && showPartnerDropdown) {
      setLoginUrl(`${BACKEND_BASE_URL}/partner-user/`);
    }
    if (isPartnerDomain) {
      setLoginUrl(`${BACKEND_BASE_URL}auth/login/`);
    } else {
      setLoginUrl(`${BACKEND_BASE_URL}auth/login/`);
    }
  }, [isPartnerDomain, showPartnerDropdown]);

  const setUserCredentials = (userData: any) => {
    setAuth(userData);
    setAccessToken(userData.access);
    setRefreshToken(userData.refresh);

    setUserDetails(userData);
    setUser(userData);
    setRoles(userData.roles);
  };

  const onSubmit: SubmitHandler<FormType> = data => {
    mutation.mutate(data, {
      onSuccess: data => {
        setUserData(data);

        if (isPartnerDomain) {
          setShowPartnerDropdown(true);
        } else {
          if (
            data.roles.some((r: string) =>
              ['Partner Staff', 'Partner Staff'].includes(r)
            )
          ) {
            toast.error(t ? t("You don't have access to this dashboard") : '');

            navigate('/login');
            return;
          }
          setUserCredentials(data);
          toast.success(`${t!('loggedInSuccessfully')}`);
          navigate('/');
        }
      },
      onError: err => {
        if (isAxiosError(err)) {
          let errorMsg =
            (err.response?.data?.detail as string) || t!('loginFailed');

          if (!err.response) errorMsg = 'No Server Response!';
          else if (err.response.status === 400)
            errorMsg = t!('invalidCredentials');
          else if (err.response.status === 401) {
            if (err.response?.data?.change_password) {
              navigate('/reset-password', {
                state: { access: err.response?.data?.access, from: 'login' },
              });
              toast.success(
                `${t!('pleaseResetYourPasswordToAccessYourAccount')}`
              );
              return;
            }
          }

          toast.error(t!('invalidCredentials'));
        }
      },
    });
  };

  const onPartnerCodeSubmit = async () => {
    const partnerCode = getValues('partner_code');
    if (!partnerCode) {
      toast.error(`${t!('pleaseSelectAPartner')}`);
      return;
    }
    backendApi.defaults.headers['Partner'] = partnerCode;

    const { data } = await backendApi.get('business-partner-user/info/');

    setUserCredentials({ ...userData, roles: data.roles });
    setPartnerCode(partnerCode);
    setShowPartnerDropdown(false);
    navigate('/');
  };

  return (
    <AuthFormLayout
      changeView={changeView}
      view={view}
      direction={direction}
      submitHandler={handleSubmit(
        showPartnerDropdown ? onPartnerCodeSubmit : onSubmit
      )}
      isLoading={mutation.isLoading}
    >
      <IconInput
        type="email"
        placeholder={t!('email')}
        Icon={EmailSvg}
        required={!showPartnerDropdown}
        {...register('email')}
      />
      <IconInput
        type="password"
        placeholder={t!('password')}
        Icon={LockSvg}
        required={!showPartnerDropdown}
        value={watch('password') || ''}
        {...register('password')}
      />

      {!(isPartnerDomain && showPartnerDropdown && partners.length) ? null : (
        <InputField
          label=""
          extraClass="rounded-full border border-gray-100"
          type="select"
          placeholder={t!('selectPartner')}
          options={partners.map((partner: any) => ({
            label: partner.name,
            value: partner.code,
          }))}
          name="partner_code"
          register={register}
          setValue={(value: any) => {
            setValue('partner_code', value.value);
          }}
        />
      )}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="remember-me"
            name="remember"
            className="h-3.5 w-3.5 cursor-pointer accent-primary"
            defaultChecked
          />
          <label htmlFor="remember-me" className="cursor-pointer pl-2 text-sm">
            {t!('rememberMe')}
          </label>
        </div>
      </div>
    </AuthFormLayout>
  );
}

export default withTranslation()(LogInForm);
