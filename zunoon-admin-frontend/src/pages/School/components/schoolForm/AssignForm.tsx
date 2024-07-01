import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";

import { useForm } from "react-hook-form";

import "./AssignForm.scss";

import http from "../../../../utils/http";
import config from "../../../../config";
import MultiSelect from "../../../../components/MultiSelect/MultiSelect";
import Button from "../../../../components/Button/Button";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";

const schoolApi = config.endpoints.api.school;
const courseApi = config.endpoints.api.course;

interface IOptions {
  label: string;
  value: string;
}

const AssignForm = ({ t, handleClickAssign, loading }) => {
  //   const [school, setSchool] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState<IOptions>({
    label: "",
    value: ""
  });
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [schoolOptions, setSchoolOptions] = useState<IOptions[]>([]);
  const [courseOption, setCourseOption] = useState<IOptions[]>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await http.GET(schoolApi.list, "");
      //   setSchool(response.data.data);
      setSchoolOptions(
        response.data.data.map((content: any) => ({
          label: content.name ? content.name : "No title",
          value: content.id
        }))
      );
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await http.GET(courseApi.list, "");
      setCourseOption(
        response.data.data.map((content: any) => ({
          label: content.name ? content.name : "No title",
          value: content.id
        }))
      );
    }
    fetchData();
  }, []);

  const handleSelectSchoolChange = (data, e) => {
    setSelectedSchool(data);
    setValue("school", data.value);
  };

  //   useEffect(() => {
  //     if (school.length > 0 && school !== undefined) {
  //       const schoolResponse: SchoolResponse = school.find(
  //         (each: SchoolResponse) => each.id === id
  //       )!;
  //       setSelectedSchool({
  //         label: schoolResponse.title,
  //         value: schoolResponse.id
  //       });
  //     }
  //   }, [id, school]);

  const {
    register,
    reset,
    formState: { errors },
    setValue,
    handleSubmit
  } = useForm({
    defaultValues: {
      school: "",
      courseset: ""
    }
  });

  const handleMultiSelect = value => {
    setSelectedCourses(value);
    const courseIds = value.map(item => item?.value);
    setValue("courseset", courseIds);
  };

  return (
    <form className="assign_wrapper" onSubmit={handleSubmit(handleClickAssign)}>
      <div className="lesson_wrapper">
        <label htmlFor="lesson">{t("sidebar_schools")}</label>
        <div>
          <CustomSelect
            required={false}
            id="school"
            register={register}
            name="school"
            value={selectedSchool}
            handleChange={(e, data) => {
              handleSelectSchoolChange(e, data);
            }}
            options={schoolOptions}
          />
        </div>
      </div>
      <div className="select_field_container">
        <label htmlFor="content">{t("sidebar_courses")}</label>
        <MultiSelect
          options={courseOption}
          selected={selectedCourses}
          handleMultiSelect={handleMultiSelect}
          {...register("courseset", {
            required: true
          })}
        />
        {errors?.courseset?.type === "required" && (
          <p className="error_text">{t("field_required")}</p>
        )}
      </div>

      <div className="button_wrapper">
        <Button
          type="submit"
          color="success"
          buttonName={loading ? t("submitting") : t("assign")}
          disabled={loading}
        />
        <Button
          type="button"
          color="danger"
          clickHandler={() => reset()}
          buttonName={t("clear")}
        />
      </div>
    </form>
  );
};

export default withTranslation()(AssignForm);
