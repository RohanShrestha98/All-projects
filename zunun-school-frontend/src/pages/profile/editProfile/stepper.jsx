import "./stepper.css";
import React from "react";

const Stepper = ({ activeStep, resErrors }) => {
  const totalSteps = 5;
  const width = `${(100 / (totalSteps - 1)) * (activeStep - 1)}%`;

  return (
    <div className="main_container sm:hidden">
      <div className="step_container">
        <div className="before_style" />
        <div className="after_style" style={{ width }} />
        <div className="step_wrapper">
          <div
            className={`step_style ${
              activeStep === 1
                ? "bg-blue-light border border-blue-light"
                : "border border-blue-light bg-white"
            }`}
          >
            {(() => {
              if (
                (resErrors && resErrors?.student?.email) ||
                resErrors?.student?.minEducId
              ) {
                return <div className="cross_mark">!</div>;
              }
              return activeStep > 1 ? (
                <div
                  className={`check_mark ${
                    activeStep === 1 ? "text-white" : "text-blue-light"
                  }`}
                >
                  L
                </div>
              ) : (
                <span
                  className={`step_count ${
                    activeStep === 1 ? "text-white" : "text-blue-light"
                  }`}
                >
                  1
                </span>
              );
            })()}
          </div>
          <div className="step_label_container">
            <span className="step_label">Student</span>
          </div>
        </div>
        <div className="step_wrapper">
          <div
            className={`step_style ${
              activeStep === 2
                ? "bg-blue-light border border-blue-light"
                : "border border-blue-light bg-white"
            }`}
          >
            {activeStep > 2 ? (
              <div
                className={`check_mark ${
                  activeStep === 2 ? "text-white" : "text-blue-light"
                }`}
              >
                L
              </div>
            ) : (
              <span
                className={`step_count ${
                  activeStep === 2 ? "text-white" : "text-blue-light"
                }`}
              >
                2
              </span>
            )}
          </div>
          <div className="step_label_container">
            <span className="step_label">Address</span>
          </div>
        </div>
        <div className="step_wrapper">
          <div
            className={`step_style ${
              activeStep === 3
                ? "bg-blue-light border border-blue-light"
                : "border border-blue-light bg-white"
            }`}
          >
            {activeStep > 3 ? (
              <div
                className={`check_mark ${
                  activeStep === 3 ? "text-white" : "text-blue-light"
                }`}
              >
                L
              </div>
            ) : (
              <span
                className={`step_count ${
                  activeStep === 3 ? "text-white" : "text-blue-light"
                }`}
              >
                3
              </span>
            )}
          </div>
          <div className="step_label_container">
            <span className="step_label">Identification</span>
          </div>
        </div>
        <div className="step_wrapper">
          <div
            className={`step_style ${
              activeStep === 4
                ? "bg-blue-light border border-blue-light"
                : "border border-blue-light bg-white"
            }`}
          >
            {activeStep > 4 ? (
              <div
                className={`check_mark ${
                  activeStep === 4 ? "text-white" : "text-blue-light"
                }`}
              >
                L
              </div>
            ) : (
              <span
                className={`step_count ${
                  activeStep === 4 ? "text-white" : "text-blue-light"
                }`}
              >
                4
              </span>
            )}
          </div>
          <div className="step_label_container">
            <span className="step_label">Family</span>
          </div>
        </div>
        <div className="step_wrapper">
          <div
            className={`step_style ${
              activeStep === 5
                ? "bg-blue-light border border-blue-light"
                : "border border-blue-light bg-white"
            }`}
          >
            {activeStep > 5 ? (
              <div
                className={`check_mark ${
                  activeStep === 5 ? "text-white" : "text-blue-light"
                }`}
              >
                L
              </div>
            ) : (
              <span
                className={`step_count ${
                  activeStep === 5 ? "text-white" : "text-blue-light"
                }`}
              >
                5
              </span>
            )}
          </div>
          <div className="step_label_container">
            <span className="step_label">Education</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
