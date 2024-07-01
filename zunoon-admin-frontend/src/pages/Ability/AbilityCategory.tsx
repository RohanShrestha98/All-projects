import Search from "../../components/Search/Search";
import Button from "../../components/Button/Button";
import { withTranslation } from "react-i18next";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Tables from "../../components/Tables/Tables";
import Pagination from "../../components/Pagination/Pagination";
import useFetch from "../../hooks/useFetch";
import toast from "../../utils/toast";
import AbilityCategoryForm from "./AbilityCategoryForm";
import AddAbilityCategory from "./AddAbilityCategory";
import useHandleClickOutside from "../../hooks/useHandleClickOutside";
import config from "../../config";
import http from "../../utils/http";
import { IAbilityCategory } from "../../@types/abilityCategory";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { Modal } from "react-bootstrap";
import { faEdit, faTrashCan } from "@fortawesome/free-solid-svg-icons";

const abilityCategoryApi = config.endpoints.api.abilityCategory;
const globalApi = config.endpoints.api.global;

const AbilityCategory = ({ t }) => {
  const selectedElementRef = useRef<null | HTMLDivElement>(null);
  const wrapperRef = useRef();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [abilityCategory, setAbilityCategory] = useState<IAbilityCategory[] | null>();
  const [totalPageNumber, setTotalPageNumber] = useState<number>(0);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [selectedAbilityCategory, setSelectedAbilityCategory] = useState<any>();

  const { loading, error, fetchedData, fetchNewData } = useFetch();

  useHandleClickOutside(wrapperRef, { toggle: () => setIsFormOpen(false) });

  useEffect(() => {
    fetchNewData(abilityCategoryApi.list);
  }, [fetchNewData]);

  useEffect(() => {
    if (fetchedData?.data) {
      setAbilityCategory(fetchedData?.data);
      setTotalPageNumber(fetchedData?.totalPage);
      setCurrentPageNumber(fetchedData.currentPage);
    } else {
      setAbilityCategory(null);
    }
  }, [fetchedData]);

  const columns = [
    {
      Header: `${t("type")}`,
      accessor: "type",
      Cell: ({ row }) => {
        const original = row?.original;
        return <CustomTooltip original={original?.type} id={original?.id} />;
      },
    },
    {
      Header: `${t("th_action")}`,
      accessor: "action",
      disableSortBy: true,
      Cell: tableProps => {
        const original = tableProps?.row?.original;
        return (
          <>
            <td className="actions">
              <FontAwesomeIcon
                onClick={() => {
                  setShowEditModal(true);
                  setSelectedAbilityCategory(original);
                }}
                className="edit_btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                icon={faEdit}
              />
              <FontAwesomeIcon
                onClick={() => {
                  setShowDeleteModal(true);
                  setSelectedAbilityCategory(original);
                }}
                className="trash_btn"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
                icon={faTrashCan}
              />
            </td>
          </>
        );
      },
    },
  ];

  const handleClickSubmit = (data: IAbilityCategory) => {
    const postData = {
      type: data.type,
    };
    setIsSubmitting(true);
    http
      .POST(abilityCategoryApi.create, postData)
      .then(res => {
        toast.success(`${t("sidebar_ability_category")} ${t("added_successfully")}!`);
        setIsFormOpen(false);
        fetchNewData(abilityCategoryApi.list);
      })
      .catch(error => {
        toast.error(error);
        setIsSubmitting(false);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleSearch = useMemo(() => {
    return async (searchText: string) => {
      if (searchText === "") {
        return fetchNewData(abilityCategoryApi.list);
      }

      try {
        const response = await http.POST(globalApi.search, {
          query: searchText,
          model: "ability_category",
        });

        setAbilityCategory(response && response?.data?.data);
        setTotalPageNumber(response?.data?.totalPage);
        setCurrentPageNumber(response?.data?.currentPage);
      } catch (err) {
        setAbilityCategory(null);
        toast.error(err?.message?.toString());
      }
    };
  }, []);

  const toggleModal = () => {
    setShowEditModal(!showEditModal);
  };

  const handleClose = () => setShowDeleteModal(false);

  const handleDelete = async (id: string) => {
    try {
      const response = await http.REMOVE(abilityCategoryApi.delete(id));
      if (response.status === 200) {
        toast.success(`${t("sidebar_ability_category")} ${t("deleted_successfully")}`);
        if (selectedElementRef.current) {
          const selectedElement = selectedElementRef?.current;
          selectedElement.style.animationName = "fade-out";
          setTimeout(() => {
            setAbilityCategory(categories => {
              return categories.filter(category => (category.id !== id ? category : null));
            });
            fetchNewData(abilityCategoryApi.list);
            selectedElement.style.animationName = "none";
          }, 1000);
        }
      } else {
        toast.error(new Error(`${t("error_in_deleting_the")} ${t("sidebar_ability_category")}`));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleClickUpdate = toggleModal => data => {
    setIsSubmitting(true);
    async function pushUpdate() {
      try {
        const response = await http.PATCH(abilityCategoryApi.update(data.id), data);
        if (response.status === 200) {
          toggleModal();
          fetchNewData(abilityCategoryApi.list);
          toast.success(` ${t("sidebar_ability_category")} ${t("updated_successfully")}`);
        } else {
          toast.error(new Error(`${t("error_in_updating")} ${t("sidebar_ability_category")}`));
        }
      } catch (error) {
        toast.error(error);
      }
      setIsSubmitting(false);
    }
    pushUpdate();
  };

  const handlePageChange = (pageNumber: number) => {
    setAbilityCategory([]);
    fetchNewData(`${abilityCategoryApi.list}?page=${pageNumber}`);
  };

  if (error) {
    toast.error(error);
  }

  return (
    <>
      <div className="page_header">
        <div className="d-flex flex-column gap-3 w-100" ref={wrapperRef}>
          <div className="d-flex align-items-center justify-content-between">
            <h4 className="page_title">{t("ability_categories")}</h4>
            <div className="header_actions">
              <div className="search_wrapper">
                <Search handleSearch={handleSearch} />
              </div>
              <div className="button_wrapper">
                <Button
                  type="button"
                  clickHandler={() => {
                    setIsFormOpen(true);
                  }}
                  buttonName={`${t("add")} ${t("sidebar_ability_category")}`}
                  color="success"
                />
              </div>
            </div>
          </div>
          <div>
            <AddAbilityCategory
              setIsFormOpen={setIsFormOpen}
              isFormOpen={isFormOpen}
              handleClickSubmit={handleClickSubmit}
            />
          </div>
        </div>
      </div>
      <div className={`table_container ability_category_container  ${isFormOpen && "mt-0"}`}>
        <Tables
          data={abilityCategory}
          hasError={error}
          columns={columns}
          isFetching={loading}
          isLoading={isSubmitting}
          formToEdit={<AbilityCategoryForm />}
          handleDelete={handleDelete}
          handleClickUpdate={() => handleClickUpdate}
          selectedElementRef={selectedElementRef}
          hasCheckBox={false}
          disableDelete={false}
          hasActions={false}
        />
      </div>
      {abilityCategory && abilityCategory?.length ? (
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
        onHide={toggleModal}
        dialogClassName={"modal_container"}
        centered
      >
        <Modal.Header className="modalTitle" closeButton>
          <Modal.Title>{`${t("update")} ${t("sidebar_ability_category")}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalBody">
          {React.cloneElement(<AbilityCategoryForm handleClickUpdate={() => handleClickUpdate} />, {
            data: selectedAbilityCategory,
            editform: 1,
            handleCancel: toggleModal,
            loading,
          })}
        </Modal.Body>
      </Modal>
      <DeleteModal
        isDeactivate={false}
        show={showDeleteModal}
        handleClose={handleClose}
        id={selectedAbilityCategory && selectedAbilityCategory?.id}
        handleDelete={handleDelete}
        name={selectedAbilityCategory?.type}
      />
    </>
  );
};

export default withTranslation()(AbilityCategory);
