import React from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

export default function AddNewCard({ cardBody }) {
  return (
    <>
      <div className="card new_card m-2">
        <div className="card-header new_card_header">
          <FontAwesomeIcon className="plus_sign" icon={faPlus} />
        </div>
        <div className="card-body new_card_body">{cardBody}</div>
      </div>
    </>
  );
}

AddNewCard.propTypes = {
  cardBody: PropTypes.string,
};
