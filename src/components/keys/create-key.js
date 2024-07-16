import PropTypes from "prop-types";
import InputField from "../forms/input-field";
import Button from "../button/button";
import { useState } from "react";
import keyValidations from "../../validations/key-validations";
import dataTypes from "../../data-objects/operator.json";
import SelectField from "../forms/selectmenu-field";

const CreateKey = ({ inputData, onSubmit, onClose, showModal }) => {
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
    const validationErrors = keyValidations(formData);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    } else {
      onSubmit(formData);
    }
  };

  const attributeTypes = Object.keys(dataTypes);

  return (
    <div id="myModal" className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <div className="title-bar">
          <span className="title">
            {formData.id ? "Update" : "Create"} Fact
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
          <SelectField
            label="DataType"
            name={"dataType"}
            options={attributeTypes}
            onChange={handleFormChange}
            value={formData.dataType}
            error={error.dataType}
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

CreateKey.propTypes = {
  inputData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired
};

export default CreateKey;
