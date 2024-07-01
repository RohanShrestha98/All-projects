import AuthFormLayout from '../../layout/Authformlayout';
import { EmailSvg, SuccessFilledSvg } from '../../icons/Allsvgs';

import type { FormProps } from '../../layout/Authformlayout';
import { z } from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios, { isAxiosError } from 'axios';
import { BACKEND_BASE_URL } from '../../utils/constants';
import { toast } from 'react-hot-toast';
import IconInput from '../../ui/IconInput';
import Button from '../../ui/Button';
import { t } from 'i18next';
import { withTranslation } from 'react-i18next';

const validationSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

type ValidationSchema = z.infer<typeof validationSchema>;

function ForgotPasswordForm({ changeView, view, direction }: FormProps) {
  const mutation = useMutation({
    mutationFn: (data: ValidationSchema) =>
      axios
        .post(`${BACKEND_BASE_URL}auth/forgot-password/`, data)
        .then(res => res.data),
  });
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(validationSchema) });

  const onSubmit: SubmitHandler<ValidationSchema> = data => {
    mutation.mutate(data, {
      onSuccess: () => {
        setSuccess(true);
        toast.success(`${t('emailSentSuccessfully')}`);
      },
      onError: err => {
        if (isAxiosError(err)) {
          let errorMsg = err.response?.data?.detail || 'Request Failed!';
          if (!err.response) errorMsg = 'No Server Response!';
          toast.error(errorMsg);
        }
      },
    });
  };

  return success ? (
    <section className="flex flex-col items-center flex-grow justify-center">
      <SuccessFilledSvg className="h-32 fill-primary" />
      <h3 className="mt-2 text-xl font-semibold text-grayHeading">Success!</h3>
      <p className="mt-6 text-lg font-medium text-grayTextDark">
        {t('emailSentSuccessfully')}
      </p>
      <p className="text-grayText text-[15px] font-medium">
        {t('pleaseCheckYourEmailToResetYourPassword')}
      </p>
      <Button className="px-6 py-2 mt-4 rounded-full" onClick={changeView}>
        {t('goToLogin')}
      </Button>
    </section>
  ) : (
    <AuthFormLayout
      changeView={changeView}
      view={view}
      direction={direction}
      submitHandler={handleSubmit(onSubmit)}
      isLoading={mutation.isLoading}
    >
      <IconInput
        Icon={EmailSvg}
        type="email"
        placeholder={t('email')}
        errorMessage={errors.email?.message}
        {...register('email')}
      />
    </AuthFormLayout>
  );
}

export default withTranslation()(ForgotPasswordForm);
