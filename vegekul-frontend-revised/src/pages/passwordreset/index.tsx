import { z } from 'zod';
import LoginImage from '../../assets/LoginImage.jpg';
import { ChevronLeftSvg, LockSvg, RightArrowSvg } from '../../icons/Allsvgs';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';

import axios from 'axios';
import IconInput from '../../ui/IconInput';
import { useEffect } from 'react';
import Button from '../../ui/Button';
import logo from '../../assets/logo.png';
import { TFunction, t } from 'i18next';
import { withTranslation } from 'react-i18next';

interface Props {
  new_password1: string;
  new_password2: string;
  token?: string | null;
  uid?: string | null;
  t?: TFunction;
}
const validationSchema = z
  .object({
    new_password1: z
      .string()
      .nonempty('Password is required')
      .regex(new RegExp('.*[A-Z].*'), 'Must contain a uppercase character')
      .regex(new RegExp('.*[a-z].*'), 'Must contain a lowercase character')
      .regex(new RegExp('.*\\d.*'), 'Must contain a number')
      .regex(
        new RegExp('.*[`~<>?,./!@#$%^&*()\\-_+="\'|{}\\[\\];:\\\\].*'),
        'Must contain a special character'
      )
      .min(8, 'Password must be at least 8 characters'),
    new_password2: z.string(),
  })
  .refine(
    ({ new_password1, new_password2 }) => new_password1 === new_password2,
    {
      path: ['new_password2'],
      message: 'New password and Confirm password must match',
    }
  );

function ResetPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // this is to check if user is redirected from email link or login page
    // if url of this page is entered directly then redirect to login page
    const handleTokenVerification = () => {
      if (
        !(
          !searchParams.get('token') ||
          !searchParams.get('uid') ||
          !location?.state?.access
        )
      ) {
        navigate('/login');
        toast.error('Invalid link');
        return;
      }
      return;
    };
    handleTokenVerification();
  }, [location?.state?.access, navigate, searchParams]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Props>({ resolver: zodResolver(validationSchema) });

  const onSubmit = async (data: Props) => {
    // this is the url for the reset password api at first login of user after account is created
    let resetUrl = 'user/initial-reset-password/';
    const toastId = toast.loading(t('resettingYourPassword...'));
    let postData = {
      ...data,
    };
    let headers: any = {
      'Content-Type': 'application/json',
    };
    if (searchParams.get('token') && searchParams.get('uid')) {
      postData = {
        ...postData,
        token: searchParams.get('token'),
        uid: searchParams.get('uid'),
      };
      resetUrl = 'auth/reset-password/';
    }

    if (location?.state?.access) {
      headers = {
        ...headers,
        Authorization: `Bearer ${location?.state?.access}`,
      };
    }

    const response = await axios({
      url: import.meta.env.VITE_BACKEND_BASE_URL + resetUrl,
      method: 'post',
      data: postData,
      headers: headers,
    });
    if (response.status === 200) {
      toast.success(t('passwordResetSuccessfully'), { id: toastId });
      navigate('/login');
    } else {
      toast.error(t('errorResettingPassword'), { id: toastId });
    }
  };

  return (
    <div className="flex h-[100dvh]">
      <section className="h-full basis-5/12">
        <img
          src={LoginImage}
          alt="Reset"
          className="h-full w-full object-cover"
        />
      </section>
      <section className="flex flex-grow flex-col">
        <div className="flex items-center justify-between px-10 pt-6">
          <div className="flex items-center gap-4">
            <img src={logo} className="h-9" alt="Logo" />
          </div>
          <button
            className="flex cursor-pointer items-center gap-1 font-medium text-primary underline-offset-2 hover:underline"
            onClick={() => navigate('/login')}
          >
            <ChevronLeftSvg className="h-7" />
            <span>{t('goBack')}</span>
          </button>
        </div>
        <div className="mx-auto w-96 text-center flex-grow flex flex-col justify-center">
          <h1 className="text-[28px] font-semibold text-primary">
            {t('resetPassword')}
          </h1>
          <p className="mt-1 text-[15px] font-medium text-grayTextDark">
            {t('enterNewPasswordForYourAccount')}
          </p>
          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative">
              <IconInput
                Icon={LockSvg}
                type="password"
                placeholder={t('newPassword')}
                errorMessage={errors.new_password1?.message}
                value={watch('new_password1') || ''}
                {...register('new_password1')}
              />
            </div>
            <IconInput
              Icon={LockSvg}
              type="password"
              placeholder={t('confirmPassword')}
              errorMessage={errors.new_password2?.message}
              value={watch('new_password2') || ''}
              {...register('new_password2')}
            />

            <Button
              type="submit"
              // disabled={mutation.isLoading}
              className="relative mt-2 rounded-full py-2.5 disabled:cursor-wait"
            >
              <span>{t('resetPassword')}</span>
              <RightArrowSvg className="absolute right-4 top-1/2 h-7 -translate-y-1/2" />
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default withTranslation()(ResetPage);
