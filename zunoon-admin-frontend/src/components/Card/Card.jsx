import "./Card.scss";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
export default function Card({ title, description, image, phone }) {
  const [showCardMenu, setShowCardMenu] = useState(false);

  function menuClick() {
    setShowCardMenu(showCardMenu => !showCardMenu);
  }

  return (
    <>
      <div className="card m-2">
        <div className="card-header">
          <img className="card-img-top" src={image} alt="school logo" />
          <h5 className="card-title">{title}</h5>
          {showCardMenu && (
            <div className="card_menu">
              <div className="edit_menu">
                <FontAwesomeIcon icon={faEdit} />
                Edit
              </div>
              <div className="delete_menu">
                <FontAwesomeIcon icon={faTrash} />
                Delete
              </div>
            </div>
          )}
          <div className="three_dot_menu" onClick={menuClick}>
            <FontAwesomeIcon icon={faEllipsisV} />
          </div>
        </div>
        <div className="card-body">
          <p className="card-text">{description}</p>
          <p className="card-text">{phone}</p>
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  phone: PropTypes.string,
};
