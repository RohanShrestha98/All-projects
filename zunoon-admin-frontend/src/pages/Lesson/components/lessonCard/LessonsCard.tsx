import React from "react";

// import ToggleButton from "../../../../components/ToggleButton/ToggleButton";

import "./LessonsCard.scss";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LessonsCard({
  id,
  data,
  active,
  toggleModal,
  toggleEditMasterModal,
  handleSelect,
  setDeleteData,
  setUpdateData,
  handleVisibility,
  // open
}) {
  const handleDelete = () => {
    toggleModal();
    setDeleteData(data.id, data.title);
  };
  const handleUpdate = () => {
    setUpdateData(data);
    toggleEditMasterModal();
  };

  // const [tooltip, setTooltip] = React.useState(false);

  return (
    <>
      {data &&
        data.map(item => {
          return (
            <div
              key={item.id}
              className={`card_container ${item.id === active && "selected"}`}
              onClick={handleSelect(item)}
            >
              <div className="content_thumbnail">
                <img
                  src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                  alt="content"
                />
              </div>
              <div className="master_content">
                <div className="content_details">
                  <div className="content_title">
                    <h6>{`${item.title}`}</h6>
                  </div>

                  <div className="content_description">
                    <p>{item.description}</p>
                  </div>
                </div>

                <div className="content_actions">
                  {/* <ToggleButton
              onLabel={"Public"}
              offLabel={"Private"}
              value={data.isPublic}
              handleChange={() => {
                handleVisibility(id);
              }}
            /> */}
                  <label
                    className={`toggle-wrapper ${item.isPublic === true && "active"}`}
                    onClick={() => {
                      handleVisibility(id);
                    }}
                  >
                    <span className={`toggle-label ${item.isPublic && "active"}`}>
                      {item.isPublic ? "Public" : "Private"}
                    </span>
                    <span className={`slider ${item.isPublic === true && "active"}`}></span>
                  </label>
                  <div className="row_action">
                    {/* <i
                title={data.isPublic ? "Public Content" : "Private Content"}
                onClick={() => handleVisibility(id)}
                className={!open && "tooltip"}
                data-tooltip={
                  data.isPublic ? "Public Content" : "Private Content"
                }
              >
                {data.isPublic ? (
                  <FontAwesomeIcon className="eye" icon={faEye} />
                ) : (
                  <FontAwesomeIcon className="eye" icon={faEyeSlash} />
                )}
              </i> */}
                    <i title="Edit Content" onClick={handleUpdate}>
                      <FontAwesomeIcon className="edit" icon={faEdit} />
                    </i>
                    <i title="Delete Content" onClick={handleDelete}>
                      <FontAwesomeIcon className="trash" icon={faTrashCan} />
                    </i>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default LessonsCard;
