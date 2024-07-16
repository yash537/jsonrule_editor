import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Tabs from "../components/tabs/tabs";
import Banner from "../components/panel/banner";
import * as Message from "../constants/messages";
import RuleErrorBoundary from "../components/error/ruleset-error";
import Attributes from "../components/attributes/attributes";
import ValidateRules from "../components/validate/validate-rules";
import { connect } from "react-redux";
import Decisions from "../components/decisions/decision";
import Breadcrumbs from "../components/breadcrumbs/breadcrumbs";
import { useParams } from "react-router-dom";
import { loadFactsPerRule } from "../redux/actions/attributes";
import Spinner from "../components/Spinner";
import { addFactToRuleName } from "../redux/actions/fact";
import Constants from "../components/constants/constants";
import {
  addConstantToRuleName,
  loadConstantsPerRule
} from "../redux/actions/constant";

const tabs = [
  { name: "Facts" },
  { name: "Constants" },
  { name: "Keys" },
  { name: "Decision Tree" },
  { name: "Evalute" },
  { name: "Generate" }
];

const RulesetContainer = () => {
  const { ruleGroupId, ruleId } = useParams();
  const [activeTab, setActiveTab] = useState("Facts");
  const [loading, setLoading] = useState(false);
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

  const { attributes, decisions, name } = ruleset || {};

  const { attributesOfRule, error } = useSelector((state) => state.fact);
  const { constantsPerRule } = useSelector((state) => state.constant);

  const message = updatedFlag ? Message.MODIFIED_MSG : Message.NO_CHANGES_MSG;

  const breadcrumbItems = [
    { name: "Home", link: "/" },
    { name: "Rule-Groups", link: `/rule-groups` },
    { name: `Rule-Group(${ruleGroupId})`, link: `/rule-groups/${ruleGroupId}` }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(loadFactsPerRule(ruleId));
      await dispatch(loadConstantsPerRule(ruleId));
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <RuleErrorBoundary>
        <Breadcrumbs items={breadcrumbItems} />
        <Tabs tabs={tabs} onConfirm={handleTab} activeTab={activeTab} />
        <div className="tab-page-container">
          {activeTab === "Facts" && (
            <Attributes
              attributes={attributesOfRule}
              handleAttribute={(operation, attribute, index) =>
                dispatch(addFactToRuleName(ruleId, attribute.name))
              }
            />
          )}
          {activeTab === "Constants" && (
            <Constants
              constants={constantsPerRule}
              handleConstant={(operation, attribute, index) =>
                dispatch(addConstantToRuleName(ruleId, attribute.name))
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
        </div>
      </RuleErrorBoundary>
    </div>
  );
};

RulesetContainer.propTypes = {};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RulesetContainer);
