import { useState } from "react";
import "./AddSchool.scss";
import Stepper from "./steps/Stepper";
import Basic from "./steps/Basic";
import Contact from "./steps/Contact";
import Address from "./steps/Address";
import Feature from "./steps/Feature";
import Button from "../../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { ISchool } from "../../../../@types/school";

const AddSchool = ({ t }) => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPreviousClick, setIsPreviousClick] = useState<boolean>(false);
  const [resErrors, setResErrors] = useState({});
  const [data, setData] = useState<ISchool>({
    file: {},
    name: "",
    subdomain: "",
    taxPayerID: "",
    sector: "",
    color: "",
    address: {
      address1: "",
      address2: "",
      municipality: "",
      department: "",
      country: "",
    },
    contact: {
      contactName: "",
      cellPhone: "",
      phoneNumber: "",
      email: "",
    },
    feature: {
      plan: "",
      deliverymodality: "",
      educationLevels: [],
    },
  });

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{`${t("school")} | ${t("add")}`}</h4>
        <div className="px-5 ">
          <Button
            type="button"
            buttonName={`< ${t("back")}`}
            color="info"
            clickHandler={() => navigate("../")}
          />
        </div>
      </div>
      <Stepper activeStep={activeStep} resErrors={resErrors} setActiveStep={setActiveStep} />
      {activeStep === 1 ? (
        <Basic
          data={data}
          resErrors={resErrors}
          setData={setData}
          nextStep={() => setActiveStep(2)}
        />
      ) : activeStep === 2 ? (
        <Contact
          isPreviousClick={isPreviousClick}
          setIsPreviousClick={setIsPreviousClick}
          data={data}
          resErrors={resErrors}
          setData={setData}
          prevStep={() => setActiveStep(1)}
          nextStep={() => setActiveStep(3)}
        />
      ) : activeStep === 3 ? (
        <Address
          isPreviousClick={isPreviousClick}
          setIsPreviousClick={setIsPreviousClick}
          data={data}
          setData={setData}
          prevStep={() => setActiveStep(2)}
          nextStep={() => setActiveStep(4)}
        />
      ) : (
        <Feature
          isPreviousClick={isPreviousClick}
          setIsPreviousClick={setIsPreviousClick}
          data={data}
          setData={setData}
          setResErrors={setResErrors}
          prevStep={() => setActiveStep(3)}
        />
      )}
    </>
  );
};

export default withTranslation()(AddSchool);
