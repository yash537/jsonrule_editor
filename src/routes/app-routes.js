import React from "react";
import { Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import HomeContainer from "../containers/home-container";
import CreateRulesetContainer from "../containers/create-ruleset-container";
import RulesetContainer from "../containers/ruleset-container";
import AppearanceContainer from "../containers/appearance-container";

const AppRoutes = (props) => {
  const { background } = props.appctx;

  return (
    <div
      className={`main-container ${
        props.closedState ? "closed" : "open"
      } ${background}`}
    >
      <Routes>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/ruleset" element={<RulesetContainer />} />
        <Route path="/create-ruleset" element={<CreateRulesetContainer />} />
        <Route path="/appearance" element={<AppearanceContainer />} />
      </Routes>
    </div>
  );
};

AppRoutes.propTypes = {
  closedState: PropTypes.bool,
  loggedIn: PropTypes.bool,
  appctx: PropTypes.object
};

export default AppRoutes;
