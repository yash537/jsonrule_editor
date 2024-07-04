import React, { useState } from "react";
import PropTypes from "prop-types";
import InputField from "../forms/input-field";
import Button from "../button/button";

const CreateRule = ({ inputData, onSubmit, onClose, showModal }) => {
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
    onSubmit(formData);
  };

  return (
    <div id="myModal" className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <div className="title-bar">
          <span className="title">Create Rule</span>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <form onSubmit={handleSubmit} className="rule-group">
          <InputField
            label="Title"
            name="title"
            onChange={handleFormChange}
            value={formData.title}
            error={error.title}
            required
          />
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

CreateRule.propTypes = {
  inputData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired
};

export default CreateRule;
