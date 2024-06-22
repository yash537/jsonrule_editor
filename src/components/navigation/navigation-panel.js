import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavLinks from "./navigation-link";
import PropTypes from "prop-types";
// import AppearanceContext from "../../context/apperance-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSquarePlus,
  faCloudArrowUp,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";
import ApperanceContext from "../../context/apperance-context";

const navmenu = [
  {
    name: "Create Rules",
    navigate: "/create-ruleset",
    iconClass: "icon",
    fontIcons: faSquarePlus,
    linkClass: "navmenu",
  },
  {
    name: "Upload Rules",
    navigate: "/home",
    iconClass: "icon",
    fontIcons: faCloudArrowUp,
    linkClass: "navmenu",
  },
  {
    name: "Appearance",
    navigate: "/appearance",
    iconClass: "icon",
    fontIcons: faSliders,
    linkClass: "navmenu",
  },
];

const NavigationPanel = (props) => {
  const [links, setLinks] = useState([]);
  const navigate = useNavigate();
  const { closedState, loggedIn, updateState } = props;

  const handleNavBtn = () => {
    navigate("/create-ruleset");
  };

  const handleNavLink = (name) => {
    props.setActiveRulesetIndex(name);
    navigate("/ruleset");
  };

  let rulesetLink =
    props.rulenames.length > 0
      ? [
          {
            name: "Ruleset",
            sublinks: props.rulenames,
            iconClass: "rules-icon",
            linkClass: "link-heading",
          },
        ]
      : [];
  rulesetLink = rulesetLink.concat(navmenu);

  let sideNav = closedState ? "open" : "closed";

  return (
    <div
      className={`nav-container ${closedState ? "closed" : "open"} ${
        ApperanceContext.background
      }}`}
    >
      <div className="menu-bar">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            updateState(sideNav);
          }}
        >
          <FontAwesomeIcon
            className="close-icon"
            icon={faBars}
          ></FontAwesomeIcon>
        </a>
      </div>
      {!closedState && (
        <div className="links-section">
          <div>
            <NavLinks
              links={rulesetLink}
              onConfirm={handleNavLink}
              activeIndex={props.activeIndex}
            />
          </div>
        </div>
      )}
    </div>
  );
};

NavigationPanel.defaultProps = {
  closedState: false,
  rulenames: [],
  setActiveRulesetIndex: () => false,
  loggedIn: false,
  updateState: () => false,
  activeIndex: 0,
};

NavigationPanel.propTypes = {
  closedState: PropTypes.bool,
  rulenames: PropTypes.array,
  setActiveRulesetIndex: PropTypes.func,
  loggedIn: PropTypes.bool,
  updateState: PropTypes.func,
  activeIndex: PropTypes.number,
};

export default NavigationPanel;
