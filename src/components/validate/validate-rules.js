import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Panel from "../panel/panel";
import InputField from "../forms/input-field";
import Button from "../button/button";
import Banner from "../panel/banner";
import * as Message from "../../constants/messages";
import { useSelector } from "react-redux";

const ValidateRules = () => {
  const { attributesOfRule } = useSelector((state) => state.fact);
  const [keyValues, setKeyValues] = useState([]);

  // Initialize keyValues based on attributesOfRule
  useEffect(() => {
    const initialKeyValues = attributesOfRule.map((attr) => ({
      key: attr.name,
      value: ""
    }));
    setKeyValues(initialKeyValues);
  }, [attributesOfRule]);

  const handleKeyChange = (e, index) => {
    const { name, value } = e.target;
    const newKeyValues = [...keyValues];
    newKeyValues[index].value = value;
    setKeyValues(newKeyValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation or other logic with keyValues
    console.log(keyValues);
  };

  const handleReset = () => {
    const resetKeyValues = keyValues.map((kv) => ({ ...kv, value: "" }));
    setKeyValues(resetKeyValues);
  };

  return (
    <React.Fragment>
      {attributesOfRule.length < 1 && (
        <Banner message={Message.NO_VALIDATION_MSG} />
      )}
      {attributesOfRule.length > 0 && (
        <Panel>
          <form
            className="rule-group-form"
            onSubmit={handleSubmit}
            onReset={handleReset}
          >
            {attributesOfRule.map((attr, index) => (
              <div key={attr.name} className="evaluate-wrapper">
                <div> {attr.name}: </div>
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
    </React.Fragment>
  );
};

ValidateRules.propTypes = {};

export default ValidateRules;
