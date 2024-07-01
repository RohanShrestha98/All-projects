import { motion } from 'framer-motion';
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

import Button from '../ui/Button';
import { RightArrowSvg } from '../icons/Allsvgs';

const variants = {
  enter: (direction: string) => ({
    x: direction === 'right' ? 200 : -200,
    y: -20,
    scale: 0.6,
    opacity: 0,
  }),
  exit: (direction: string) => ({
    x: direction === 'left' ? 200 : -200,
    y: -20,
    scale: 0.6,
    opacity: 0,
  }),
};

export interface FormProps {
  changeView: () => void;
  view: 'login' | 'reset';
  direction: 'left' | 'right' | null;
  t?: TFunction;
}

interface Props extends FormProps {
  children: React.ReactNode;
  submitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  t: TFunction;
}

function AuthFormLayout({
  children,
  view,
  direction,
  changeView,
  submitHandler,
  isLoading = false,
  t,
}: Props) {
  let heading = t('header1_login');
  const heading2 = t('header2_login');
  let mainBtnText = `${t('signIn')}`;
  let altBtnText = `${t('signUp')}`;
  let altBtnLabel = `${t('dontHaveAnAccountYet')}?`;
  let loadingText = `${t('signingIn')}...`;

  if (view === 'reset') {
    heading = `${t('recoverAccount')}`;
    mainBtnText = `${t('requestVerificationCode')}`;
    altBtnText = `${t('signIn')}`;
    altBtnLabel = `${t('rememberedYourPassword')}?`;
    loadingText = `${t('requestingCode')}...`;
  }

  return (
    <div className="flex flex-grow items-center self-center py-8">
      <motion.article
        className="flex w-96 flex-col gap-6 text-center"
        custom={direction}
        variants={variants}
        initial="enter"
        animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
        exit="exit"
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <article>
          <h2 className="text-[28px] font-semibold text-primary">{heading}</h2>
          <p className="mt-1 text-sm font-medium text-grayTextDark">
            {heading2}
          </p>
        </article>
        <form onSubmit={submitHandler}>
          <fieldset className="flex flex-col gap-4" disabled={isLoading}>
            {children}
          </fieldset>
          <div className="flex flex-col gap-3">
            <Button
              type="submit"
              className=" relative mt-6 flex w-full justify-center px-3 py-2.5"
              isLoading={isLoading}
            >
              <span>{isLoading ? loadingText : mainBtnText}</span>
              {isLoading ? null : (
                <RightArrowSvg className="absolute right-4 top-1/2 h-7 -translate-y-1/2" />
              )}
            </Button>
            {view === 'reset' && (
              <div className="flex justify-center gap-2 text-sm">
                <span className="text-grayText">{altBtnLabel}</span>
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={changeView}
                >
                  {altBtnText}
                </button>
              </div>
            )}
          </div>
        </form>
      </motion.article>
    </div>
  );
}

export default withTranslation()(AuthFormLayout);
