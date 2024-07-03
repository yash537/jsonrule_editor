import React, { useState } from "react";
import PropTypes from "prop-types";

const InputField = ({
  label,
  onChange,
  error,
  value,
  required,
  readOnly,
  placeholder,
  name
}) => {
  const [fieldValue, setFieldValue] = useState(value);

  const errorClass = error ? "error" : "";
  const readOnlyClass = readOnly ? "readOnly" : "";

  const handleChange = (e) => {
    setFieldValue(e.target.value);
    onChange(e);

    if (required && e.target.value.trim() !== "") {
      onChange({ ...e, error: "" });
    }
  };

  return (
    <div className="form-field">
      {label && <label>{label}</label>}
      <input
        type="text"
        onChange={handleChange}
        value={fieldValue}
        className={`${errorClass} ${readOnlyClass}`}
        disabled={readOnly}
        placeholder={placeholder}
        name={name}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  value: PropTypes.any.isRequired, // Example of making value required
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  placeholder: PropTypes.string,
  name: PropTypes.string
};

export default InputField;
