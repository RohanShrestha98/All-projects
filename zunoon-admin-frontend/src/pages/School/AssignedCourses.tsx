import React, { useEffect, useMemo, useState } from "react";
import Search from "../../components/Search/Search";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { withTranslation } from "react-i18next";
import { Card } from "react-bootstrap";
import "./AssignedCourses.scss";
import useFetch from "../../hooks/useFetch";
import config from "../../config";
import Form from "react-bootstrap/Form";

import { useForm } from "react-hook-form";
import http from "../../utils/http";
import toast from "../../utils/toast";
import { ICourse } from "../../@types/course";
import ErrorPages from "../../components/ErrorPages/ErrorPages";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";

const schoolApi = config.endpoints.api.school;
const globalApi = config.endpoints.api.global;

function AssignedCourses({ t }) {
  const { fetchedData, fetchNewData, loading, error } = useFetch();
  const [courses, setCourses] = useState<ICourse[] | null>();
  const [levelData, setLevelData] = useState<any>();

  const { state } = useLocation();
  const { id, name } = state;

  const [removeFilter, setRemoveFilter] = useState(false);

  const navigate = useNavigate();
  const { register, handleSubmit, watch, reset } = useForm();

  useEffect(() => {
    fetchNewData(schoolApi.courseList(id));
  }, [fetchNewData, id]);

  useEffect(() => {
    setCourses(fetchedData?.data);
    getLevelData(fetchedData.data);
  }, [fetchedData]);

  const getLevelData = data => {
    let tempData = {};
    data &&
      data?.map(each => {
        const levelName = each?.levels?.map(level => {
          return level.name;
        });
        if (levelName in tempData) {
          tempData[levelName].push(each);
        } else {
          tempData[levelName] = [each];
        }
      });
    setLevelData(tempData);
  };

  const watchAssignedCourses = watch("assignedCourses");

  const assignedCoursesList =
    typeof watchAssignedCourses === "string" ? [watchAssignedCourses] : watchAssignedCourses;

  const handleUnassign = data => {
    http
      .POST(schoolApi.unassignCourse, { school: id, courses: assignedCoursesList })
      .then(() => {
        toast.success(`${t("th_course")} ${t("unassigned_successfully")}`);
        setCourses(courses.filter(each => !data.assignedCourses.includes(each.id)));
        fetchNewData(schoolApi.courseList(id));
        reset();
      })
      .catch(error => {
        toast.error(error);
      });
  };

  const handleSearch = useMemo(() => {
    return async (searchText: string) => {
      if (searchText === "") {
        return fetchNewData(schoolApi.courseList(id));
      }
      try {
        const response = await http.POST(globalApi.search, {
          query: searchText,
          model: "course",
        });
        setCourses(response && response?.data?.data);
      } catch (err) {
        toast.error(err.toString());
        setCourses(null);
      }
    };
  }, []);

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{t("courses_assigned_to")} {name}</h4>
        <div className="search_wrapper">
          <div className="d-flex">
            <Search
              removeFilter={removeFilter}
              handleSearch={handleSearch}
              setFilteredData={setCourses}
              setRemoveFilter={setRemoveFilter}
              // setTotalPageNumber={setTotalPageNumber}
              // setCurrentPageNumber={setCurrentPageNumber}
            />
          </div>
        </div>
        <div className="button_wrapper mr-5">
          <Button
            type="button"
            color="success"
            buttonName={`< ${t("back")}`}
            clickHandler={() => navigate("../")}
          />
        </div>
      </div>
      {assignedCoursesList?.length ? (
        <div className="unassign_banner">
          {assignedCoursesList.length} {t("courses_selected")}
          <div className="unassign_button">
            <Button
              type="submit"
              color="danger"
              buttonName={`${t("unassign")}`}
              clickHandler={handleSubmit(data => {
                handleUnassign(data);
              })}
              iconName="bx bx-unlink"
            />
          </div>
        </div>
      ) : null}
      <Form>
        <div className="assigned_courses d-flex gap-4 flex-wrap">
          {courses?.map(course => (
            <Card
              key={course.id}
              className="course_card"
              style={{ width: "16rem", padding: "8px" }}
            >
              <Form.Check
                inline
                name="assignedCourses"
                type="checkbox"
                id={`inline-checkbox-1`}
                value={course?.id}
                {...register("assignedCourses")}
                className="course_check"
              />
              <Card.Img variant="top" src="/vdoFallback.jpg" />
              <Card.Body className="px-0 pb-0">
                <Card.Title style={{ fontSize: "12px" }} className="title">
                  <CustomTooltip
                    original={course?.name || "Card Title"}
                    id={course?.id}
                    isApproved={course?.isApproved}
                    data={levelData && levelData}
                  />
                </Card.Title>
                <Card.Text style={{ fontSize: "10px" }}>
                  {course?.description?.length > 100
                    ? `${course?.description?.slice(0, 100)}...`
                    : course?.description ||
                      "Some quick example text to build on the card title and make up the bulk of the card's content."}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
          <ErrorPages isFetching={loading} data={courses} error={error} />
        </div>
      </Form>
    </>
  );
}

export default withTranslation()(AssignedCourses);
