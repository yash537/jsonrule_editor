import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Panel from "../panel/panel";
import InputField from "../forms/input-field";
import Button from "../button/button";
import Banner from "../panel/banner";
import * as Message from "../../constants/messages";
import { useDispatch, useSelector } from "react-redux";
import { resetRules, saveFactsKeyValuePerRule } from "../../redux/actions/rule";
import { useParams } from "react-router-dom";
import JSONViewer from "../jsonViewer";

const ValidateRules = () => {
  const { ruleId } = useParams();
  const { attributesOfRule } = useSelector((state) => state.fact);
  const { outputForRule } = useSelector((state) => state.rules);
  const [keyValues, setKeyValues] = useState({});
  const [resetCounter, setResetCounter] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(resetRules());
    };
  }, [dispatch]);

  useEffect(() => {
    const initialKeyValues = attributesOfRule.reduce((acc, attr) => {
      acc[attr.name] = "";
      return acc;
    }, {});
    setKeyValues(initialKeyValues);
  }, [attributesOfRule]);

  const handleKeyChange = (e) => {
    const { name, value } = e.target;
    setKeyValues({
      ...keyValues,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveFactsKeyValuePerRule(ruleId, keyValues));
  };

  const handleReset = () => {
    const resetKeyValues = attributesOfRule.reduce((acc, attr) => {
      acc[attr.name] = "";
      return acc;
    }, {});
    setKeyValues(resetKeyValues);
    setResetCounter(resetCounter + 1); // force re-render
  };

  return (
    <React.Fragment>
      {attributesOfRule.length < 1 && (
        <Banner message={Message.NO_VALIDATION_MSG} />
      )}
      {attributesOfRule.length > 0 && (
        <Panel key={resetCounter}>
          <form
            className="evaluate-rule-group-form"
            onSubmit={handleSubmit}
            onReset={handleReset}
          >
            {attributesOfRule.map((attr) => (
              <div key={attr.name} className="evaluate-wrapper">
                <div className="key-name"> {attr.name}: </div>
                <InputField
                  label=""
                  name={attr.name}
                  onChange={handleKeyChange}
                  required
                  value={keyValues[attr.name] || ""}
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
      {outputForRule && (
        <Panel>
          <span>Output: </span>
          <br />
          <JSONViewer json={outputForRule} />
        </Panel>
      )}
    </React.Fragment>
  );
};

ValidateRules.propTypes = {};

export default ValidateRules;
