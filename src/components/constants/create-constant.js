import PropTypes from "prop-types";
import InputField from "../forms/input-field";
import Button from "../button/button";
import { useState } from "react";
import SelectField from "../forms/selectmenu-field";
import constantValidations from "../../validations/constant-validations";
import { useSelector } from "react-redux";

const CreateConstant = ({ inputData, onSubmit, onClose, showModal, mode }) => {
  const [formData, setFormData] = useState(inputData);
  const [error, setError] = useState({});
  const { dataTypes } = useSelector((state) => state.app);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = constantValidations(formData);
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
            {mode == "add" ? "Create" : "Edit"} Constant
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
            options={dataTypes.map((dataType) => dataType.name)}
            onChange={handleFormChange}
            value={formData.dataType}
            error={error.dataType}
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
              label={mode == "add" ? "Create" : "Update"}
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
