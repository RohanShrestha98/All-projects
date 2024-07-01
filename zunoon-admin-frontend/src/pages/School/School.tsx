import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Pagination from "../../components/Pagination/Pagination";
import http from "../../utils/http";
import toast from "../../utils/toast";
import Search from "../../components/Search/Search";
import { PATH } from "../../constants/routes";
import useFetch from "../../hooks/useFetch";
import SchoolForm from "./components/schoolForm/SchoolForm";
import "./School.scss";
import config from "../../config";
import { withTranslation } from "react-i18next";
import AssignForm from "./components/schoolForm/AssignForm";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import { ISchool } from "../../@types/school";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import { getPermissions } from "../../utils/storage";
import SchoolTable from "./components/schoolTable/SchoolTable";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

const schoolApi = config.endpoints.api.school;

function School({ t }) {
  const isAdmin = getPermissions()?.[0]?.name === "Any";

  const schoolPermissions = getPermissions()
    ?.filter(each => each.url.path.includes("school"))
    ?.map(each => each.url.path);

  const { loading, error, fetchedData, fetchNewData } = useFetch();
  const selectedElementRef = useRef<null | HTMLElement>(null);

  const [isAssignFormOpen, setIsAssignFormOpen] = useState<boolean>(false);

  const [schools, setSchools] = useState<ISchool[] | null>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [totalPageNumber, setTotalPageNumber] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    fetchNewData(schoolApi.list);
  }, [fetchNewData]);

  useEffect(() => {
    if (fetchedData.data) {
      setSchools(fetchedData.data);
      setTotalPageNumber(fetchedData.totalPage);
      setCurrentPageNumber(fetchedData.currentPage);
    } else {
      setSchools(null);
    }
  }, [fetchedData]);

  const columns = [
    {
      Header: t("th_name"),
      accessor: "name",
      Cell: ({ row }) => {
        const original = row?.original;
        return <CustomTooltip original={original?.name} id={original?.id} />;
      },
    },
    {
      Header: t("subDomain"),
      accessor: "subdomain",
    },

    {
      Header: t("taxPayerID"),
      accessor: "taxPayerID",
    },
    {
      Header: t("sector"),
      accessor: "sector",
      Cell: ({ row }) => {
        return capitalizeFirstLetter(row?.original?.sector);
      },
    },
    {
      Header: t("th_address"),
      accessor: "address1",
      Cell: ({ row }) => {
        const original =
          row?.original?.address?.address1 + "," + row?.original?.address?.municipality;
        return <CustomTooltip original={original} id={row?.original?.id} />;
      },
    },
    {
      Header: t("th_phone"),
      accessor: "cellPhone",
      Cell: ({ row }) => {
        return row?.original?.contact?.cellPhone;
      },
    },
  ];

  const handleToggleStatus = async id => {
    try {
      const response = await http.POST(schoolApi.toggleStatus(id), "");
      if (response.status === 200) {
        toast.success(t("school_status_change_successfully"));
        if (selectedElementRef?.current) {
          let selectedElement = selectedElementRef?.current;
          selectedElement.style.animationName = "fade-out";
          setTimeout(() => {
            setSchools(schools => {
              return schools.filter(school => (school.id !== id ? school : null));
            });
            fetchNewData(schoolApi.list);
            selectedElement.style.animationName = "none";
          }, 1000);
        }
      } else {
        toast.error(new Error(`${t("school")} ${t("error_in_deleting_the")}`));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleClickAssign = data => {
    setIsSubmitting(true);

    http
      .PATCH(schoolApi.assignCourse, data)
      .then(() => {
        toast.success(`${t("th_course")} ${t("assigned_successfully")}`);
        fetchNewData(schoolApi.list);
        setIsAssignFormOpen(false);
      })
      .catch(error => {
        toast.error(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleSearch = useMemo(() => {
    return async (searchText: string) => {
      if (searchText === "") {
        return fetchNewData(schoolApi.list);
      }
      try {
        const response = await http.POST(schoolApi.globalSearch, {
          query: searchText,
          model: "school",
        });

        setSchools(response && response?.data?.data);
        setTotalPageNumber(response?.data?.totalPage);
        setCurrentPageNumber(response?.data?.currentPage);
      } catch (err) {
        toast.error(err.toString());
        setSchools(null);
      }
    };
  }, []);

  const handlePageChange = pageNumber => {
    setSchools([]);
    fetchNewData(`${schoolApi.list}?page=${pageNumber}`);
  };

  if (error) {
    toast.error(error);
  }

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{t("sidebar_schools")}</h4>
        <div className="header_actions">
          <div className="search_wrapper ">
            <Search
              handleSearch={handleSearch}
              setTotalPageNumber={setTotalPageNumber}
              setCurrentPageNumber={setCurrentPageNumber}
              setFilteredData={setSchools}
            />
          </div>
          {(schoolPermissions?.includes("/school/create/") || isAdmin) && (
            <div className="button_wrapper d-flex">
              <Link to={PATH.ADD_SCHOOL}>
                <Button
                  buttonName={`${t("add")} ${t("school")}`}
                  color="success"
                  type="button"
                  clickHandler={() => {}}
                />
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="table_container school_table_container">
        <SchoolTable
          handleShowAssignModal={() => {
            setIsAssignFormOpen(true);
          }}
          handleViewAssignedCoursesModal={() => {}}
          data={schools && schools}
          assignAction={true}
          columns={columns}
          hasError={error}
          isFetching={loading}
          formToEdit={<SchoolForm />}
          handleToggleStatus={handleToggleStatus}
          // handleClickUpdate={() => handleClickUpdate}
          selectedElementRef={selectedElementRef}
          isLoading={isSubmitting}
          deactivateButton={true}
        />
      </div>
      {schools && schools?.length ? (
        <div className="pages_container">
          <Pagination
            totalPageNumber={totalPageNumber}
            handlePageChange={handlePageChange}
            currentPageNumber={currentPageNumber}
          />
        </div>
      ) : null}

      <Modal
        centered
        show={isAssignFormOpen}
        onHide={() => setIsAssignFormOpen(false)}
        className="modal-dialog-centered modal-lg"
      >
        <ModalHeader>{t("assign_courses")}</ModalHeader>
        <ModalBody>
          <AssignForm handleClickAssign={handleClickAssign} loading={isSubmitting} />
        </ModalBody>
      </Modal>
    </>
  );
}
export default withTranslation()(School);
