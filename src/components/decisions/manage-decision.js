import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import InputField from "../forms/input-field";
import Button from "../button/button";
import SelectField from "../forms/selectmenu-field";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ManageDecision = ({ inputData, onSubmit, onClose, showModal }) => {
  console.log(inputData);
  const [formData, setFormData] = useState(inputData);
  const [error, setError] = useState({});
  const [keyValues, setKeyValues] = useState([{ key: "", value: "" }]);
  const { attributesOfRule } = useSelector((state) => state.fact);
  const { constantsPerRule } = useSelector((state) => state.constant);
  const { keysPerRule } = useSelector((state) => state.key);
  const { operators } = useSelector((state) => state.app);
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    if (inputData.action.action == "evaluate") {
      const keyValueArray = Object.entries(inputData.action.act).map(
        ([key, value]) => ({
          key,
          value: value.toString()
        })
      );
      setShowKey(true);
      setKeyValues(keyValueArray);
    }
    if (inputData.action.action == "execute") {
      setShowKey(true);
    }
  }, [inputData]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (name === "action") {
      if (value === "proceed") {
        setShowKey(false);
        setKeyValues([{ key: "", value: "" }]);
      } else if (value === "execute") {
        setShowKey(true);
        setKeyValues([{ key: "", value: "" }]);
      } else if (value === "evaluate") {
        setShowKey(true);
        setKeyValues([{ key: "", value: "" }]);
      }
    }
  };
  console.log(keyValues);
  const handleKeyChange = (e, index) => {
    const { name, value } = e.target;
    const newKeyValues = keyValues.map((keyValue, i) =>
      i === index ? { ...keyValue, [name]: value } : keyValue
    );
    setKeyValues(newKeyValues);
  };

  const addKeyValue = () => {
    setKeyValues([...keyValues, { key: "", value: "" }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("here");
    console.log(keyValues, formData);
    onSubmit({ ...formData, keyValues });
  };

  return (
    <div id="myModal" className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <div className="title-bar">
          <span className="title">Create decision</span>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <form onSubmit={handleSubmit} className="rule-group-form">
          <SelectField
            label="Fact"
            name="fact"
            onChange={handleFormChange}
            options={attributesOfRule.map((item) => item.name)}
            error={error.fact}
            value={inputData.fact}
            required
          />
          <SelectField
            label="Operator"
            name="operator"
            onChange={handleFormChange}
            options={operators.map((operator) => operator.name)}
            value={inputData.operator}
            error={error.operator}
            required
          />
          <SelectField
            label="Constant"
            name="constant"
            onChange={handleFormChange}
            options={constantsPerRule.map((item) => item.name)}
            error={error.constant}
            value={inputData.constant}
            required
          />
          <SelectField
            label="Action"
            name="action"
            onChange={handleFormChange}
            options={["proceed", "execute", "evaluate"]}
            error={error.action}
            value={inputData.action.action}
            required
          />
          {showKey &&
            ((formData.mode == "edit" &&
              formData.action.action === "execute") ||
              (formData.mode == "add" && formData.action === "execute")) && (
              <SelectField
                label="Key"
                name="key"
                onChange={handleFormChange}
                options={keysPerRule.map((item) => item.name)}
                error={error.keys}
                required
                value={Object.keys(inputData.action.act)[0]}
              />
            )}
          {showKey &&
            ((formData.mode == "edit" &&
              formData.action.action === "evaluate") ||
              (formData.mode == "add" && formData.action === "evaluate")) &&
            keyValues.map((keyValue, index) => (
              <div key={index} className="evalate-key-wrapper">
                <SelectField
                  label="Key"
                  name="key"
                  onChange={(e) => handleKeyChange(e, index)}
                  options={keysPerRule.map((item) => item.name)}
                  value={keyValue.key}
                  required
                />
                <InputField
                  label="Value"
                  name="value"
                  onChange={(e) => handleKeyChange(e, index)}
                  value={keyValue.value}
                  required
                />
              </div>
            ))}
          {showKey &&
            ((formData.mode == "edit" &&
              formData.action.action === "evaluate") ||
              (formData.mode == "add" && formData.action === "evaluate")) &&
            keyValues.length < keysPerRule.length && (
              <span onClick={addKeyValue} classname="add_more_btn">
                <FontAwesomeIcon
                  className="close-icon"
                  icon={faPlus}
                ></FontAwesomeIcon>{" "}
                Add More
              </span>
            )}
          <div style={{ display: "flex" }}>
            <Button
              label={formData.mode === "edit" ? "Edit" : "Add"}
              classname="btn-success"
              type="submit"
            />
            <Button
              label="Cancel"
              onConfirm={onClose}
              classname="btn-danger"
              type="reset"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

ManageDecision.propTypes = {
  inputData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired
};

export default ManageDecision;
