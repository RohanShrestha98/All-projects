import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import logo from '../../assets/logo.png';
import signInSvg from '../../assets/LoginImage.jpg';
import { ChevronRightSvg } from '../../icons/Allsvgs';
import LogInForm from '../../components/auth/Loginform';
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm';
import { withTranslation } from 'react-i18next';
import { t } from 'i18next';

function AuthPage() {
  const [[view, direction], setView] = useState<
    ['login' | 'reset', 'left' | 'right' | null]
  >(['login', null]);

  return (
    <main className="flex h-screen">
      <section className="flex basis-5/12 flex-col items-center justify-center">
        <AnimatePresence initial={false} mode="wait">
          <img
            src={signInSvg}
            title="Sign In Illustration"
            alt="Sign In"
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
      </section>
      <section className="flex flex-grow flex-col">
        <div className="flex items-center justify-between px-10 pt-6">
          <div className="flex items-center gap-4">
            <img src={logo} className="h-9" alt="Logo" />
          </div>
          {view === 'reset' && (
            <button
              className="group flex items-center gap-1 font-medium text-primary"
              onClick={() => setView(['login', 'right'])}
            >
              <span> {t('goToLogin')}</span>
              <ChevronRightSvg className="h-7 transition-all duration-100 ease-out group-hover:translate-x-1" />
            </button>
          )}
        </div>
        <AnimatePresence initial={false} mode="wait" custom={direction}>
          {view === 'login' ? (
            <LogInForm
              changeView={() => setView(['reset', 'left'])}
              view={view}
              direction={direction}
              key="login"
            />
          ) : (
            <ForgotPasswordForm
              changeView={() => setView(['login', 'right'])}
              view={view}
              direction={direction}
              key="reset"
            />
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

export default withTranslation()(AuthPage);
