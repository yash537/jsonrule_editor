import PropTypes from "prop-types";
import InputField from "../forms/input-field";
import Button from "../button/button";
import { useState } from "react";
import SelectField from "../forms/selectmenu-field";
import dataTypes from "../../data-objects/operator.json";

const CreateConstant = ({ inputData, onSubmit, onClose, showModal }) => {
  const [formData, setFormData] = useState(inputData);
  const [error, setError] = useState({});
  console.log(formData);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const attributeTypes = Object.keys(dataTypes);

  return (
    <div id="myModal" className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <div className="title-bar">
          <span className="title">Create Fact</span>
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
          <SelectField
            label="Type"
            name={"type"}
            options={attributeTypes}
            onChange={handleFormChange}
            value={formData.type}
            error={error.type}
          />
          <InputField
            label="Value"
            name="value"
            onChange={handleFormChange}
            value={formData.value}
            error={error.value}
            required
          />
          <div style={{ display: "flex" }}>
            <Button
              label={formData.id ? "Update" : "Create"}
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

CreateConstant.propTypes = {
  inputData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired
};

export default CreateConstant;
