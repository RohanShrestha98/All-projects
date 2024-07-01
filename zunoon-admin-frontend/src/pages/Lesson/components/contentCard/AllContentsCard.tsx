import { useState, useEffect } from "react";
import Button from "../../../../components/Button/Button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./AllContentsCard.scss";
import Searching from "../../../../assets/icons/searching.gif";
import { Modal } from "react-bootstrap";
import AssignContent from "../../../Content/components/AssignContent";
import http from "../../../../utils/http";
import toast from "../../../../utils/toast";
import config from "../../../../config";
import { useNavigate } from "react-router-dom";
import { withTranslation } from "react-i18next";
import { BsEye } from "react-icons/bs";
import { MdQuiz } from "react-icons/md";

const lessonApi = config.endpoints.api.lesson;
const contentApi = config.endpoints.api.content;

function AllContentsCard({
  id,
  title,
  contents,
  toggleEditContentModal,
  toggleDeleteContentModal,
  setDeleteContentData,
  setUpdateContentData,
  showAssignContentModal,
  setShowAssignContentModal,
  handleClickSubmit,
  handleVideoClick,
  setVideoPreview,
  videoPreview,
  selectedID,
  loading,
  t,
}) {
  const navigate = useNavigate();

  const [contentList, setContentList] = useState(contents);
  const [hasSubContentClick, setHasSubContentClick] = useState(false);
  const [hasSubContentSelectedId, setHasSubContentSelectedId] = useState("");
  const [checkedContents, setCheckedContents] = useState([]);

  useEffect(() => {
    setContentList(contents);
  }, [contents]);

  useEffect(() => {
    setCheckedContents([]);
  }, [id]);

  const ContentCard = ({ data, handleVideoClick, setVideoPreview }) => {
    const handleCheckChage = e => {
      const { value, checked } = e?.target;
      checked
        ? setCheckedContents([...checkedContents, value])
        : setCheckedContents(checkedContents.filter(e => e !== value));
    };

    return (
      <>
        <div className="content">
          <div className="content_thumbnail">
            {data.contentType === "VIDEO" ? (
              data.thumbnail ? (
                <>
                  <img src={data.thumbnail} alt={data.title} />
                  <i className="bx bx-play-circle overlay"></i>
                </>
              ) : (
                <i className="bx bxs-videos"></i>
              )
            ) : null}

            {data?.contentType === "IMAGE" && <i className="bx bxs-image"></i>}
            {data?.contentType === "AUDIO" && <i className="bx bxs-music"></i>}
            {data?.contentType === "BOOK" && <i className="bx bxs-book"></i>}
            {data?.contentType === "QUESTIONNAIRE" && <MdQuiz size={24} />}
            {data?.contentType === "DOCUMENT" ||
              (data?.contentType === "SUPPORTFILE" && <i className="bx bxs-file"></i>)}
            {data?.contentType === "DICTED" && <i className="fa-sharp fa-quote-left"></i>}
          </div>

          <div
            className="content_about"
            onClick={() => {
              setHasSubContentSelectedId(data?.hasSubContent && data?.id);
              setHasSubContentClick(data?.hasSubContent && !hasSubContentClick);
            }}
          >
            <div className="content_title">
              <p className="content_type">{data?.contentType?.toLowerCase()}</p>
              <h6>{data?.title}</h6>
            </div>

            <div className="content_description">
              <p>{data?.description}</p>
            </div>
          </div>
          <div
            style={{
              paddingRight: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              alignItems: "center",
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{ display: "flex", marginBottom: "4px" }}
            >
              <input
                type="checkbox"
                value={data?.id}
                checked={checkedContents.includes(data?.id)}
                onChange={handleCheckChage}
              />
            </div>
            <BsEye
              style={{ cursor: "pointer" }}
              onClick={() => {
                setVideoPreview(true);
                handleVideoClick(data);
              }}
              size={16}
            />
          </div>
        </div>
        {hasSubContentClick && data?.hasSubContent && data?.id === hasSubContentSelectedId && (
          <>
            {data?.subContents?.map(item => {
              return (
                <div className="content sub_content">
                  <div className="content_thumbnail">
                    {item.contentType === "VIDEO" ? (
                      item.thumbnail ? (
                        <>
                          <img src={item?.thumbnail} alt={item.title} />
                          <i className="bx bx-play-circle overlay"></i>
                        </>
                      ) : (
                        <i className="bx bxs-videos"></i>
                      )
                    ) : null}

                    {item.contentType === "IMAGE" && <i className="bx bxs-image"></i>}
                    {item.contentType === "AUDIO" && <i className="bx bxs-music"></i>}
                    {item.contentType === "BOOK" && <i className="bx bxs-book"></i>}
                    {item.contentType === "DOCUMENT" ||
                      (item.contentType === "SUPPORTFILE" && <i className="bx bxs-file"></i>)}
                    {item.contentType === "DICTED" && <i className="fa-sharp fa-quote-left"></i>}
                  </div>

                  <div className="content_about">
                    <div className="content_title">
                      <p className="content_type">{item?.contentType?.toLowerCase()}</p>
                      <h6>{item.title}</h6>
                    </div>
                  </div>
                  <BsEye
                    onClick={() => {
                      setVideoPreview(true);
                      handleVideoClick(item);
                    }}
                  />
                </div>
              );
            })}
          </>
        )}
      </>
    );
  };

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const orderedContents = reorder(contentList, result.source.index, result.destination.index);

    setContentList(orderedContents);
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    // margin: `0 0 16px 0`,
    padding: "0 4px",
    gap: "1em",
    width: "100%",
    border: isDragging ? "lightblue" : "white",

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const [disableDrag, setDisableDrag] = useState(true);

  const handlePositionUpdate = () => {
    http
      .POST(lessonApi.lessonPositionUpdate, {
        lesson: selectedID,
        contents:
          contentList &&
          contentList.map(item => {
            return item.id;
          }),
      })
      .then(() => {
        toast.success(`${t("position")} ${t("updated_successfully")}`);
      })
      .catch(error => {
        toast.error(error);
      });
  };
  const handleContentUnassign = () => {
    http
      .POST(contentApi.unassignContent, { lesson: id, contents: checkedContents })
      .then(() => {
        toast.success(`${t("th_content")} ${t("unassigned_successfully")}`);
        setCheckedContents([]);
        window.location.reload();
      })
      .catch(error => {
        toast.error(error?.toString());
      });
  };

  return (
    <>
      <div className="header">
        <p>{title}</p>
        <div className="actions">
          <div
            className="arrange_button"
            onClick={() => {
              setDisableDrag(pre => !pre);
              !disableDrag && handlePositionUpdate();
            }}
          >
            <p>{t("arrange")}&nbsp;&nbsp;</p>
            {disableDrag ? (
              <i className="bx bxs-sort-alt" title="Reorder Contents"></i>
            ) : (
              <i className="bx bx-check tick" title="Save Changes"></i>
            )}
          </div>
          <Button
            type="submit"
            buttonName={`${t("add")} ${t("lesson")}`}
            color="success"
            clickHandler={() => navigate("addLesson")}
            // disabled={isLoading ? true : !id && true}
          />
        </div>
      </div>
      {checkedContents?.length ? (
        <div className="assign_lesson_container" style={{ margin: "10px 4px" }}>
          {checkedContents?.length} {checkedContents?.length > 1 ? t("contents") : t("content")}{" "}
          {t("selected")}
          <div>
            <Button
              type="submit"
              color="danger"
              buttonName={t("unassign")}
              clickHandler={() => handleContentUnassign()}
              iconName="bx bx-unlink"
            />
          </div>
        </div>
      ) : null}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              // className={`draggableList ${snapshot.isDraggingOver && "onDrag"}`}
              className={`draggableList ${!disableDrag && "ordering"}`}
            >
              {contentList?.length === 0 || contentList === null ? (
                <div className="no-data">
                  <img src={Searching} alt="Searching" />
                  <p>{t("no_content_found_for")} {title}. {t("assign_contents_now")}</p>
                </div>
              ) : (
                <>
                  {contentList?.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                      isDragDisabled={disableDrag}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                        >
                          {
                            <ContentCard
                              key={index}
                              data={item}
                              handleVideoClick={handleVideoClick}
                              setVideoPreview={setVideoPreview}
                            />
                          }
                        </div>
                      )}
                    </Draggable>
                  ))}
                </>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Modal to add master content */}
      <Modal
        centered
        onHide={() => setShowAssignContentModal(false)}
        show={showAssignContentModal}
        dialogClassName={"modal_container"}
        className="modal_container"
        data-backdrop="true"
      >
        {/* <Modal.Header className="modalTitle" closeButton>
          <Modal.Title>Add Lesson</Modal.Title>
        </Modal.Header> */}

        <Modal.Body className="modal_body">
          <AssignContent id={id} handleClickSubmit={handleClickSubmit} loading={loading} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default withTranslation()(AllContentsCard);
