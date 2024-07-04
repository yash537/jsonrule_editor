import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMoon } from "@fortawesome/free-solid-svg-icons";

const Title = ({ title, updateState, closedState, loggedIn = false }) => {
  let sideNav = closedState ? "open" : "closed";
  return (
    <div className="header-container">
      <div className="menu-bar">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            // updateState(sideNav);
          }}
        >
          <FontAwesomeIcon className="menu-icon" icon={faBars} />
        </a>
      </div>
      <div className="title">{title}</div>
      <div className="theme">
        <FontAwesomeIcon className="menu-icon" icon={faMoon} />
      </div>
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired
};

export default Title;
