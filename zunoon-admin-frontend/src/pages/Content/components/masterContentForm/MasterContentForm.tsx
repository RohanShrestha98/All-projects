/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";

import Button from "../../../../components/Button/Button";
import Textarea from "../../../../components/Textarea/Textarea";
import Selector from "../../../../components/Dropdown/DropdownField";
import InputField from "../../../../components/InputField/InputField";
import "./MasterContentForm.scss";
import http from "../../../../utils/http";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

import { withTranslation } from "react-i18next";

import config from "../../../../config";
import CustomSelect from "../../../../components/CustomSelect/CustomSelect";
let courseApi = config.endpoints.api.course;
let gradeApi = config.endpoints.api.grade;
let skillApi = config.endpoints.api.skill;
let indicatorApi = config.endpoints.api.indicator;

const MasterContentForm = ({
  data,
  editform,
  handleCancel,
  handleClickSubmit,
  handleClickUpdate,
  isSubmitting,
  t,
}) => {
  const {
    reset,
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm(
    editform && {
      defaultValues: {
        id: data && data.id,
        title: data && data.title,
        topic: data && data.topic?.id,
        author: data && data.author,
        course: data && data.course,
        grade: data && data.grade,
        skill: data && data.skill,
        indicator: data && data.indicator,
        description: data && data.description,
        taxonomyLevel: data && data.taxonomyLevel?.id,
      },
    },
  );

  const watchCourse = watch("course");
  const watchGrade = watch("grade");
  const watchSkill = watch("skill");

  const [courses, setCourses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [filteredIndicators, setFilteredIndicators] = useState([]);
  const [indicators, setIndicator] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        let promiseList = [];
        promiseList.push(http.GET(courseApi.list, ""));
        promiseList.push(http.GET(gradeApi.list, ""));
        promiseList.push(http.GET(skillApi.list, ""));
        promiseList.push(http.GET(indicatorApi.list, ""));

        const allPromise = await Promise.all(promiseList);

        const courses = allPromise[0].data.data;
        setCourses(courses);

        const grades = allPromise[1].data.data;
        const gradesOptions = grades.map(each => ({
          label: each.name,
          value: each.id,
        }));
        setGrades(gradesOptions);

        const skills = allPromise[2].data.data;
        setSkills(skills);

        const indicators = allPromise[3].data.data;
        setIndicator(indicators);
      } catch (err) {
        toast.error(err);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    if (editform) {
      setValue("course", data?.course?.id);
      setSelectedCourse({
        label: data?.course?.name,
        value: data?.course?.id,
      });
      setValue("grade", data?.grade?.id);
      setSelectedGrade({
        label: data?.grade?.name,
        value: data?.grade?.id,
      });
      setValue("skill", data?.skill?.id);
      setSelectedSkill({
        label: data?.skill?.name,
        value: data?.skill?.id,
      });
      setValue("indicator", data?.indicator?.id);
      setSelectedIndicator({
        label: data?.indicator?.name,
        value: data?.indicator?.id,
      });
    }
  }, [
    data?.course?.id,
    data?.course?.name,
    data?.grade?.id,
    data?.grade?.name,
    data?.indicator?.id,
    data?.indicator?.name,
    data?.skill?.id,
    data?.skill?.name,
    editform,
    setValue,
  ]);

  useEffect(() => {
    if (!editform) {
      if (watchGrade) {
        if (watchGrade === "optional") {
          const optionalCourses = courses
            .filter(each => each.isOptional)
            .map(each => ({
              label: each.name,
              value: each.id,
            }));
          setFilteredCourses(optionalCourses);
        } else {
          const newFilteredCourses = courses
            .filter(each => each?.grade?.id === watchGrade)
            .map(each => ({
              label: each.name,
              value: each.id,
            }));
          setFilteredCourses(newFilteredCourses);
        }
      } else {
        setFilteredCourses([]);
      }
    }
  }, [courses, editform, watchGrade]);

  useEffect(() => {
    if (!editform) {
      if (watchCourse) {
        const newFilteredSkills = skills
          .filter(each => each?.course?.id === watchCourse)
          .map(each => ({
            label: each.name,
            value: each.id,
          }));
        setFilteredSkills(newFilteredSkills);
      } else {
        setFilteredSkills([]);
      }
    }
  }, [editform, skills, watchCourse]);

  useEffect(() => {
    if (!editform) {
      if (watchSkill) {
        const newFilteredIndicators = indicators
          .filter(each => each?.skill?.id === watchSkill)
          .map(each => ({
            label: each.name,
            value: each.id,
          }));
        setFilteredIndicators(newFilteredIndicators);
      } else {
        setFilteredIndicators([]);
      }
    }
  }, [editform, indicators, watchSkill]);

  const [selectedCourse, setSelectedCourse] = useState(editform && data.course?.id);
  const [selectedGrade, setSelectedGrade] = useState(editform && data.grade?.id);
  const [selectedSkill, setSelectedSkill] = useState(editform && data.skill.id);
  const [selectedIndicator, setSelectedIndicator] = useState(editform && data.indicator.id);

  const handleSelectGradeChange = (e, data) => {
    setSelectedGrade(data);
    setValue("grade", data.value);
  };
  const handleSelectCourseChange = (e, data) => {
    setSelectedCourse(data);
    setValue("course", data.value);
  };
  const handleSelectSkillChange = (e, data) => {
    setSelectedSkill(data);
    setValue("skill", data.value);
  };
  const handleSelectIndicatorChange = (e, data) => {
    setSelectedIndicator(data);
    setValue("indicator", data.value);
  };

  const handleReset = () => {
    reset({
      title: "",
      description: "",
      indicator: "",
    });
  };

  const handleClear = () => {
    handleReset();
  };

  return (
    <form
      className="master-form-container"
      onSubmit={handleSubmit(editform ? handleClickUpdate : handleClickSubmit)}
    >
      <div className="row-container">
        <div className="col-container">
          <div className="row-container">
            <div className="col-container">
              <div className="fieldAndValidate">
                <InputField
                  required
                  type="text"
                  name="title"
                  label={t("title")}
                  placeholder={t("placeholder_title")}
                  {...register("title", {
                    required: true,
                    minLength: 2,
                    maxLength: 50,
                  })}
                  onKeyUp={e => {
                    e.target.value = e?.target?.value?.trimStart();
                  }}
                />
                {errors?.title?.type === "required" && <p>{t("field_required")}</p>}
                {errors?.title?.type === "maxLength" && <p>{t("title_too_long_max_30_characters")}</p>}
                {errors?.title?.type === "minLength" && <p>{t("title_too_short_min_2_characters")}</p>}
              </div>
              <div className="row-container">
                <div className="fieldAndValidate">
                  <label htmlFor="grade">{t("sidebar_grades")}</label>
                  <CustomSelect
                    required={false}
                    name="grade"
                    id="grade"
                    options={grades}
                    register={register}
                    disabled={editform}
                    value={selectedGrade}
                    handleChange={(e, data) => handleSelectGradeChange(data, e)}
                    {...register("grade", {
                      pattern: /(?!^\d+$)^.+$/,
                    })}
                  />
                  {errors?.grade?.type === "pattern" && <p>{t("field_required")}</p>}
                </div>
                <div className="fieldAndValidate">
                  <label htmlFor="course">{t("sidebar_courses")}</label>
                  <CustomSelect
                    required={false}
                    name="course"
                    id="course"
                    options={filteredCourses}
                    register={register}
                    disabled={editform}
                    value={selectedCourse}
                    handleChange={(e, data) => handleSelectCourseChange(data, e)}
                    {...register("course", {
                      pattern: /(?!^\d+$)^.+$/,
                    })}
                  />
                  {errors?.course?.type === "pattern" && <p>{t("field_required")}</p>}
                </div>
              </div>
              <div className="row-container">
                <div className="fieldAndValidate">
                  <label htmlFor="skill">{t("sidebar_skills")}</label>
                  <CustomSelect
                    required={false}
                    name="skill"
                    id="skill"
                    options={filteredSkills}
                    register={register}
                    disabled={editform}
                    value={selectedSkill}
                    handleChange={(e, data) => handleSelectSkillChange(data, e)}
                    {...register("skill", {
                      pattern: /(?!^\d+$)^.+$/,
                    })}
                  />
                  {errors?.indicator?.type === "pattern" && <p>{t("field_required")}</p>}
                </div>
                <div className="fieldAndValidate">
                  <label htmlFor="indicator">{t("sidebar_indicator")}</label>
                  <CustomSelect
                    required={false}
                    name="indicator"
                    id="indicator"
                    options={filteredIndicators}
                    register={register}
                    disabled={editform}
                    value={selectedIndicator}
                    handleChange={(e, data) => handleSelectIndicatorChange(data, e)}
                    {...register("indicator", {
                      pattern: /(?!^\d+$)^.+$/,
                    })}
                  />
                  {errors?.indicator?.type === "pattern" && <p>{t("field_required")}</p>}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="fieldAndValidate">
            <Selector
              name="taxonomyLevel"
              editform={editform}
              required={true}
              label="Taxonomy Level"
              options={taxonomies}
              selectValue={selectedTaxonomy}
              setSelectValue={setSelectedTaxonomy}
              {...register("taxonomyLevel", {
                required: true,
                pattern: /(?!^\d+$)^.+$/
              })}
            />
            {errors?.taxonomyLevel?.type === "required" && (
              <p>{t("field_required")}</p>
            )}
            {errors?.taxonomyLevel?.type === "pattern" && (
              <p>{t("field_required")}</p>
            )}
          </div> */}
          <div className="fieldAndValidate">
            <Textarea
              label={t("th_description")}
              required
              rows={4}
              name="description"
              placeholder={t("placeholder_content_description")}
              {...register("description", {
                required: true,
                minLength: 10,
                maxLength: 200,
              })}
              onChange={e => {
                e.target.value = e?.target?.value?.trimStart();
              }}
            />
            {errors?.description?.type === "required" && <p>{t("field_required")}</p>}
            {errors?.description?.type === "maxLength" && <p>{t("max_length")}</p>}
            {errors?.description?.type === "minLength" && <p>{t("min_length")}</p>}
          </div>
        </div>
      </div>

      <div className="row-container">
        <div className="button-wrapper">
          <Button
            type="submit"
            color="success"
            buttonName={isSubmitting ? t("submitting") : editform ? "Update" : "Sumbit"}
            disabled={isSubmitting ? true : false}
          />
          {!editform && (
            <Button
              type="button"
              color="danger"
              buttonName={t("clear")}
              clickHandler={() => handleClear()}
            />
          )}
          {editform && (
            <Button
              type="button"
              color="danger"
              buttonName={t("cancel")}
              clickHandler={() => handleCancel()}
            />
          )}
        </div>
      </div>
    </form>
  );
};

export default withTranslation()(MasterContentForm);
