import PropTypes from "prop-types";
import InputField from "../forms/input-field";
import Button from "../button/button";
import { useState } from "react";
import SelectField from "../forms/selectmenu-field";
import ruleGroupValidations from "../../validations/rule-group-validations";

const CreateRuleGroup = ({ inputData, onSubmit, onClose, showModal, mode }) => {
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
    const validationErrors = ruleGroupValidations(formData);
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
          <span className="title">
            {mode == "edit" ? "Edit" : "Create"} Rule Group
          </span>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <form onSubmit={handleSubmit} className="rule-group-form">
          <InputField
            label="Name"
            name="name"
            onChange={handleFormChange}
            value={formData.name}
            error={error.name}
            required
          />
          {mode == "add" && (
            <SelectField
              label="Execution Method"
              name={"executionMethod"}
              options={["single", "merged"]}
              onChange={handleFormChange}
              value={formData.executionMethod}
              error={error.executionMethod}
            />
          )}

          <div style={{ display: "flex" }}>
            <Button
              label={mode == "edit" ? "Edit" : "Create"}
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

CreateRuleGroup.propTypes = {
  inputData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired
};

export default CreateRuleGroup;
