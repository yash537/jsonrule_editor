import React from "react";
import { Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import RulesetContainer from "../containers/ruleset-container";
import RuleGroupsContainer from "../containers/rule-groups-container";
import RuleListContainer from "../containers/rule-list-container";
import ManageFactsContainer from "../containers/manage-facts-container";
import ManageKeysContainer from "../containers/manage-keys-container";
import ManageConstantsContainer from "../containers/manage-constants-container";

const AppRoutes = (props) => {
  const { background } = props.appctx;

  return (
    <div
      className={`main-container ${
        props.closedState ? "closed" : "open"
      } ${background}`}
    >
      <Routes>
        <Route path="/" element={<RuleGroupsContainer />} />
        <Route path="/rule-details/:ruleId" element={<RulesetContainer />} />
        <Route path="/rule-groups" element={<RuleGroupsContainer />} />
        <Route path="/manage-facts" element={<ManageFactsContainer />} />
        <Route path="/manage-keys" element={<ManageKeysContainer />} />
        <Route
          path="/manage-constants"
          element={<ManageConstantsContainer />}
        />

        <Route
          path="/rule-group/:ruleGroupId"
          element={<RuleListContainer />}
        />
      </Routes>
    </div>
  );
};

AppRoutes.propTypes = {
  closedState: PropTypes.bool,
  appctx: PropTypes.object
};

export default AppRoutes;
