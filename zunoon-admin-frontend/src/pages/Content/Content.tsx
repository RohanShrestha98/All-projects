import React, { useState, useEffect, useMemo, useRef, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import http from "../../utils/http";
import Button from "../../components/Button/Button";
import Tables from "../../components/Tables/Tables";
import "./Content.scss";
import ContentForm from "./components/contentForm/ContentForm";
import toast from "../../utils/toast";
import { PATH } from "../../constants/routes";
import useFetch from "../../hooks/useFetch";
import Pagination from "../../components/Pagination/Pagination";
import useHandleClickOutside from "../../hooks/useHandleClickOutside";
import config from "../../config";
import { withTranslation } from "react-i18next";
import Search from "../../components/Search/Search";
import crown from "../../assets/icons/crown.png";
import { RiArrowDropDownLine } from "react-icons/ri";
import InputField from "../../components/InputField/InputField";
import { getPermissions } from "../../utils/storage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { Modal } from "react-bootstrap";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
// import { Document, Page, pdfjs } from "react-pdf";
import ReactPlayer from "react-player";
import { IContentType } from "../../@types/content";
import QuizContentForm from "./components/contentForm/QuizContentForm";
import { ConvertHtmlToPlainText } from "../../utils/convertHtmlToPlainText";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import { Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Tooltip } from "react-tooltip";
import { useCheckContext } from "../../context/CheckContextProvider";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const contentApi = config.endpoints.api.content;
const basketApi = config.endpoints.api.basket;
const globalApi = config.endpoints.api.global;

function Content({ t }) {
  const isAdmin = getPermissions()?.[0]?.name === "Any";

  const [isContentAddedToBasket, setIsContentAddedToBasket] = useState<boolean>(false);
  // const retrievedArray = JSON.parse(localStorage.getItem('selectedContent'));


  const contentPermissions = getPermissions()
    ?.filter(each => each.url.path.includes("content"))
    ?.map(each => each.url.path);

  const mutatePermissions = ["/content/update/", "/content/delete/"];

  const hasMutate = mutatePermissions?.some(value => {
    return contentPermissions?.includes(value);
  });

  const dropdownPermissions = [];

  const hasDropDown = dropdownPermissions?.some(value => {
    return contentPermissions.includes(value);
  });

  const selectedElementRef = useRef<null | HTMLDivElement>(null);
  const wrapperRef = useRef();
  const basketInputRef = useRef(null);
  const basketSearchRef = useRef(null);

  const [content, setContent] = useState<IContentType[] | null>();
  const [checkedContents, setCheckedContents] = useState<string[]>([]);

  const { checkedValues, setCheckedValues } = useCheckContext();
  const [basketList, setBasketList] = useState([]);
  const [filteredBasket, setFilteredBasket] = useState([]);
  const [basketSearchTerm, setBasketSearchTerm] = useState<string | null>();
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [totalPageNumber, setTotalPageNumber] = useState<number>(0);
  const [isAssigned, setIsAssigned] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [selectedBasket, setSelectedBasket] = useState("");
  const [selectedContent, setSelectedContent] = useState<IContentType>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [isBasketLoading, setIsBasketLoading] = useState<boolean>(true);
  const [newBasketName, setNewBasketName] = useState<string>("");
  const [dropdownOpen, setDropDownOpen] = useState(false);
  const [addNewBasketClicked, setAddNewBasketClicked] = useState(false);
  const [videoPreview, setVideoPreview] = useState(false);
  const [subcontentClick, setSubContentClick] = useState(false);
  const [pdfNextPage, setPdfNextPage] = useState(1);
  const [subcontentClickDetails, setSubContentClickDetails] = useState<IContentType[]>([]);
  const [videoDetails, setVideoDetails] = useState<any>();
  const [previewDetails, setPreviewDetails] = useState<any>();
  const [changeBookUrl, setChangeBookUrl] = useState<any>();
  const [removeFilter, setRemoveFilter] = useState(false);



  const { loading, error, fetchedData, fetchNewData } = useFetch();

  useHandleClickOutside(wrapperRef, { toggle: () => setDropDownOpen(false) });

  const handleSelectedRows = (selectedRows: string[]) => {
    if (checkedContents.toString() !== selectedRows.toString()) {
      setCheckedContents(selectedRows);
      setCheckedValues(prevValues => [...new Set([...prevValues, ...selectedRows])]);
      // const prevCheckedValue = [...new Set([...checkedValues, ...selectedRows, selectedRows])]
      // const filteredValues = prevCheckedValue?.filter(value => checkedContents?.includes(value));
      // console.log("filteredValues", filteredValues)
      // localStorage.setItem('selectedContent', JSON.stringify(filteredValues));
    }
  };

  useEffect(() => {
    const filteredValues = checkedValues?.filter(value => checkedContents?.includes(value));
    setCheckedValues(filteredValues);

  }, [checkedContents]);
  const [updateContent, setUpdateContent] = useState(false)

  const basketPermissions = getPermissions()
    .filter(each => each.url.path.includes("basket"))
    .map(each => each.url.path);

  useEffect(() => {
    fetchNewData(contentApi.list);
  }, [fetchNewData]);

  useEffect(() => {
    if (fetchedData?.data) {
      setContent(fetchedData.data);
      setTotalPageNumber(fetchedData.totalPage);
      setCurrentPageNumber(fetchedData.currentPage);
    } else {
      setContent(null);
    }
  }, [fetchedData, removeFilter]);

  const getBasketData = async () => {
    setIsBasketLoading(true);
    try {
      const response = await http.GET(basketApi.list, "");
      setBasketList(response?.data?.data);
      setFilteredBasket(response?.data?.data);
      setIsBasketLoading(false);
    } catch (error) {
      toast.error(error.toString());
    }
  };
  const removeTags = str => {
    if (str === null || str === "") return false;
    else str = str?.toString();
    return str?.replace(/(<([^>]+)>)/gi, "");
  };

  useEffect(() => {
    if (contentPermissions?.includes("/basket/list/") || isAdmin) {
      getBasketData();
    }
  }, []);

  const columns: any = [
    {
      Header: `${t("th_name")}`,
      accessor: "title",
      Cell: ({ row }: any) => {
        let regexForHTML = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
        let isValid = regexForHTML.test(row?.original?.title);
        let splittedTitle = row?.original?.title?.split(/<\/?b>/);
        return row?.title ? (
          <div className="d-flex gap-1">
            {splittedTitle?.[0]}
            {isValid && (
              <div
                style={{ backgroundColor: "yellow" }}
                dangerouslySetInnerHTML={{
                  __html: `<p>${splittedTitle?.[1]}</p>`,
                }}
              />
            )}
            {splittedTitle?.[2]}
          </div>
        ) : (
          removeTags(row?.original?.title) || "-"
        );
      },
    },
    {
      Header: `${t("th_description")}`,
      accessor: "description",
      Cell: ({ row }: any) => {
        let regexForHTML = /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/;
        let isValid = regexForHTML.test(row?.original?.description);
        let splittedDescription = row?.original?.description?.split(/<\/?b>/);
        return row?.description && isValid ? (
          <div className="d-flex gap-1">
            {splittedDescription?.[0]}
            <div
              style={{ backgroundColor: "yellow" }}
              dangerouslySetInnerHTML={{
                __html: `<p>${splittedDescription?.[1]}</p>`,
              }}
            />
            {splittedDescription?.[2]}
          </div>
        ) : (
          removeTags(row?.original?.description) || "-"
        );
      },
    },
    {
      Header: `${t("th_has_subContent")}`,
      accessor: "subContents",
      Cell: ({ row }: any) => {
        return (
          <>
            {row?.hasSubContent ? (
              <p
                className="subcontent"
                onClick={() => {
                  setSubContentClick(!subcontentClick);
                  setSubContentClickDetails(row?.subContents);
                }}
              >
                {t("yes")}{" "}
              </p>
            ) : (
              <p>No</p>
            )}
          </>
        );
      },
    },
    {
      Header: `${t("th_content_type")}`,
      accessor: "contentType",
      Cell: ({ row }: any) => {
        return (
          <div className="content_type_crown">
            <p className="non_tooltip_data">{row?.original?.contentType}</p>
            {row?.original?.isFinalExam && <img className="crown_icon" src={crown} />}
          </div>
        );
      },
    },
    {
      Header: `${t("supply_content_type")}`,
      accessor: "supplyContentType",
      Cell: ({ row }: any) => {
        return (
          <p className="non_tooltip_data">
            {row?.original?.supplyContentType === 1
              ? "Obligatory"
              : row?.original?.supplyContentType === 2
                ? "Public"
                : row?.original?.supplyContentType === 3
                  ? "Private"
                  : "-"}
          </p>
        );
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
            <Tooltip
              place="top-start"
              id={`${original.id}/eye`}
              style={{
                position: "fixed",
                backgroundColor: "#a9aea8",
                fontSize: "12px",
                paddingBottom: "0.3rem",
                paddingTop: "0.3rem",
                maxWidth: "30%",
                zIndex: "80",
              }}
            />
            <FontAwesomeIcon
              onClick={() => {
                setVideoPreview(true);
                setPreviewDetails(original);
              }}
              className="eye_btn"
              style={{
                marginTop: "0.2rem",
              }}
              icon={faEye}
              data-tooltip-content={t("preview")}
              data-tooltip-id={`${original.id}/eye`}
            />

            {(contentPermissions.includes("/content/update/") || isAdmin) && (
              <>
                <Tooltip
                  place="top-start"
                  id={`${original.id}/edit`}
                  style={{
                    position: "fixed",
                    backgroundColor: "#00bad6",
                    fontSize: "12px",
                    paddingBottom: "0.3rem",
                    paddingTop: "0.3rem",
                    maxWidth: "30%",
                    zIndex: "80",
                  }}
                />
                <FontAwesomeIcon
                  onClick={() => {
                    setShowEditModal(true);
                    setSelectedContent(original);
                  }}
                  className="edit_btn"
                  style={{
                    marginTop: "0.2rem",
                  }}
                  icon={faEdit}
                  data-tooltip-content={t("edit")}
                  data-tooltip-id={`${original.id}/edit`}
                />
              </>
            )}
            {(contentPermissions.includes("/content/delete/") || isAdmin) && (
              <>
                <Tooltip
                  place="top-start"
                  id={`${original.id}/delete`}
                  style={{
                    position: "fixed",
                    backgroundColor: "#e91e62",
                    fontSize: "12px",
                    paddingBottom: "0.3rem",
                    paddingTop: "0.3rem",
                    maxWidth: "30%",
                    zIndex: "80",
                  }}
                />
                <FontAwesomeIcon
                  onClick={() => {
                    setShowDeleteModal(true);
                    setSelectedContent(original);
                  }}
                  className="trash_btn"
                  style={{
                    marginTop: "0.2rem",
                  }}
                  icon={faTrashCan}
                  data-tooltip-content={t("delete")}
                  data-tooltip-id={`${original.id}/delete`}
                />
              </>
            )}
          </td>
        );
      },
    });

  const handleDelete = async (id: string) => {
    try {
      const response = await http.REMOVE(contentApi.delete(id));
      if (response.status === 200) {
        toast.success(`${t("th_content")} ${t("deleted_successfully")}`);
        if (selectedElementRef.current) {
          const selectedElement = selectedElementRef?.current;
          selectedElement.style.animationName = "fade-out";
          setTimeout(() => {
            setContent(content => {
              return content.filter(content => (content.id !== id ? content : null));
            });
            fetchNewData(contentApi.list);
            selectedElement.style.animationName = "none";
          }, 1000);
        }
      } else {
        toast.error(new Error(`${t("error_in_deleting_the")} ${t("topic")}`));
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleAddNewContentBasket = () => {
    setIsSubmitting(true);
    const addContentToNewBasket = async () => {
      const data = {
        name: newBasketName,
        contents: checkedValues,
      };
      try {
        const response = await http.POST(`${basketApi.create}`, data);
        if (response.status === 200) {
          setNewBasketName("");
          setCheckedContents([]);
          setCheckedValues([]);
          getBasketData();
          toast.success(`${t("content_basket")} ${t("added_successfully")}`);
          setIsContentAddedToBasket(response?.data?.success || true);
          setSelectedBasket("");
          setAddNewBasketClicked(false);
          setDropDownOpen(false);
        } else {
          toast.error(new Error(t("error_in_creating_basket")));
        }
      } catch (error) {
        toast.error(error.toString());
      }
      setIsSubmitting(false);
    };
    addContentToNewBasket();
  };

  const keyDownHandler = event => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddNewContentBasket();
    }
  };

  const handleAddToExistingContentBasket = (selectedBasketId: number) => {
    setIsSubmitting(true);
    const addContentToExistingBasket = async () => {
      const data = {
        basketID: selectedBasketId,
        contentID: checkedValues,
      };
      try {
        const response = await http.POST(`${basketApi.addContentToExistingBasket}`, data);
        if (response.status === 200) {
          setCheckedContents([]);
          setCheckedValues([]);
          toast.success(`${t("content_basket")} ${t("added_successfully")}`);
          setIsContentAddedToBasket(response?.data?.success || true);
          setAddNewBasketClicked(false);
          setDropDownOpen(false);
          setSelectedBasket("");
        } else {
          toast.error(new Error(t("error_in_creating_basket")));
        }
      } catch (error) {
        toast.error(error.toString());
      }
      setIsSubmitting(false);
    };
    addContentToExistingBasket();
  };

  const handleClickUpdate = toggleModal => data => {
    setIsSubmitting(true);
    async function pushUpdate() {
      try {
        const response = await http.PATCH(`${contentApi.update}/${data.id}/`, data);
        if (response.status === 200) {
          toggleModal();
          fetchNewData(contentApi.list);
          toast.success(` ${t("topic")} ${t("updated_successfully")}`);
        } else {
          toast.error(new Error(t("error_in_updating_topic")));
        }
      } catch (error) {
        toast.error(error?.response?.data?.errors?.error);
      }
      setIsSubmitting(false);
    }
    pushUpdate();
  };

  const handleSearch = useMemo(() => {
    return async searchText => {
      if (searchText === "") {
        return fetchNewData(contentApi.list);
      }
      try {
        const response = await http.POST(globalApi.search, {
          query: searchText,
          model: "content",
        });
        setContent(response && response?.data?.data);
      } catch (err) {
        toast.error(err?.toString());
      }
    };
  }, []);

  const handlePageChange = (pageNumber: number) => {
    setContent([]);
    fetchNewData(`${contentApi.list}?page=${pageNumber}`);
  };

  const handleBasketSearch = (event: any) => {
    const { value } = event.target.trimStart();
    if (value === null) {
      const searchData = basketList;
      setBasketList([...searchData]);
    } else {
      const searchData = filteredBasket?.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      );
      setBasketList(searchData);
    }
    setBasketSearchTerm(value);
  };

  useEffect(() => {
    if (addNewBasketClicked) {
      basketInputRef?.current?.focus();
    } else if (dropdownOpen && !addNewBasketClicked) {
      basketSearchRef?.current?.focus();
    }
  }, [addNewBasketClicked, dropdownOpen]);

  if (error) {
    toast.error(error);
  }

  return (
    <>
      <div className="page_header">
        <h4 className="page_title">{t("sidebar_content")}</h4>
        <div className="header_actions">
          <div className="search_wrapper">
            <div className="d-flex">
              <Search
                removeFilter={removeFilter}
                handleSearch={handleSearch}
                setRemoveFilter={setRemoveFilter}
                setFilteredData={setContent}
                setTotalPageNumber={setTotalPageNumber}
                setCurrentPageNumber={setCurrentPageNumber}
              />
            </div>
          </div>

          {(contentPermissions?.includes("/content/create/") || isAdmin) && (
            <div className="button_wrapper">
              <Link to={PATH.ADD_CONTENT}>
                <Button
                  type="button"
                  clickHandler={() => { }}
                  buttonName={`${t("add")} ${t("sidebar_content")}`}
                  color="success"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
      {checkedValues?.length ? (
        <div className="unassign_banner">
          <span>
            {checkedValues?.length} {t("contents_selected")}
          </span>
          <div className="basket_dropdown_button_wrapper " ref={wrapperRef}>
            <div
              className="selected "
              onClick={() => {
                setDropDownOpen(!dropdownOpen);
              }}
            >
              <p onClick={() => setAddNewBasketClicked(false)} className=" lang-text">
                {selectedBasket ? selectedBasket : t("add_to_content_basket")}
              </p>
              <RiArrowDropDownLine
                style={
                  dropdownOpen
                    ? {
                      transform: "rotate(180deg)",
                      transition: "all 0.2s ease-in-out",
                    }
                    : { transition: "all 0.2s ease-in-out" }
                }
                size={28}
              />
            </div>
            {dropdownOpen && (
              <div className="options">
                <div className="option">
                  <div className={`lang-text ${addNewBasketClicked && "d-none"}`}>
                    <InputField
                      ref={basketSearchRef}
                      type="text"
                      onChange={e => handleBasketSearch(e)}
                      value={basketSearchTerm}
                      placeholder={`${t("search")} ${t("th_basket")}`}
                      onKeyUp={e => {
                        e.target.value = e?.target?.value?.trimStart();
                      }}
                    />
                  </div>
                  <p
                    className="lang-text"
                    onClick={() => {
                      setAddNewBasketClicked(!addNewBasketClicked);
                    }}
                  >
                    + {t("create_a_new_basket")}
                  </p>
                </div>
                <div>
                  {addNewBasketClicked && (
                    <InputField
                      ref={basketInputRef}
                      type="text"
                      placeholder={t("placeholder_basketName")}
                      value={newBasketName}
                      onKeyUp={e => keyDownHandler(e)}
                      onChange={e => setNewBasketName(e.target.value?.trimStart())}
                    />
                  )}
                </div>
                {basketList?.map(basket => (
                  <div
                    key={basket.id}
                    className="option"
                    onClick={() => {
                      setSelectedBasket(basket?.name);
                      setDropDownOpen(false);
                      handleAddToExistingContentBasket(basket?.id);
                    }}
                  >
                    <p className="basket_name">{basket?.name}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}
      <div className="table_container content_table_container">
        <Tables
          data={content}
          hasError={error}
          columns={columns}
          isFetching={loading}
          isLoading={isSubmitting}
          formToEdit={<ContentForm />}
          handleDelete={handleDelete}
          handleClickUpdate={handleClickUpdate}
          selectedElementRef={selectedElementRef}
          hasCheckBox={true}
          onSelectRows={handleSelectedRows}
          disableDelete={false}
          hasActions={false}
          isAssigned={isContentAddedToBasket}
          setIsAssigned={setIsContentAddedToBasket}
        />
      </div>
      {content && content?.length ? (
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
          <Modal.Title>{`${t("update")} ${t("content")}`}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modalBody">
          {React.cloneElement(
            selectedContent?.contentType === "QUESTIONNAIRE" ? (
              //@ts-ignore
              <QuizContentForm fetchNewContentData={fetchNewData} />
            ) : (
              <ContentForm handleClickUpdate={() => handleClickUpdate} />
            ),
            {
              data: selectedContent,
              editform: 1,
              currentPageNumber,
              setContent,
              handlePageChange: handlePageChange,
              setShowEditModal: setShowEditModal,
              showEditModal: showEditModal,
              handleCancel: () => setShowEditModal(false),
              loading,
            },
          )}
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={videoPreview}
        onHide={() => setVideoPreview(false)}
        dialogClassName={"modal_container"}
        centered
      >
        <Modal.Header className="modalTitle" closeButton>
          <Modal.Title>{ConvertHtmlToPlainText(previewDetails?.title?.slice(0, 50))}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modelContent">
          {previewDetails &&
            (previewDetails?.contentType === "BOOK" ||
              previewDetails?.contentType === "SUPPORTFILE") ? (
            <div>
              <div className="bookLevel">
                {previewDetails?.book1 && (
                  <p
                    className={`${(changeBookUrl === previewDetails?.book1?.url || !changeBookUrl) &&
                      "bookLevelActive"
                      }`}
                    onClick={() => setChangeBookUrl(previewDetails?.book1?.url)}
                  >
                    {t("book")} 1
                  </p>
                )}
                {previewDetails?.book2 && (
                  <p
                    className={`${changeBookUrl === previewDetails?.book2?.url && "bookLevelActive"
                      }`}
                    onClick={() => setChangeBookUrl(previewDetails?.book2?.url)}
                  >
                    {t("book")} 2
                  </p>
                )}
                {previewDetails?.book3 && (
                  <p
                    className={`${changeBookUrl === previewDetails?.book3?.url && "bookLevelActive"
                      }`}
                    onClick={() => setChangeBookUrl(previewDetails?.book3?.url)}
                  >
                    {t("book")} 3
                  </p>
                )}
              </div>
              <div className="pdfReaderHeading">
                <p>{previewDetails?.description}</p>
                {/* <div className="pdfNextButton">
                  <button
                    disabled={pdfNextPage === 1 && true}
                    onClick={() => setPdfNextPage(pdfNextPage - 1)}
                  >
                    {t("prev")}
                  </button>
                  <p>{pdfNextPage}</p>
                  <button onClick={() => setPdfNextPage(pdfNextPage + 1)}>{t("next")}</button>
                </div> */}
              </div>
              {/* <Document
                className="pdfViewer"
                file={changeBookUrl ?? previewDetails?.book1?.url}
                onLoadError={err => toast.error(err?.toString())}
              >
                <Page pageNumber={pdfNextPage} />
              </Document>{" "} */}
              <div className="pdf-viewer">

                <Viewer fileUrl={changeBookUrl ?? previewDetails?.book1?.url} />
              </div>
            </div>
          ) : previewDetails?.contentType === "IMAGE" ? (
            <div>
              <img
                src={previewDetails?.file?.url}
                alt={previewDetails?.file?.fileName}
                width={"100%"}
              />
            </div>
          ) : previewDetails?.contentType === "QUESTIONNAIRE" ? (
            <div className="previewModal">
              {previewDetails?.questions?.map((ques, index) => {
                const isCorrect = ques?.answers?.filter(corr => corr.isCorrect == true);
                return (
                  <div>
                    <h3 className="question_number">
                      {t("question")} {index + 1} {t("of")} {previewDetails?.questions?.length}
                    </h3>
                    <p>{ques?.question}</p>
                    <p className="choose_correct">{ques?.type === "TRUEFALSE" ? t("correct_answer") : t("choose_the_correct_answer_below")}:</p>
                    <div className="answers">
                      {ques?.type !== "TRUEFALSE" ? (
                        <>
                          {ques?.answers?.map((ans, ans_index) => {
                            return (
                              <div
                                className={`${ans?.isCorrect ? "correct_answer" : "answer_index"}`}
                              >
                                <p>{ans_index + 1}.</p>
                                <p className="grid-item">{ans?.answer}</p>
                              </div>
                            );
                          })}
                          {/* <>
                        <p className="correct_answer">{t("answer")} : {isCorrect?.[0]?.answer}</p>
                      </> */}
                        </>
                      ) : (
                        <p className={ques?.isTrue ? "trueFalse" : ""}>{ques?.isTrue ? "true" : "false"}</p>
                      )}
                    </div>
                    <hr />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="previewModal">
              <p>{ConvertHtmlToPlainText(previewDetails?.description)}</p>
              <ReactPlayer
                width={"100%"}
                height={previewDetails?.contentType === "AUDIO" ? "20vh" : "56vh"}
                controls={true}
                url={previewDetails?.file?.url}
              ></ReactPlayer>
            </div>
          )}
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={subcontentClick}
        onHide={() => {
          setSubContentClick(false);
          setPdfNextPage(1);
        }}
        dialogClassName={"modal_container"}
        centered
      >
        <Modal.Header className="modalTitle" closeButton>
          <Modal.Title>{t("sub_content_list")}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modelContent">
          {subcontentClickDetails?.map(item => {
            return (
              <div
                className="content"
                onClick={() => {
                  setVideoPreview(true);
                }}
              >
                <div className="content_thumbnail">
                  {item.contentType === "VIDEO" ? (
                    item.thumbnail ? (
                      <>
                        <img src={item.thumbnail} alt={item.title} />
                        <i className="bx bx-play-circle overlay"></i>
                      </>
                    ) : (
                      <i className="bx bxs-videos"></i>
                    )
                  ) : null}

                  {item.contentType === "IMAGE" && <i className="bx bxs-image"></i>}
                  {item.contentType === "AUDIO" && <i className="bx bxs-music"></i>}
                  {item.contentType === "DOCUMENT" ||
                    (item.contentType === "SUPPORTFILE" && <i className="bx bxs-file"></i>)}
                  {item.contentType === "DICTED" && <i className="fa-sharp fa-quote-left"></i>}
                </div>

                <div className="content_about">
                  <div className="content_title">
                    <p className="content_type">{item?.contentType?.toLowerCase()}</p>
                    <h6>{ConvertHtmlToPlainText(item.title)}</h6>
                  </div>
                </div>
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
      <DeleteModal
        isDeactivate={false}
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        id={selectedContent?.id}
        name={selectedContent?.title}
        handleDelete={handleDelete}
      />
    </>
  );
}
export default withTranslation()(Content);
