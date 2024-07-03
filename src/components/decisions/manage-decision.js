import React, { useState } from "react";
import PropTypes from "prop-types";
import InputField from "../forms/input-field";
import Button from "../button/button";
import decisionValidations from "../../validations/decision-validation";
import SelectField from "../forms/selectmenu-field";

const ManageDecision = ({ inputData, onSubmit, onClose, showModal }) => {
  const [formData, setFormData] = useState(inputData);
  const [error, setError] = useState({});

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = decisionValidations(formData);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    } else {
      onSubmit(formData);
    }
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
        <form onSubmit={handleSubmit} className="fact-form">
          <InputField
            label="Fact"
            name="fact"
            onChange={handleFormChange}
            value={formData.fact}
            error={error.fact}
            required
          />
          <SelectField
            label="Operator"
            name="operator"
            onChange={handleFormChange}
            options={[
              "equal",
              "lessThan",
              "lessThanInclusive",
              "greaterThan",
              "greaterThanInclusive",
              "notEqual"
            ]}
            error={error.fact}
            required
          />
          <InputField
            label="Value"
            name="value"
            onChange={handleFormChange}
            value={formData.value}
            error={error.value}
            required
          />
          <InputField
            label="Value Reference"
            name="valueref"
            onChange={handleFormChange}
            value={formData.valueref}
            error={error.valueref}
            required
          />
          <SelectField
            label="Type"
            name="type"
            onChange={handleFormChange}
            options={["integer", "number", "string", "array", "list", "object"]}
            error={error.fact}
            required
          />
          <SelectField
            label="Action"
            name="action"
            onChange={handleFormChange}
            options={["proceed", "execute"]}
            error={error.action}
            required
          />
          <div style={{ display: "flex" }}>
            <Button
              label="Cancel"
              onConfirm={onClose}
              classname="btn-danger"
              type="reset"
            />
            <Button
              label={formData.mode === "edit" ? "Edit" : "Add"}
              classname="btn-success"
              type="submit"
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
