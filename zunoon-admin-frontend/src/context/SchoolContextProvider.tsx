import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ISchool, SchoolContextType } from "../@types/school";

export const SchoolContext = createContext<SchoolContextType>({} as SchoolContextType);

type Props = {
  children?: React.ReactNode;
};

export const SchoolProvider: React.FC<Props> = ({ children }) => {
  const [schoolData, setSchoolData] = useState<ISchool>(() => {
    const storedSchoolData = localStorage.getItem("schoolData");
    return storedSchoolData
      ? JSON.parse(storedSchoolData)
      : {
          id: "",
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
        };
  });

  const handleSchoolUpdate = (updatedSchoolData: ISchool) => {
    setSchoolData(updatedSchoolData);
  };

  useEffect(() => {
    localStorage.setItem("schoolData", JSON.stringify(schoolData));
  }, [schoolData]);

  const contextValue = useMemo(
    () => ({
      schoolData,
      setSchoolData,
      handleSchoolUpdate,
    }),
    [schoolData],
  );

  return <SchoolContext.Provider value={contextValue}>{children}</SchoolContext.Provider>;
};

export const useSchoolContext = () => useContext(SchoolContext);
