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
import { addKeyToRuleName, loadKeysPerRule } from "../redux/actions/key";
import Keys from "../components/keys/keys";
import { handleFetchDecisionTree } from "../redux/actions/rule";

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

  const updatedFlag = useSelector((state) => state.ruleset.updatedFlag);
  const dispatch = useDispatch();

  const handleTab = (tabName) => {
    setActiveTab(tabName);
  };

  const { attributesOfRule, error } = useSelector((state) => state.fact);
  const { constantsPerRule } = useSelector((state) => state.constant);
  const { keysPerRule } = useSelector((state) => state.key);

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
      await dispatch(loadKeysPerRule(ruleId));
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const { tree } = useSelector((state) => state.ruleset);

  const handleFetchTree = () => {
    dispatch(handleFetchDecisionTree(ruleGroupId, ruleId));
  };

  useEffect(() => {
    handleFetchTree();
  }, []);

  const generateFile = () => {
    console.log("generate file");
  };

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
          {activeTab === "Keys" && (
            <Keys
              keys={keysPerRule}
              handleConstant={(operation, attribute, index) =>
                dispatch(addKeyToRuleName(ruleId, attribute.name))
              }
            />
          )}
          {activeTab === "Decision Tree" && (
            <Decisions tree={{ name: ruleGroupId, conditions: tree }} />
          )}
          {activeTab === "Evalute" && <ValidateRules />}
          {activeTab === "Generate" && (
            <Banner
              message={Message.NO_CONSTANT_MSG}
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
