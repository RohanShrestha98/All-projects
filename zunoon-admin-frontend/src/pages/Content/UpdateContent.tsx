import "./UpdateContent.scss";
import React, { useEffect, useState } from "react";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import Button from "../../components/Button/Button";
import ContentForm from "./components/contentForm/ContentForm";
import useFetch from "../../hooks/useFetch";
import QuizContentForm from "./components/contentForm/QuizContentForm";
import { withTranslation } from "react-i18next";
import GenerateListOptions from "../School/components/schoolForm/SelectOptions";

interface IContentProps {
  t: Function;
  editForm: boolean;
  data: any;
}

function UpdateContent({ t, editForm, data }: IContentProps) {
  // const { setIsEditing, uploadFile } = useUploadContext();
  const { contentTypeOptions } = GenerateListOptions();

  const [content, setContent] = useState<any>({ value: "video", label: "Video" });
  const [selectedContent, setSelectedContent] = useState({ value: "video", label: "Video" });
  const [isLoading, setIsLoading] = useState(false);
  const [contentList, setContentList] = useState([]);
  const [, /* activeCard */ setActiveCard] = useState(null);


  useEffect(() => {
    if (editForm) {
      if (data && data.contentType) {
        setContent({
          value: data?.contentType,
          label: data?.contentType,
        });
      }
    }
  }, [data, editForm]);

  const { register, setValue } = useForm(
    editForm && {
      values: {
        title: data && data.title,
      },
    },
  );
  const navigate = useNavigate();
  const { fetchedData } = useFetch();

  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (fetchedData.data) setContentList(fetchedData.data);
  }, [fetchedData]);

  const handleDragEnd = event => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setContentList(items => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragStart = event => setActiveCard(event.active.data.current.content);

  const contentFormData = { type: content?.value };

  const handleContentChange = (data, e) => {
    setSelectedContent(data);
    //@ts-ignore
    setValue("content", data?.value);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
    >
      <SortableContext items={contentList} strategy={verticalListSortingStrategy}>
        <div className="update-content-page d-block ">
          <section className="add-content-section">
            <div className="add-content-header">
              <div className="select-wrapper">
                <div className="content-select">
                  <CustomSelect
                    isContentForm={true}
                    options={contentTypeOptions}
                    value={selectedContent}
                    register={register}
                    handleChange={(e, data) => {
                      setContent(e);
                      handleContentChange(e, data);
                    }}
                    // handleChange={selectedContent => setContent(selectedContent)}
                    placeholder={`${t("select")} ${t("contentType")}`}
                    id="content"
                    name="content"
                    disabled={false}
                    clearable={false}
                  />
                </div>
              </div>
              <div className="back-button">
                <Button
                  buttonName={`< ${t("back")}`}
                  color="success"
                  clickHandler={() => navigate("/contents")}
                  type="button"
                />
              </div>
            </div>
            {content?.value === "questionaire" ? (
              <QuizContentForm type="add" content={content} contentFormData={contentFormData} />
            ) : (
              <ContentForm
                type="add"
                content={content && content}
                contentType={content && content?.value}
                tags={tags}
                setTags={setTags}
                // handleClickSubmit={data => handleSubmit(data)}
                setIsSubmiting={setIsLoading}
                isSubmitting={isLoading}
                setSelectedContent={setSelectedContent}
                selectedContent={selectedContent}
              />
            )}
          </section>
        </div>
      </SortableContext>

      {/* <DragOverlay>
        {activeCard ? <ContentCard content={activeCard} dragOverlay /> : null}
      </DragOverlay> */}
    </DndContext>
  );
}

export default withTranslation()(UpdateContent);
