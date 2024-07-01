import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import http from "../../utils/http";
import Button from "../../components/Button/Button";
import Tables from "../../components/Tables/Tables";
import UnitForm from "./UnitForm/UnitForm";
import { faClose, faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import toast from "../../utils/toast";
import { PATH } from "../../constants/routes";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Search from "../../components/Search/Search";
import Pagination from "../../components/Pagination/Pagination";
import "./Unit.scss";
import config from "../../config";
import { withTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Dropdown, DropdownButton, Modal } from "react-bootstrap";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { convertToOptions } from "../../utils/convertToSelectOptions";
import { getPermissions } from "../../utils/storage";
import { optionType } from "../../@types/option";
import UtcDateConverter from "../../utils/utcDateConverter";
import { handleInfiniteScroll } from "../../utils/handleInfiniteScroll";
import InputField from "../../components/InputField/InputField";
import { InfiniteScrollSelect } from "../../components/CustomSelect/InfiniteScrollSelect";
import { ICourse } from "../../@types/course";
import ToggleButton from "../../components/ToggleButton/ToggleButton";

const unitApi = config.endpoints.api.unit;
const courseApi = config.endpoints.api.course;
const careerApi = config.endpoints.api.career;
const gradeApi = config.endpoints.api.grade;
const globalApi = config.endpoints.api.global;
const levelApi = config.endpoints.api.level;
const gradeCategoryApi = config.endpoints.api.gradeCategory;


interface IUnit {
  id: string;
  name: string;
  description: string;
  thumbnail: null | string | HTMLInputElement;
  t?: Function;
}
function Unit({ t }) {
  const [isAssigned, setIsAssigned] = useState<boolean>(false);
  const isAdmin = getPermissions()[0]?.name === "Any";

  const unitPermissions = getPermissions()
    .filter(each => each.url.path.includes("unit"))
    .map(each => each.url.path);

  const mutatePermissions = ["/unit/update/", "/unit/delete/", "/unit/skills/"];

  const hasMutate = mutatePermissions.some(value => {
    return unitPermissions.includes(value);
  });

  const dropdownPermissions = ["/unit/skills/"];

  const hasDropDown = dropdownPermissions.some(value => {
    return unitPermissions.includes(value);
  });

  const selectedElementRef = useRef<null | HTMLElement>(null);
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState<IUnit>();

  const [unit, setUnit] = useState<IUnit[] | null>();
  const [isFormUpdating, setIsFormUpdating] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAssignUnitModal, setShowAssignUnitModal] = useState<boolean>(false);

  const [selectedGrade, setSelectedGrade] = useState<optionType | null>();
  const [gradeCurrentPage, setGradeCurrentPage] = useState(1);
  const [gradeTotalPage, setGradeTotalPage] = useState(0);
  const [gradeOptions, setGradeOptions] = useState<optionType[]>([]);
  const [selectedGradeCategory, setSelectedGradeCategory] = useState<any>();
  const [gradeByGradeCategory, setGradeByGradeCategory] = useState<any>();
  const [selectedCourse, setSelectedCourse] = useState<any>();
  const [selectedCareer, setSelectedCareer] = useState<any>();
  const [courseCurrentPage, setCourseCurrentPage] = useState(1);
  const [careerCurrentPage, setCareerCurrentPage] = useState(1);
  const [courseTotalPage, setCourseTotalPage] = useState(0);
  const [careerTotalPage, setCareerTotalPage] = useState(0);
  const [courseOptions, setCourseOptions] = useState<optionType[]>([]);
  const [careerOptions, setCareerOptions] = useState<optionType[]>([]);

  const [selectedLevel, setSelectedLevel] = useState<optionType | null>();
  const [levelCurrentPage, setLevelCurrentPage] = useState(1);
  const [levelTotalPage, setLevelTotalPage] = useState(0);
  const [levelOptions, setLevelOptions] = useState<any>([]);
  const [removeFilter, setRemoveFilter] = useState(false);

  const [assignedUnits, setAssignedUnits] = useState([]);
  const [checkedUnits, setCheckedUnits] = useState([]);
  const [checkedUnitsWithIndexes, setCheckedUnitsWithIndexes] = useState([]);
  const [checkedUnitDetails, setCheckedUnitDetails] = useState<IUnit[] | null>();
  const [levelTypeOptions, setLevelTypeOptions] = useState<optionType[]>([]);
  const [noLevel, setNoLevel] = useState<boolean>(false);
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [isOptional, setIsOptional] = useState<boolean>(false);


  const handleClick = () => {
    setShowAssignUnitModal(!showAssignUnitModal);
    setSelectedCareer([])
    setSelectedCourse([])
    setSelectedGradeCategory([])
    setSelectedGrade([])
  };
  const { register, handleSubmit, setValue, watch } = useForm();

  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [totalPageNumber, setTotalPageNumber] = useState<number>(0);
  const { loading, error, fetchedData, fetchNewData } = useFetch();

  useEffect(() => {
    fetchNewData(unitApi.list);
  }, [fetchNewData]);

  useEffect(() => {
    if (fetchedData.data) {
      setUnit(fetchedData.data);
      setTotalPageNumber(fetchedData.totalPage);
      setCurrentPageNumber(fetchedData.currentPage);
    } else {
      setUnit(null);
    }
  }, [fetchedData, removeFilter]);

  const columns: any = [
    {
      Header: `${t("name")}`,
      accessor: "name",
      Cell: ({ row }) => {
        const original = row?.original;
        return <CustomTooltip original={original?.name} id={original?.id} />;
      },
    },
    {
      Header: `${t("th_description")}`,
      accessor: "description",
      Cell: ({ row }) => {
        const original = row?.original;
        return <CustomTooltip original={original?.description} id={original?.id} />;
      },
    },
  ];

  (hasMutate || isAdmin) &&
    columns.push({
      Header: `${t("th_action")}`,
      accessor: "action",
      disableSortBy: true,
      Cell: tableProps => {
        const original = tableProps.row.original;
        return (
          <td className="actions">
            {(unitPermissions.includes("/unit/update/") || isAdmin) && (
              <FontAwesomeIcon
                onClick={() => {
                  setShowEditModal(true);
                  setSelectedUnit(original);
                }}
                className="edit_btn"
                style={{
                  marginTop: "0.2rem",
                }}
                icon={faEdit}
              />
            )}
            {(unitPermissions.includes("/unit/delete/") || isAdmin) && (
              <FontAwesomeIcon
                onClick={() => {
                  setShowDeleteModal(true);
                  setSelectedUnit(original);
                }}
                className="trash_btn"
                style={{
                  marginTop: "0.2rem",
                }}
                icon={faTrashCan as IconProp}
              />
            )}
            {(hasDropDown || isAdmin) && (
              <DropdownButton
                id={`dropdown-variants-info-size-extra-small-no-caret`}
                variant=""
                title=""
                style={{ position: "relative", bottom: "4px" }}
              >
                {(unitPermissions.includes("/unit/skills/") || isAdmin) && (
                  <Dropdown.Item
                    onClick={() => {
                      navigate(PATH.ASSIGNED_SKILLS, {
                        state: { id: original.id, name: original.name },
                      });
                    }}
                  >
                    {t("view_assigned_skills")}
                  </Dropdown.Item>
                )}
              </DropdownButton>
            )}
          </td>
        );
      },
    });

  const handleDelete = async id => {
    try {
      const response = await http.REMOVE(unitApi.delete(id));
      if (response.status === 200) {
        toast.success(`${t("th_unit")} ${t("deleted_successfully")}`);
        if (selectedElementRef?.current) {
          const selectedElement = selectedElementRef?.current;
          selectedElement.style.animationName = "fade-out";
          setTimeout(() => {
            setUnit(unit => {
              return unit.filter(course => (course.id !== id ? course : null));
            });
            fetchNewData(unitApi.list);
            selectedElement.style.animationName = "none";
          }, 1000);
        }
      } else {
        toast.error(new Error("Error in deleting the unit"));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleLevelSelectChange = (data, e) => {
    setSelectedLevel(data);
    setValue("level", data.value);
  };

  const handleClickUpdate = toggleModal => data => {
    const levels = data.level;
    const grades = data.grade;
    const courseId = [data.course];
    const utcStartDate = UtcDateConverter(data?.startDate);
    const utcEndDate = UtcDateConverter(data?.endDate);
    data.startDate = new Date(utcStartDate);
    data.endDate = new Date(utcEndDate);
    const dataToBeSent = {
      ...data,
      grades: grades,
      levelid: levels,
      courseid: courseId,
    };
    const formData = new FormData();
    formData.append("levelid", dataToBeSent?.levelid);
    formData.append("id", dataToBeSent?.id);
    formData.append("name", data?.name);
    data?.index && formData.append("index", data?.index);
    formData.append("description", data.description);
    formData.append("thumbnail.fileName", data?.thumbnail?.fileName);
    formData.append("thumbnail.fileType", data?.thumbnail?.fileType);
    formData.append("thumbnail.id", data?.thumbnail?.id);
    formData.append("thumbnail.url", data?.thumbnail?.url);
    formData.append("startDate", data?.startDate?.toISOString());
    formData.append("endDate", data?.endDate?.toISOString());
    formData.append("grades", dataToBeSent?.grades);
    formData.append("courseid", dataToBeSent?.courseid);

    // if (!data?.thumbnail?.length) {
    //   delete data.thumbnail;
    // } else {
    //   if (typeof data.thumbnail === "string") {
    //     delete data.thumbnail;
    //   } else {
    //     data.thumbnail = data.thumbnail[0];
    //   }
    // }

    async function pushUpdate() {
      try {
        const response = await http.PUT_FILE(unitApi.update(data.id), formData);
        if (response.status === 200) {
          toggleModal();
          toast.success(`${t("th_unit")} ${t("updated_successfully")}`);
          fetchNewData(unitApi.list);
        } else {
          toast.error(new Error(t("error_in_updating_unit")));
        }
      } catch (error) {
        toast.error(error?.response?.data?.errors?.error);
      }
      setIsFormUpdating(false);
    }
    pushUpdate();
  };

  const handleSearch = useMemo(() => {
    return async searchText => {
      if (searchText === "") {
        return fetchNewData(unitApi.list);
      }
      try {
        const response = await http.POST(globalApi.search, {
          query: searchText,
          model: "unit",
        });
        setUnit(response?.data?.data);
        setTotalPageNumber(response?.data?.totalPage);
        setCurrentPageNumber(response?.data?.currentPage);
      } catch (err) {
        toast.error(err?.response?.data?.errors?.error?.toString() || t("error_in_searching_unit"));
        setUnit([]);
      }
    };
  }, []);
  const handlePageChange = (pageNumber: number) => {
    setUnit([]);
    fetchNewData(`${unitApi.list}?page=${pageNumber}`);
  };

  const handleSelectedRows = selectedRows => {
    if (checkedUnits?.toString() !== selectedRows?.toString()) setCheckedUnits(selectedRows);
  };

  const watchGrade = watch("grade");
  const watchCareer = watch("career");
  const watchCourse = watch("course");


  useEffect(() => {
    setSelectedLevel(null);

    if (selectedCourse) {
      const selectedCourseData = courses?.find(course => course.id === selectedCourse?.value);
      if (selectedCourseData?.hasLevel) {
        setNoLevel(false);
        const levelOptions = selectedCourseData?.levels;
        setLevelOptions(convertToOptions(levelOptions));
      } else {
        setNoLevel(true);
        setLevelOptions([]);
      }
    } else {
      setNoLevel(true);
      setLevelOptions([]);
    }
  }, [selectedCourse, courses]);

  useEffect(() => {
    setSelectedCourse(null);
    setValue("course", undefined);

    async function getCourses() {
      if (isOptional) {
        const response = await http.GET(`${courseApi.list}?page=${courseCurrentPage}&&isOptional=${true}`, "");
        const newOptions = convertToOptions(response?.data?.data) || [];
        setCourseOptions(newOptions);
      }
      else if (watchCareer) {
        const response = await http.GET(
          `${courseApi.listByCareer(watchCareer)}?page=${courseCurrentPage}`,
          "",
        );
        setCourses(response?.data?.data);
        setCourseTotalPage(response?.data?.totalPage);
        setCourseCurrentPage(response?.data?.currentPage);
        const newOptions = convertToOptions(response?.data?.data) || [];
        setCourseOptions(newOptions);
      } else if (!watchCareer && watchGrade) {
        const response = await http.GET(
          `${courseApi.listByGrade(watchGrade)}?page=${courseCurrentPage}`,
          "",
        );
        setCourses(response?.data?.data);
        setCourseTotalPage(response?.data?.totalPage);
        setCourseCurrentPage(response?.data?.currentPage);
        const newOptions = convertToOptions(response?.data?.data) || [];
        setCourseOptions(newOptions);
      } else {
        const response = await http.GET(`${courseApi.list}?page=${courseCurrentPage}`, "");
        const newCourses = [...courses, ...response?.data?.data];
        const uniqueCourse = Array.from(new Set(newCourses.map(item => item.id))).map(value =>
          newCourses.find(option => option.id === value),
        );
        setCourses(uniqueCourse);
        setCourseTotalPage(response?.data?.totalPage);
        setCourseCurrentPage(response?.data?.currentPage);
        const newOptions = convertToOptions(response?.data?.data) || [];
        const combinedOptions = [...newOptions, ...courseOptions];
        const uniqueOptions = Array.from(new Set(combinedOptions.map(option => option.value))).map(
          value => combinedOptions.find(option => option.value === value),
        );
        setCourseOptions(uniqueOptions);
      }
    }
    getCourses();
  }, [watchGrade, watchCareer, courseCurrentPage, isOptional]);
  useEffect(() => {
    setSelectedLevel(null);

    if (selectedCourse) {
      const selectedCourseData = courses?.find(course => course.id === selectedCourse?.value);
      if (selectedCourseData?.hasLevel) {
        setNoLevel(false);
        const levelTypeOptions = selectedCourseData?.levels?.[0]?.type;
        setLevelTypeOptions(convertToOptions([levelTypeOptions]));
        const levelOptions = selectedCourseData?.levels;
        setLevelOptions(convertToOptions(levelOptions));
      } else {
        setNoLevel(true);
        setLevelOptions([]);
        setLevelTypeOptions([]);
      }
    } else {
      setNoLevel(true);
      setLevelOptions([]);
      setLevelTypeOptions([]);
    }
  }, [selectedCourse, courses]);

  useEffect(() => {
    if (showAssignUnitModal) {
      async function fetchData() {
        const response = await http.GET(`${gradeApi.list}?page=${gradeCurrentPage}`, "");
        setGradeTotalPage(response?.data?.totalPage);
        setGradeCurrentPage(response?.data?.currentPage);
        const newOptions = convertToOptions(response?.data?.data);
        const combinedOptions = [...newOptions, ...gradeOptions];
        const uniqueOptions = Array.from(new Set(combinedOptions.map(option => option.value))).map(
          value => combinedOptions.find(option => option.value === value),
        );
        setGradeOptions(uniqueOptions);
      }
      fetchData();
    }
  }, [gradeCurrentPage, showAssignUnitModal]);

  useEffect(() => {
    setValue("course", undefined);
    if (showAssignUnitModal) {
      async function getCourses() {
        try {
          if (isOptional) {
            const response = await http.GET(`${courseApi.list}?page=${courseCurrentPage}&&isOptional=${true}`, "");
            const newOptions = convertToOptions(response?.data?.data) || [];
            setCourseOptions(newOptions);
          }
          else if (watchGrade && !watchCareer) {
            const response = await http.GET(
              `${courseApi.listByGrade(watchGrade)}?page=${courseCurrentPage}`,
              "",
            );
            setCourseTotalPage(response?.data?.totalPage);
            setCourseCurrentPage(response?.data?.currentPage);
            const newOptions = convertToOptions(response?.data?.data) || [];
            setCourseOptions(newOptions);
          } else if (watchCareer) {
            const response = await http.GET(
              `${courseApi.listByCareer(watchCareer)}?page=${courseCurrentPage}`,
              "",
            );
            setCourseTotalPage(response?.data?.totalPage);
            setCourseCurrentPage(response?.data?.currentPage);
            const newOptions = convertToOptions(response?.data?.data) || [];
            setCourseOptions(newOptions);
          } else {
            const response = await http.GET(`${courseApi.list}?page=${courseCurrentPage}`, "");
            setCourseTotalPage(response?.data?.totalPage);
            setCourseCurrentPage(response?.data?.currentPage);
            const newOptions = convertToOptions(response?.data?.data) || [];
            const combinedOptions = [...newOptions, ...courseOptions];
            const uniqueOptions = Array.from(
              new Set(combinedOptions.map(option => option.value)),
            ).map(value => combinedOptions.find(option => option.value === value));
            setCourseOptions(uniqueOptions);
          }
        } catch (err) {
          toast.error(err);
        }
      }
      getCourses();
    }
  }, [watchGrade, courseCurrentPage, showAssignUnitModal, watchCareer, isOptional]);


  useEffect(() => {
    setValue("career", undefined);
    if (showAssignUnitModal) {
      async function getCareers() {
        try {
          if (watchGrade) {
            const response = await http.GET(
              `${careerApi.careerByGrade(watchGrade)}?page=${careerCurrentPage}`,
              "",
            );
            setCareerTotalPage(response?.data?.totalPage);
            setCareerCurrentPage(response?.data?.currentPage);
            const newOptions = convertToOptions(response?.data?.data) || [];
            setCareerOptions(newOptions);
          } else {
            const response = await http.GET(`${careerApi.list}?page=${careerCurrentPage}`, "");
            setCareerTotalPage(response?.data?.totalPage);
            setCareerCurrentPage(response?.data?.currentPage);
            const newOptions = convertToOptions(response?.data?.data) || [];
            const combinedOptions = [...newOptions, ...courseOptions];
            const uniqueOptions = Array.from(
              new Set(combinedOptions.map(option => option.value)),
            ).map(value => combinedOptions.find(option => option.value === value));
            setCareerOptions(uniqueOptions);
          }
        } catch (err) {
          toast.error(err);
        }
      }
      getCareers();
    }
  }, [watchGrade, careerCurrentPage, showAssignUnitModal]);


  useEffect(() => {
    if (showAssignUnitModal && watchCourse) {
      async function fetchData() {
        const response = await http.GET(`${unitApi.listByCourse(watchCourse)}?page=${1}`, "");
        const levelData = response?.data?.data?.filter(item => {
          return item?.level === selectedLevel?.label;
        });
        setAssignedUnits(selectedLevel ? levelData : response?.data?.data);
      }
      fetchData();
    }
  }, [watchCourse, selectedLevel]);

  const toggleModal = () => {
    setShowAssignUnitModal(pre => !pre);
  };


  const handleGradeSelectChange = (data, e) => {
    setSelectedGrade(data);
    setValue("grade", data?.value);
    setCourseCurrentPage(1);
  };

  const handleCourseSelectChange = (data, e) => {
    setSelectedCourse(data);
    setValue("course", data?.value);
  };
  const handleCareerSelectChange = (data, e) => {
    setSelectedCareer(data);
    setValue("career", data?.value);
  };

  const onAssignedSubmit = data => {
    if (data) {
      http
        .POST(courseApi.assignUnit, {
          courses: !data?.course ? [] : [data?.course],
          level: data.level,
          units: checkedUnitsWithIndexes,
        })
        .then(res => {
          if (res?.data?.success) {
            setIsAssigned(true);
            toast.success(`${t("th_unit")} ${t("assigned_successfully")}`);
            setCheckedUnits([]);
            setSelectedGradeCategory([])
            setSelectedGrade([])
            setSelectedCourse([]);
            setSelectedCareer([]);
            toggleModal();
            const selection = document.querySelectorAll('input[type="checkbox"]');
            selection.forEach((checkbox: HTMLInputElement) => {
              checkbox.checked = true;
              checkbox.value = "off";
            });
          } else {
            toast.error(t("unit_assignment_failed_try_again"));
          }
        })
        .catch(error => {
          const errorMessage = Object?.values(error?.response?.data?.errors).join(", ");
          toast.error(errorMessage);
        });
    }
  };

  const handleLevelTypeSelectChange = (data, e) => {
    setSelectedLevel(data);
    setValue("level", data.value);
    setLevelOptions(convertToOptions(levelOptions.filter(each => each.type === data.value)));
  };

  useEffect(() => {
    const checkedUnitDetails = unit && unit?.filter(item => checkedUnits.includes(item.id));
    const limitedCheckedUnitDetails = checkedUnitDetails?.slice(0, 4);
    setCheckedUnitDetails(limitedCheckedUnitDetails);
  }, [checkedUnits]);

  const updateUnitIndex = (unitId: string, index: string) => {
    setCheckedUnitsWithIndexes(prevCheckedUnitsWithIndexes => {
      const filteredUnits = prevCheckedUnitsWithIndexes?.filter(item => item.id !== unitId);
      const updatedUnit = { id: unitId, index: Number(index) };
      return [...filteredUnits, updatedUnit];
    });
  };

  useEffect(() => {
    if (checkedUnits?.length > 0) {
      const initialCheckedUnitsWithIndexes = checkedUnitDetails?.map((item, id) => ({
        id: item.id,
        index: id + 1,
      }));
      setCheckedUnitsWithIndexes(initialCheckedUnitsWithIndexes);
    }
  }, [checkedUnits, checkedUnitDetails]);

  const gradeCategoryLoadOptions = async (searchQuery, loadedOptions, { page }) => {
    const gradeCategoryResponse = await http.GET(`${gradeCategoryApi.list}?page=${page}`, "");
    if (!gradeCategoryResponse?.data) {
      return {
        options: [],
        hasMore: false,
        additional: {
          page,
        },
      };
    }
    const gradeCategoryOptions = convertToOptions(gradeCategoryResponse?.data?.data);
    const filteredOptions = searchQuery
      ? gradeCategoryOptions.filter(option =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      : gradeCategoryOptions;

    const hasMore = gradeCategoryResponse?.data?.totalPage > gradeCategoryResponse?.data?.currentPage;
    return {
      options: filteredOptions,
      hasMore,
      additional: {
        page: hasMore ? page + 1 : page,
      },
    };
  };

  useEffect(() => {
    const getGradeByGradeCategory = async () => {
      const gradeByCategoryResponse = selectedGradeCategory?.value && await http.GET(`${gradeApi.list}?gradeCategory=${selectedGradeCategory?.value}`, "");
      const gardeByGradeCategoryOptions = convertToOptions(gradeByCategoryResponse?.data?.data)
      setGradeByGradeCategory(gardeByGradeCategoryOptions)
    }
    getGradeByGradeCategory()
  }, [selectedGradeCategory?.value])

  const handleGradeCategorySelect = value => {
    setSelectedGradeCategory(value);
    setSelectedGrade(null)
  };

  const handleClear = () => {
    setSelectedCourse(null);
    setSelectedGrade(null);
    setSelectedLevel(null);
  };

  if (error) {
    toast.error(error);
  }

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{t("sidebar_units")}</h4>
        <div className="header_actions">
          <div className="search_wrapper ">
            <div className="d-flex">
              <Search
                removeFilter={removeFilter}
                handleSearch={handleSearch}
                setRemoveFilter={setRemoveFilter}
                setFilteredData={setUnit}
                setTotalPageNumber={setTotalPageNumber}
                setCurrentPageNumber={setCurrentPageNumber}
              />
            </div>
          </div>
          {(unitPermissions.includes("/unit/create/") || isAdmin) && (
            <div className="button_wrapper ">
              <Link to={PATH.ADD_UNIT}>
                <Button
                  buttonName={`${t("add")} ${t("unit")}`}
                  color="success"
                  type="button"
                  clickHandler={() => { }}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
      {checkedUnits?.length ? (
        <div className="unassign_banner">
          {checkedUnits?.length} {t("th_unit")} {t("selected")}
          <div className="unassign_button">
            <Button
              type="submit"
              color="success"
              buttonName={`${t("assign_to_course")}`}
              clickHandler={toggleModal}
              iconName="bx bx-unlink"
            />
          </div>
        </div>
      ) : null}
      <div className="table_container unit_table_container">
        <Tables
          data={unit}
          hasError={error}
          columns={columns}
          isFetching={loading}
          isLoading={isFormUpdating}
          formToEdit={<UnitForm />}
          handleDelete={handleDelete}
          hasCheckBox={true}
          handleClickUpdate={() => handleClickUpdate}
          selectedElementRef={selectedElementRef}
          onSelectRows={handleSelectedRows}
          hasActions={false}
          isAssigned={isAssigned}
          setIsAssigned={setIsAssigned}
        />
      </div>

      {showAssignUnitModal && (
        <div className="sidebarFilterTotal">
          <div className="sidebarFilterOverlay" onClick={handleClick}></div>
          <div className="sidebarFilter">
            <div className="sidebarFilterTitle">
              <h1>{t("assign_unit_to_course")}</h1>
              <FontAwesomeIcon icon={faClose} className="cancel_button" onClick={handleClick} />
            </div>

            <form onSubmit={handleSubmit(onAssignedSubmit)} className="sidebarFilterfilter">
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <div className="grade_select">
                  <InfiniteScrollSelect
                    id="grade_category"
                    register={register}
                    disabled={isOptional}
                    name="grade_category"
                    label={t("th_grade_category")}
                    placeholder={t("select_a_grade_category")}
                    value={selectedGradeCategory}
                    handleChange={handleGradeCategorySelect}
                    loadOptions={gradeCategoryLoadOptions}
                  />
                </div>
                <div className="level_dropdown">
                  <CustomSelect
                    id="grade"
                    register={register}
                    name="grade"
                    label={t("th_grade")}
                    disabled={isOptional}
                    value={selectedGrade}
                    placeholder={t("select_a_grade")}
                    handleChange={(e, data) => handleGradeSelectChange(e, data)}
                    options={selectedGradeCategory ? gradeByGradeCategory : gradeOptions}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(gradeTotalPage, gradeCurrentPage, setGradeCurrentPage)
                    }
                  />
                </div>
                <div className="level_dropdown">
                  <CustomSelect
                    id="career"
                    register={register}
                    name="career"
                    label={t("th_career")}
                    value={selectedCareer}
                    disabled={!selectedGrade || !careerOptions?.length || isOptional}
                    placeholder={t("select_a_career")}
                    handleChange={(e, data) => {
                      handleCareerSelectChange(e, data);
                    }}
                    options={careerOptions}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(careerTotalPage, careerCurrentPage, setCareerCurrentPage)
                    }
                  />
                </div>
                <div className="toggle_course_optional">
                  <label htmlFor="isOptional">{t("optional")}</label>
                  <ToggleButton
                    value={isOptional}
                    handleChange={() => {
                      setIsOptional(!isOptional);
                      handleClear()
                      setValue("isOptional", isOptional);
                    }}
                  />
                </div>

                <div className="level_dropdown">
                  <CustomSelect
                    id="course"
                    register={register}
                    name="course"
                    label={t("th_course")}
                    value={selectedCourse}
                    disabled={isOptional ? false : !careerOptions?.length ? !selectedGrade : !selectedCareer}
                    placeholder={t("select_a_course")}
                    handleChange={(e, data) => {
                      handleCourseSelectChange(e, data);
                    }}
                    options={courseOptions}
                    onMenuScrollToBottom={() =>
                      handleInfiniteScroll(courseTotalPage, courseCurrentPage, setCourseCurrentPage)
                    }
                  />
                </div>
                <div className="toggle_option_level">
                  <div className="level_dropdown">
                    <CustomSelect
                      id="leveltype"
                      disabled={true}
                      register={register}
                      name="leveltype"
                      label={t("level_type")}
                      placeholder={
                        !selectedCourse
                          ? t("select_a_level_type")
                          : noLevel
                            ? t("selected_course_has_no_level")
                            : "Select a level type"
                      }
                      value={levelTypeOptions?.[0]}
                      options={levelTypeOptions}
                    />
                  </div>
                  <div className="mt-2">
                    <CustomSelect
                      id="level"
                      disabled={noLevel}
                      register={register}
                      placeholder={
                        !selectedCourse
                          ? t("select_a_level")
                          : noLevel
                            ? t("selected_course_has_no_level")
                            : "Select a level"
                      }
                      name="level"
                      label={t("level")}
                      value={selectedLevel}
                      handleChange={(e, data) => {
                        handleLevelSelectChange(e, data);
                      }}
                      options={levelOptions}
                    />
                  </div>
                </div>
                {watchCourse &&
                  selectedCourse?.value !== undefined &&
                  assignedUnits?.length > 0 && (
                    <>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <span>
                          {assignedUnits?.length > 1 ? "Assigned Units" : "Assigned Unit"}
                        </span>
                        <span>{assignedUnits?.length > 1 ? "Indexes" : "Index"}</span>
                      </div>

                      <div className="index_container" key={new Date().toString()}>
                        {assignedUnits?.map((item, id) => (
                          <div
                            key={item.id}
                            style={{
                              display: "flex",
                              // flexDirection: "column",
                              justifyContent: "space-between",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <span style={{ width: "600px", marginTop: "12px" }}>{item.name}</span>
                            <span>{item?.index ?? (id + 1)?.toString()}</span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                {checkedUnits?.length > 0 && (
                  <>
                    <label>{t("checked_units")}</label>
                    <div className="index_container" key={new Date().toString()}>
                      {checkedUnitDetails?.map((item, id) => (
                        <div
                          key={item.id}
                          style={{
                            display: "flex",
                            // flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "10px",
                          }}
                        >
                          <span style={{ width: "1000px" }}>{item.name}</span>
                          <div style={{ width: "150px" }}>
                            <InputField
                              type="number"
                              min={1}
                              max={4}
                              value={
                                checkedUnitsWithIndexes?.find(unit => unit.id === item.id)?.index
                              }
                              onChange={e =>
                                updateUnitIndex(
                                  item.id,
                                  Number(e.target.value.trimStart()) <= 4 ? e.target.value : "",
                                )
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="searchButton" style={{ marginTop: "20px" }}>
                <Button type="submit" color="success" buttonName={t("assign")} />
              </div>
            </form>
          </div>
        </div>
      )}
      {unit && unit?.length ? (
        <div className="pages_container">
          <Pagination
            currentPageNumber={currentPageNumber}
            totalPageNumber={totalPageNumber}
            handlePageChange={handlePageChange}
          />
        </div>
      ) : null}

      <Modal
        size="lg"
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        dialogClassName={"modal_container"}
        centered
      >
        <Modal.Header className="modalTitle" closeButton>
          <Modal.Title>{t("update_unit")}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalBody">
          {React.cloneElement(<UnitForm handleClickUpdate={() => handleClickUpdate} />, {
            data: selectedUnit,
            editform: 1,
            handleCancel: () => setShowEditModal(false),
            loading,
          })}
        </Modal.Body>
      </Modal>

      <DeleteModal
        isDeactivate={false}
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        id={selectedUnit?.id}
        name={selectedUnit?.name}
        handleDelete={handleDelete}
      />
    </>
  );
}

Unit.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Unit);
