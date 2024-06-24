import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Title = ({ title, updateState, closedState, loggedIn = false }) => {
  let sideNav = closedState ? "open" : "closed";
  return (
    <div className="header-container">
      <div className="menu-bar">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            loggedIn && updateState(sideNav);
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
  title: PropTypes.string.isRequired
};

export default Title;
