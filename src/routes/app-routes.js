import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import PropTypes from "prop-types";
import RulesetContainer from "../containers/ruleset-container";
import RuleGroupsContainer from "../containers/rule-groups-container";
import RuleListContainer from "../containers/rule-list-container";
import ManageFactsContainer from "../containers/manage-facts-container";
import ManageKeysContainer from "../containers/manage-keys-container";
import ManageConstantsContainer from "../containers/manage-constants-container";
import Notification from "../components/Notification";
import { useSelector } from "react-redux";

const AppRoutes = (props) => {
  const { background } = props.appctx;
  const [show, setShow] = useState(false);
  const { notification } = useSelector((state) => state.app);

  useEffect(() => {
    if (notification.message != "") {
      setShow(true);
    }
  }, [notification]);

  return (
    <div
      className={`main-container ${
        props.closedState ? "closed" : "open"
      } ${background}`}
    >
      <div>
        {show && (
          <Notification
            message={notification.message}
            type={notification.type}
            show={show}
            onClose={() => setShow(false)}
          />
        )}
      </div>
      <Routes>
        <Route path="/" element={<RuleGroupsContainer />} />
        <Route
          path="/rule-groups/:ruleGroupId"
          element={<RuleListContainer />}
        />
        <Route
          path="/rule-groups/:ruleGroupId/:ruleId"
          element={<RulesetContainer />}
        />
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
