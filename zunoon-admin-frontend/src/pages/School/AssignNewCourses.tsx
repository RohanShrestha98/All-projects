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
import ErrorPages from "../../components/ErrorPages/ErrorPages";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import { ICourse } from "../../@types/course";
import ConvertArrayToString from "../../utils/convertArrayToString";

const schoolApi = config.endpoints.api.school;
const courseApi = config.endpoints.api.course;
const globalApi = config.endpoints.api.global;

function AssignedCourses({ t }) {
  const { fetchedData, fetchNewData, loading, error } = useFetch();
  const { fetchedData: fetchedAssignedCourses, fetchNewData: fetchNewAssignedCourses } = useFetch();
  const [watchGrade, setWatchGrade] = useState("");
  const [courses, setCourses] = useState<ICourse[] | null>();
  const [assignedCourses, setAssignedCourses] = useState<any[]>();
  const [levelData, setLevelData] = useState<any>();

  const { state } = useLocation();
  const { id } = state;

  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();

  useEffect(() => {
    fetchNewAssignedCourses(schoolApi.courseList(id));
  }, [fetchNewAssignedCourses, id]);

  useEffect(() => {
    setAssignedCourses(fetchedAssignedCourses.data);
    getLevelData(fetchedAssignedCourses.data);
  }, [fetchedAssignedCourses]);

  useEffect(() => {
    fetchNewData(courseApi.list);
  }, [fetchNewData, fetchedAssignedCourses]);

  useEffect(() => {
    const assignedCourseIds = fetchedAssignedCourses && fetchedAssignedCourses?.data?.map(each => each.id);
    setCourses(fetchedData?.data?.filter(each => !assignedCourseIds?.includes(each?.id)));

  }, [fetchedData, assignedCourses]);

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

  const handleAssign = () => {
    http
      .POST(schoolApi.assignCourse, {
        schools: [id],
        courses: assignedCoursesList,
        grade: watchGrade,
      })
      .then(() => {
        toast.success(`${t("th_course")} ${t("assigned_successfully")}`);

        navigate("../");
      })
      .catch(error => {
        if (error?.response?.data?.errors?.grade) {
          toast.error(error?.response?.data?.errors?.grade);
        } else {
          toast.error(
            error?.response?.data?.errors
              ? ConvertArrayToString(Object?.values(error?.response?.data?.errors))
              : error?.message?.toString(),
          );
        }
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
        <h4 className="page_title">{`${t("select")} ${t("course")}`}</h4>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <div className="search_wrapper">
            <Search
              handleSearch={handleSearch}
              setFilteredData={setCourses}
              setWatchValue={setWatchGrade}
            />
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
      </div>
      {assignedCoursesList?.length ? (
        <div className="unassign_banner">
          {assignedCoursesList.length} {t("courses_selected")}
          <div className="unassign_button">
            <Button
              type="submit"
              color="success"
              buttonName={`${t("assign")}`}
              clickHandler={handleSubmit(handleAssign)}
              iconName="bx bx-unlink"
            />
          </div>
        </div>
      ) : null}
      <Form>
        <div className="assigned_courses d-flex gap-4 flex-wrap">
          {courses &&
            courses?.map(course => (
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
                  value={course.id}
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
                    {course.description.length > 100
                      ? `${course.description.slice(0, 100)}...`
                      : course.description ||
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
