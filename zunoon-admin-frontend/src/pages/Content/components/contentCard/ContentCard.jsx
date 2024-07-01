import "./ContentCard.scss";

import { useSortable } from "@dnd-kit/sortable";
import React, { useState } from "react";
import { RxDragHandleDots2 } from "react-icons/rx";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import DeleteModal from "../../../../components/DeleteModal/DeleteModal";
import http from "../../../../utils/http";
import config from "../../../../config";
import toast from "../../../../utils/toast";

const contentApi = config.endpoints.api.content;

export default function ContentCard({ content, dragOverlay, setContentList }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: content.id,
    data: { content },
  });

  const contentStyle = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteContent, setDeleteContent] = useState(null);

  const handleDeleteContent = async id => {
    try {
      const response = await http.REMOVE(contentApi.delete(id));
      if (response.status === 200) {
        setContentList(prevContentList => prevContentList.filter(content => content.id !== id));
        toast.success(`${t("th_content")} ${t("deleted_successfully")}`);
      } else toast.error(new Error("Error in deleting the content"));
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <li style={contentStyle} ref={setNodeRef} className="content-card">
      <RxDragHandleDots2
        className="drag-handle"
        {...listeners}
        {...attributes}
        style={{ cursor: dragOverlay ? "grabbing" : "grab" }}
      />
      <div className="content-details">
        <h4>{content?.title}</h4>
        <p>{content?.description}</p>
      </div>
      <div className="content-actions">
        <i title="Edit Content">
          <FontAwesomeIcon className="edit" icon={faEdit} />
        </i>
        <i
          title="Delete Content"
          onClick={() => {
            setDeleteContent(content);
            setShowDeleteModal(true);
          }}
        >
          <FontAwesomeIcon className="trash" icon={faTrashCan} />
        </i>
      </div>

      {/* Modal to delete content */}
      {deleteContent && (
        <DeleteModal
          id={deleteContent.id}
          name={deleteContent.title}
          show={showDeleteModal}
          handleClose={() => setShowDeleteModal(false)}
          handleDelete={handleDeleteContent}
        />
      )}
    </li>
  );
}
