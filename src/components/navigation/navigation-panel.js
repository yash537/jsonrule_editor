import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  faSquarePlus,
  faSliders,
  faKey,
  faShield
} from "@fortawesome/free-solid-svg-icons";
import ApperanceContext from "../../context/apperance-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const navmenu = [
  {
    name: "Rule Groups",
    navigate: "/rule-groups",
    iconClass: "icon",
    fontIcons: faSquarePlus,
    linkClass: "navmenu"
  },
  {
    name: "Manage Facts",
    navigate: "/manage-facts",
    iconClass: "icon",
    fontIcons: faSliders,
    linkClass: "navmenu"
  },
  {
    name: "Global Constants",
    navigate: "/manage-constants",
    iconClass: "icon",
    fontIcons: faShield,
    linkClass: "navmenu"
  },
  {
    name: "Global Keys",
    navigate: "/manage-keys",
    iconClass: "icon",
    fontIcons: faKey,
    linkClass: "navmenu"
  }
];

const NavigationPanel = (props) => {
  const { closedState } = props;

  const { background } = useContext(ApperanceContext);

  return (
    <div
      className={`nav-container ${
        closedState ? "closed" : "open"
      } ${background}`}
    >
      {!closedState && (
        <div className="links-section">
          <div>
            <nav>
              {navmenu.map((value) => (
                <NavLink
                  key={value.name}
                  to={value.navigate}
                  className={({ isActive }) =>
                    isActive ||
                    (value.navigate === "/rule-groups" &&
                      location.pathname === "/")
                      ? "active"
                      : ""
                  }
                >
                  <FontAwesomeIcon icon={value.fontIcons} /> {value.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

NavigationPanel.propTypes = {
  closedState: PropTypes.bool,
  rulenames: PropTypes.array,
  setActiveRulesetIndex: PropTypes.func,
  updateState: PropTypes.func,
  activeIndex: PropTypes.number
};

export default NavigationPanel;
