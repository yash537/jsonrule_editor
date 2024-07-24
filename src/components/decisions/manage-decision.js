import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import InputField from "../forms/input-field";
import Button from "../button/button";
import SelectField from "../forms/selectmenu-field";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import conditionValidations from "../../validations/condition-validations";

const ManageDecision = ({ inputData, onSubmit, onClose, showModal }) => {
  const [formData, setFormData] = useState(inputData);
  const [error, setError] = useState({});
  const [keyValues, setKeyValues] = useState([{ key: "", value: "" }]);
  const [factDataType, setFactDataType] = useState("");

  const { attributesOfRule } = useSelector((state) => state.fact);
  const { constantsPerRule } = useSelector((state) => state.constant);
  const { keysPerRule } = useSelector((state) => state.key);
  const { operators } = useSelector((state) => state.app);
  const [showKey, setShowKey] = useState(false);

  const mergedFactOptions = useMemo(() => {
    return [
      ...attributesOfRule.map((item) => ({
        name: item.name,
        dataType: item.dataType
      })),
      ...keysPerRule.map((item) => ({
        name: item.name,
        dataType: item.dataType
      }))
    ];
  }, [constantsPerRule, keysPerRule]);

  const mergedOptions = useMemo(() => {
    return [
      ...constantsPerRule.map((item) => ({
        name: item.name,
        dataType: item.dataType
      })),
      ...keysPerRule.map((item) => ({
        name: item.name,
        dataType: item.dataType
      }))
    ];
  }, [constantsPerRule, keysPerRule]);

  const filteredOptions = useMemo(() => {
    return mergedOptions.filter((item) => {
      if (factDataType === "String") {
        return item.dataType === "String" || item.dataType === "List(String)";
      }
      return item.dataType === factDataType;
    });
  }, [mergedOptions, factDataType]);

  useEffect(() => {
    if (formData.mode === "edit") {
      setFormData({ ...formData, action: formData.action.action });
    }
    if (inputData.action.action === "execute") {
      const keyValueArray = Object.entries(inputData.action.act).map(
        ([key, value]) => ({
          key,
          value: value.toString()
        })
      );
      setShowKey(true);
      setKeyValues(keyValueArray);
    }
    if (inputData.action.action === "execute") {
      setShowKey(true);
    }
  }, [inputData]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    if (name === "action") {
      if (value === "proceed") {
        setShowKey(false);
        setKeyValues([{ key: "", value: "" }]);
      } else if (value === "execute" || value === "evaluate") {
        setShowKey(true);
        setKeyValues([{ key: "", value: "" }]);
      }
    }

    if (name === "fact") {
      const selectedFact = mergedFactOptions.find(
        (item) => item.name === value
      );
      setFactDataType(selectedFact ? selectedFact.dataType : "");
      updatedFormData = { ...updatedFormData, constant: "" };
    }

    setFormData(updatedFormData);
  };

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
    const validationErrors = conditionValidations(formData);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    } else {
      onSubmit({ ...formData, keyValues });
    }
  };

  return (
    <div id="myModal" className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <div className="title-bar">
          <span className="title">
            {formData.mode === "edit" ? "Edit" : "Create"} Decision
          </span>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <form onSubmit={handleSubmit} className="rule-group-form">
          <SelectField
            label="Fact"
            name="fact"
            onChange={handleFormChange}
            options={mergedFactOptions.map((item) => item.name)}
            error={error.fact}
            value={formData.fact}
            required
          />
          <SelectField
            label="Operator"
            name="operator"
            onChange={handleFormChange}
            options={operators.map((operator) => operator.name)}
            value={formData.operator}
            error={error.operator}
            required
          />
          <SelectField
            label="Constant"
            name="constant"
            onChange={handleFormChange}
            options={filteredOptions.map((item) => item.name)}
            error={error.constant}
            value={formData.constant}
            required
          />
          <SelectField
            label="Action"
            name="action"
            onChange={handleFormChange}
            options={["proceed", "execute", "evaluate"]}
            error={error.action}
            value={formData.action}
            required
          />
          {showKey &&
            (formData.action === "evaluate" ||
              formData.action === "execute") && (
              <SelectField
                label="Key"
                name="key"
                onChange={handleFormChange}
                options={keysPerRule.map((item) => item.name)}
                error={error.keys}
                required
                value={
                  inputData.action.act
                    ? Object.keys(inputData.action.act)[0]
                    : ""
                }
              />
            )}
          {showKey &&
            formData.action === "execute" &&
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
            formData.action === "execute" &&
            keyValues.length < keysPerRule.length && (
              <span onClick={addKeyValue} className="add_more_btn">
                <FontAwesomeIcon className="close-icon" icon={faPlus} /> Add
                More
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
