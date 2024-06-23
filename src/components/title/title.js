import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Title = ({ title, toggleNav }) => {
  return (
    <div className="header-container">
      <div className="menu-bar">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            toggleNav();
          }}
        >
          <FontAwesomeIcon className="menu-icon" icon={faBars} />
        </a>
      </div>
      <div className="title">{title}</div>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
  toggleNav: PropTypes.func.isRequired
};

export default Title;
