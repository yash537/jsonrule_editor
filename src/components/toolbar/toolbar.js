import React from "react";
import PropTypes from "prop-types";
import Search from "../search/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons"; // Assuming these icons are used

const ToolBar = ({ handleAdd, reset, searchTxt, addTitle = "Create" }) => {
  const handleSearch = (value) => {
    searchTxt(value);
  };

  return (
    <div className={`attributes-header`}>
      <div className="attr-link" onClick={handleAdd}>
        <FontAwesomeIcon icon={faPlus} className="plus-icon" />
        <span className="text">{addTitle}</span>
      </div>
      <div>
        <Search onConfirm={handleSearch} onChange={handleSearch} />
      </div>
    </div>
  );
};

ToolBar.propTypes = {
  handleAdd: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  searchTxt: PropTypes.func.isRequired
};

export default ToolBar;
