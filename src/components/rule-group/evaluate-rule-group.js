import React, { useEffect, useState } from "react";
import {
  fetchFactsPerRuleGroup,
  resetRuleGroups,
  saveFactsKeyValuePerRuleGroup
} from "../../redux/actions/rule-group";
import { useParams } from "react-router-dom";
import Spinner from "../Spinner";
import { useDispatch, useSelector } from "react-redux";
import Panel from "../panel/panel";
import InputField from "../forms/input-field";
import Button from "../button/button";
import JSONViewer from "../jsonViewer";
import { resetRules } from "../../redux/actions/rule";

const EvaluteRuleGroup = () => {
  const { ruleGroupId } = useParams();
  const [loading, setLoading] = useState(false);
  const { ruleGroupFacts, outputForRuleGroup } = useSelector(
    (state) => state.ruleGroup
  );
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetRuleGroups());
    };
  }, [dispatch]);

  const [keyValues, setKeyValues] = useState({});

  const handleKeyChange = (e, index) => {
    const { name, value } = e.target;
    setKeyValues({
      ...keyValues,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(saveFactsKeyValuePerRuleGroup(ruleGroupId, keyValues));
  };

  const handleReset = () => {
    const resetKeyValues = keyValues.map((kv) => ({ ...kv, value: "" }));
    setKeyValues(resetKeyValues);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(fetchFactsPerRuleGroup(ruleGroupId));
      setLoading(false);
    };

    fetchData();
  }, [dispatch, ruleGroupFacts.length]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <React.Fragment>
      {ruleGroupFacts.length > 0 && (
        <Panel>
          <form
            className="evaluate-rule-group-form"
            onSubmit={handleSubmit}
            onReset={handleReset}
          >
            {ruleGroupFacts.map((attr, index) => (
              <div key={attr.name} className="evaluate-wrapper">
                <div className="key-name"> {attr.name}: </div>
                <InputField
                  label=""
                  name={attr.name}
                  onChange={(e) => handleKeyChange(e, index)}
                  required
                  value={keyValues[index]?.value || ""}
                />
              </div>
            ))}
            <div style={{ display: "flex" }}>
              <Button label="Validate" classname="btn-success" type="submit" />
              <Button label="Reset" classname="btn-danger" type="reset" />
            </div>
          </form>
        </Panel>
      )}
      {outputForRuleGroup && (
        <Panel>
          <span>Output: </span>
          <br />
          <JSONViewer json={outputForRuleGroup} />
        </Panel>
      )}
    </React.Fragment>
  );
};

export default EvaluteRuleGroup;
