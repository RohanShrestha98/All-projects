import { useEffect, useState } from "react";
import CustomTooltip from "../../components/Tooltip/CustomTooltip";
import { BsFillCaretDownFill, BsFillCaretRightFill } from "react-icons/bs";
import { Modal } from "react-bootstrap";
// import { Document, Page } from "react-pdf";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import { IFileUploadResponse } from "../../@types/content";
import videoThumbbail from "../../assets/images/videoThumbnail.svg";
import audioThumbnail from "../../assets/images/audioThumbnail.svg";
import bookThumbnail from "../../assets/images/bookThumbnail.svg";
import questionnaireThumbnail from "../../assets/images/questionnaireThumbnail.svg";
import imageThumbnail from "../../assets/images/imageThumbnail.svg";
import { Viewer } from "@react-pdf-viewer/core";
import { ConvertHtmlToPlainText } from "../../utils/convertHtmlToPlainText";
import config from "../../config";
import httpMethods from "../../utils/http";
import { useTranslation } from "react-i18next";

interface IVideoContent {
  name: string;
  contentType: string;
  description: string;
  book1: IFileUploadResponse;
  thumbnail: IFileUploadResponse;
}
const contentApi = config.endpoints.api.content;


export default function ContentAccordian({ lastElement, subContentData, contentData, item5 }) {
  const [selectedContentId, setContentLessonId] = useState("");
  const [contentDropDownOpen, setContentDropDownOpen] = useState(false);
  const [videoPreview, setVideoPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [videoContent, setVideoContent] = useState<IVideoContent>();
  const [changeBookUrl, setChangeBookUrl] = useState<any>();
  const [previewContentDetails, setPreviewContentDetails] = useState<any>()
  const { t } = useTranslation();


  useEffect(() => {
    async function getContentDetailsData() {
      if (videoContent?.id) {
        setLoading(true)
        try {
          const response = await httpMethods.GET(`${contentApi.details(videoContent?.id)}`, "");
          setPreviewContentDetails(response?.data?.data)
          setLoading(false)
        }
        catch (err) {
          console.log("err", err)
          setLoading(false)
        }
      }
    }
    getContentDetailsData()
  }, [videoContent?.id])


  const handleContentClick = id => {
    setContentLessonId(id);
    setContentDropDownOpen(!contentDropDownOpen);
  };
  return (
    <>
      <div
        className="unit_class_skill "
        onClick={() => {
          subContentData && handleContentClick(item5.id);
        }}
      >
        <div className="unit_class_skill_indicator_lesson_content_hr">
          <div className="unit_class_skill_hr_first"></div>
          {contentData.length > 1 && lastElement && item5.id !== lastElement.id && (
            <div className="unit_class_skill_hr_second"></div>
          )}
        </div>
        <div className="accordian no_level">
          <div className="indicate_accordian">
            {contentDropDownOpen ? (
              <BsFillCaretDownFill color="#20c997" />
            ) : (
              <BsFillCaretRightFill color="#9ca3af" />
            )}
            {item5?.contentType === "BOOK" ? (
              <img src={bookThumbnail} className="h-6 w-6" />
            ) : item5?.contentType === "AUDIO" ? (
              <img src={audioThumbnail} className="h-6 w-6" />
            ) : item5?.contentType === "QUESTIONNAIRE" ? (
              <img src={questionnaireThumbnail} className="h-6 w-6" />
            ) : item5?.contentType === "IMAGE" ? (
              <img src={imageThumbnail} className="h-6 w-6" />
            ) : item5?.contentType === "VIDEO" ? (
              <img src={videoThumbbail} className="h-6 w-6" />
            ) : (
              ""
            )}
            {/* <i className="bx bx-file" style={{ background: "#20c997" }}></i> */}
            <div>
              <h5>
                Content{" "}
                {item5?.contentType === "BOOK"
                  ? "(Book)"
                  : item5?.contentType === "AUDIO"
                    ? "(Audio)"
                    : item5?.contentType === "QUESTIONNAIRE"
                      ? "(Questionnaire)"
                      : item5?.contentType === "IMAGE"
                        ? "(Image)"
                        : item5?.contentType === "VIDEO"
                          ? "(Video)"
                          : ""}
              </h5>
              <CustomTooltip original={item5?.name} id={item5?.id} />
            </div>
          </div>
          <button
            onClick={() => {
              setVideoContent(item5);
              setVideoPreview(true);
            }}
          >
            View Preview
          </button>
        </div>
      </div>
      {selectedContentId === item5.id &&
        contentDropDownOpen &&
        subContentData &&
        subContentData.map(item6 => {
          const subContentData = item5.subContent;
          let lastElement = subContentData[subContentData?.length - 1];
          return (
            <>
              <div className="unit_class_skill">
                <div className="unit_class_skill_indicator_lesson_content_subcontent">
                  <div className="unit_class_skill_hr_first"></div>
                  {subContentData?.length && item6.id !== lastElement.id && (
                    <div className="unit_class_skill_hr_second"></div>
                  )}
                </div>
                <div className="accordian no_level">
                  <div className="indicate_accordian">
                    <BsFillCaretRightFill color="#9ca3af" />
                    <i
                      className="fa fa-play-circle"
                      aria-hidden="true"
                      style={{ backgroundColor: "#818cf8" }}
                    ></i>
                    <div>
                      <h5>Sub-Content</h5>
                      <CustomTooltip original={item6?.name} id={item6?.id} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      <Modal
        size="lg"
        show={videoPreview}
        onHide={() => setVideoPreview(false)}
        dialogClassName={"modal_container"}
        centered
      >
        <Modal.Header className="modalTitle" closeButton>
          <Modal.Title>{loading ? "Loading..." : ConvertHtmlToPlainText(videoContent?.name?.slice(0, 50))}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="modelContent">
          {
            loading ? <>Loading...</> :
              <>
                {previewContentDetails &&
                  (previewContentDetails?.contentType === "BOOK" ||
                    previewContentDetails?.contentType === "SUPPORTFILE") ? (
                  <div>
                    <div className="bookLevel">
                      {previewContentDetails?.book1 && (
                        <p
                          className={`${(changeBookUrl === previewContentDetails?.book1?.url || !changeBookUrl) &&
                            "bookLevelActive"
                            }`}
                          onClick={() => setChangeBookUrl(previewContentDetails?.book1?.url)}
                        >
                          {t("book")} 1
                        </p>
                      )}
                      {previewContentDetails?.book2 && (
                        <p
                          className={`${changeBookUrl === previewContentDetails?.book2?.url && "bookLevelActive"
                            }`}
                          onClick={() => setChangeBookUrl(previewContentDetails?.book2?.url)}
                        >
                          {t("book")} 2
                        </p>
                      )}
                      {previewContentDetails?.book3 && (
                        <p
                          className={`${changeBookUrl === previewContentDetails?.book3?.url && "bookLevelActive"
                            }`}
                          onClick={() => setChangeBookUrl(previewContentDetails?.book3?.url)}
                        >
                          {t("book")} 3
                        </p>
                      )}
                    </div>
                    <div className="pdfReaderHeading">
                      <p>{previewContentDetails?.description}</p>
                    </div>
                    <div className="pdf-viewer">

                      <Viewer fileUrl={changeBookUrl ?? previewContentDetails?.book1?.url} />
                    </div>
                  </div>
                ) : previewContentDetails?.contentType === "IMAGE" ? (
                  <div>
                    <img
                      src={previewContentDetails?.file?.url}
                      alt={previewContentDetails?.file?.fileName}
                      width={"100%"}
                    />
                  </div>
                ) : previewContentDetails?.contentType === "QUESTIONNAIRE" ? (
                  <div className="previewModal">
                    {previewContentDetails?.questions?.map((ques, index) => {
                      const isCorrect = ques?.answers?.filter(corr => corr.isCorrect == true);
                      return (
                        <div>
                          <h3 className="question_number">
                            {t("question")} {index + 1} {t("of")} {previewContentDetails?.questions?.length}
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
                    <p>{ConvertHtmlToPlainText(previewContentDetails?.description)}</p>
                    <ReactPlayer
                      width={"100%"}
                      height={previewContentDetails?.contentType === "AUDIO" ? "20vh" : "56vh"}
                      controls={true}
                      url={previewContentDetails?.file?.url}
                    ></ReactPlayer>
                  </div>
                )}
              </>
          }


        </Modal.Body>
      </Modal>
    </>
  );
}
