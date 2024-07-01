import { Modal } from "react-bootstrap";

import React, { useEffect, useState } from "react";

import "./ViewAssignedCoursesModal.scss";
import { withTranslation } from "react-i18next";
import useFetch from "../../../../hooks/useFetch";

import Button from "../../../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import http from "../../../../utils/http";

import config from "../../../../config";
import toasts from "../../../../utils/toast";
const schoolApi = config.endpoints.api.school;

type PropsType = {
  id?: number;
  name?: string;
  show?: boolean;
  handleClose: () => void;
  t: Function;
};

const ViewAssignedCoursesModal: React.FC<PropsType> = ({ id, name, show, handleClose, t }) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [currentID, setCurrentID] = useState<string>(""); // [course.id
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const { fetchedData, fetchNewData } = useFetch();

  useEffect(() => {
    fetchNewData(schoolApi.courseList(id));
  }, [fetchNewData, id]);

  useEffect(() => {
    setCourses(fetchedData.data);
  }, [fetchedData]);

  useEffect(() => {
    if (search) {
      const filteredCourses = courses.filter(course => {
        return course.name.toLowerCase().includes(search.toLowerCase());
      });
      setCourses(filteredCourses);
    } else {
      fetchNewData(schoolApi.courseList(id));
    }
  }, [search, courses, fetchNewData, id]);

  const handleRemoveCourse = () => {
    const tempCourseSet = courses.filter(course => {
      return course.id !== currentID;
    });

    http
      .PATCH(schoolApi.assignCourse, {
        school: id,
        courseset: [...tempCourseSet.map(course => course.id)],
      })
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          fetchNewData(schoolApi.courseList(id));
          toasts.success("Course removed successfully");
          setShowDeleteModal(false);
        }
      })
      .catch(error => {
        toasts.error(error.response.data.error || t("something_went_wrong"));
      });
  };

  return (
    <>
      <Modal className="modal-box" show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Courses of {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="assigned-courses">
            <input
              type="text"
              className="assigned-courses__search-bar"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <div className="assigned-courses__wrapper">
              {courses.map((course, index) => {
                return (
                  <div className="assigned-courses__wrapper__tags" key={index}>
                    <p>{course.name}</p>
                    {/* close icon fa */}
                    <FontAwesomeIcon
                      icon={faClose as IconProp}
                      className="assigned-courses__wrapper__tags__close-icon"
                      onClick={() => {
                        setShowDeleteModal(true);
                        setCurrentID(course.id);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {showDeleteModal && (
        <Modal
          className="modal-box"
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Remove Course</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to remove this course? You can add this again through assign
              course feature.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <div className="footer-buttons">
              <Button type="button" color="success" buttonName={"No"} clickHandler={handleClose} />
              <div className="btn_yes">
                <Button
                  type="button"
                  color="danger"
                  buttonName={t("Remove")}
                  clickHandler={handleRemoveCourse}
                />
              </div>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};
export default withTranslation()(ViewAssignedCoursesModal);
