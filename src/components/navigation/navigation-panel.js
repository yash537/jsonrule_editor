import React from "react";
import { useNavigate } from "react-router-dom";
import NavLinks from "./navigation-link";
import PropTypes from "prop-types";
import {
  faSquarePlus,
  faCloudArrowUp,
  faSliders
} from "@fortawesome/free-solid-svg-icons";
import ApperanceContext from "../../context/apperance-context";

const navmenu = [
  {
    name: "Create Rules",
    navigate: "/create-ruleset",
    iconClass: "icon",
    fontIcons: faSquarePlus,
    linkClass: "navmenu"
  },
  {
    name: "Upload Rules",
    navigate: "/home",
    iconClass: "icon",
    fontIcons: faCloudArrowUp,
    linkClass: "navmenu"
  },
  {
    name: "Appearance",
    navigate: "/appearance",
    iconClass: "icon",
    fontIcons: faSliders,
    linkClass: "navmenu"
  }
];

const NavigationPanel = (props) => {
  const navigate = useNavigate();
  const { closedState } = props;

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
            linkClass: "link-heading"
          }
        ]
      : [];
  rulesetLink = rulesetLink.concat(navmenu);

  return (
    <div
      className={`nav-container ${closedState ? "closed" : "open"} ${
        ApperanceContext.background
      }}`}
    >
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

NavigationPanel.propTypes = {
  closedState: PropTypes.bool,
  rulenames: PropTypes.array,
  setActiveRulesetIndex: PropTypes.func,
  loggedIn: PropTypes.bool,
  updateState: PropTypes.func,
  activeIndex: PropTypes.number
};

export default NavigationPanel;
