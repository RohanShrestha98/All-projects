import { withTranslation } from "react-i18next";
import "./stepper.css";

const Stepper = ({ activeStep, setActiveStep, t, resErrors }) => {
  const totalSteps = 4;
  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;

  return (
    <div className="main-container">
      <div className="step-container">
        <div className="before-style"></div>
        <div className="after-style" style={{ width }} />
        <div onClick={() => setActiveStep(1)} className="step-wrapper">
          <div className="step-style">
            <div className="step-style">
              {(() => {
                if (
                  (resErrors && resErrors?.name) ||
                  resErrors?.taxPayerID ||
                  resErrors?.subdomain
                ) {
                  return <div className="cross-mark">!</div>;
                }

                return activeStep > 2 ? (
                  <div className="check-mark">L</div>
                ) : (
                  <span className="step-count">1</span>
                );
              })()}
            </div>
          </div>
          <div className="step-label-container">
            <span className="step-label">{t("basic")}</span>
          </div>
        </div>
        <div className="step-wrapper">
          <div className="step-style">
            <div className="step-style">
              {(() => {
                if ((resErrors && resErrors?.email) || resErrors?.cellPhone) {
                  return <div className="cross-mark">!</div>;
                }

                return activeStep > 2 ? (
                  <div className="check-mark">L</div>
                ) : (
                  <span className="step-count">2</span>
                );
              })()}
            </div>
          </div>
          <div className="step-label-container">
            <span className="step-label">{t("contact")}</span>
          </div>
        </div>
        <div className="step-wrapper">
          <div className="step-style">
            <div className="step-style">
              {activeStep > 3 ? (
                <div className="check-mark">L</div>
              ) : (
                <span className="step-count">3</span>
              )}
            </div>
          </div>
          <div className="step-label-container">
            <span className="step-label">{t("address")}</span>
          </div>
        </div>
        <div className="step-wrapper">
          <div className="step-style">
            <div className="step-style">
              {activeStep > 4 ? (
                <div className="check-mark">L</div>
              ) : (
                <span className="step-count">4</span>
              )}
            </div>
          </div>
          <div className="step-label-container">
            <span className="step-label">{t("feature")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Stepper);
