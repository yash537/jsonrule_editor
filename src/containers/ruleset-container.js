import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../components/title/page-title";
import Tabs from "../components/tabs/tabs";
import Banner from "../components/panel/banner";
import * as Message from "../constants/messages";
import RuleErrorBoundary from "../components/error/ruleset-error";
import SweetAlert from "react-bootstrap-sweetalert";
import Attributes from "../components/attributes/attributes";
import { handleAttribute } from "../redux/actions/attributes";
import ValidateRules from "../components/validate/validate-rules";
import { connect } from "react-redux";
import Decisions from "../components/decisions/decision";
import Breadcrumbs from "../components/breadcrumbs/breadcrumbs";

const tabs = [
  { name: "Facts" },
  { name: "Decisions" },
  { name: "Validate" },
  { name: "Generate" }
];

const RulesetContainer = ({ loggedIn = false }) => {
  const [activeTab, setActiveTab] = useState("Facts");
  const [generateFlag, setGenerateFlag] = useState(false);

  const ruleset = useSelector(
    (state) => state.ruleset.rulesets[state.ruleset.activeRuleset]
  );
  const updatedFlag = useSelector((state) => state.ruleset.updatedFlag);
  const dispatch = useDispatch();

  const handleTab = (tabName) => {
    setActiveTab(tabName);
  };

  const generateFile = () => {
    const fileData = JSON.stringify(ruleset, null, "\t");
    const blob = new Blob([fileData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = `${ruleset.name}.json`;
    link.href = url;
    link.click();
    setGenerateFlag(true);
  };

  const cancelAlert = () => {
    setGenerateFlag(false);
  };

  const successAlert = () => {
    const { name } = ruleset;
    return (
      <SweetAlert success title="File generated!" onConfirm={cancelAlert}>
        {`${name} rule is successfully generated at your default download location`}
      </SweetAlert>
    );
  };

  const { attributes, decisions, name } = ruleset || {};

  const message = updatedFlag ? Message.MODIFIED_MSG : Message.NO_CHANGES_MSG;

  const breadcrumbItems = [
    { name: "Home", link: "/" },
    { name: "Rule-Groups", link: "/rule-groups" },
    { name: "Rules", link: "/rule-group/1" }
  ];

  return (
    <div>
      <RuleErrorBoundary>
        <Breadcrumbs items={breadcrumbItems} />
        {/* <PageTitle name={name} /> */}
        <Tabs tabs={tabs} onConfirm={handleTab} activeTab={activeTab} />
        <div className="tab-page-container">
          {activeTab === "Facts" && (
            <Attributes
              attributes={attributes}
              handleAttribute={(operation, attribute, index) =>
                dispatch(handleAttribute(operation, attribute, index))
              }
            />
          )}
          {activeTab === "Decisions" && <Decisions />}
          {activeTab === "Validate" && (
            <ValidateRules attributes={attributes} decisions={decisions} />
          )}
          {activeTab === "Generate" && (
            <Banner
              message={message}
              ruleset={ruleset}
              onConfirm={generateFile}
            />
          )}
          {generateFlag && successAlert()}
        </div>
      </RuleErrorBoundary>
    </div>
  );
};

RulesetContainer.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RulesetContainer);
