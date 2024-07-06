import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NavLinks from "./navigation-link";
import PropTypes from "prop-types";
import {
  faSquarePlus,
  faSliders,
  faKey
} from "@fortawesome/free-solid-svg-icons";
import ApperanceContext from "../../context/apperance-context";

const navmenu = [
  // {
  //   name: "Create Rules",
  //   navigate: "/create-ruleset",
  //   iconClass: "icon",
  //   fontIcons: faSquarePlus,
  //   linkClass: "navmenu"
  // },
  // {
  //   name: "Upload Rules",
  //   navigate: "/home",
  //   iconClass: "icon",
  //   fontIcons: faCloudArrowUp,
  //   linkClass: "navmenu"
  // },
  // {
  //   name: "Appearance",
  //   navigate: "/appearance",
  //   iconClass: "icon",
  //   fontIcons: faSliders,
  //   linkClass: "navmenu"
  // },
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
    name: "Global Keys",
    navigate: "/manage-keys",
    iconClass: "icon",
    fontIcons: faKey,
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

  // let rulesetLink =
  //   props.rulenames.length > 0
  //     ? [
  //         {
  //           name: "Ruleset",
  //           sublinks: props.rulenames,
  //           iconClass: "rules-icon",
  //           linkClass: "link-heading"
  //         }
  //       ]
  //     : [];
  let rulesetLink = navmenu;
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
  updateState: PropTypes.func,
  activeIndex: PropTypes.number
};

export default NavigationPanel;
