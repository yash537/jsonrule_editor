import React, { useState } from "react";
import PropTypes from "prop-types";

const CheckBox = ({
  label,
  onChange,
  error,
  value,
  required,
  readOnly,
  name,
  checked
}) => {
  const [fieldValue, setFieldValue] = useState(checked);

  const errorClass = error ? "error" : "";
  const readOnlyClass = readOnly ? "readOnly" : "";

  const handleChange = (e) => {
    setFieldValue(e.target.checked);
    onChange(e);

    if (required && !e.target.checked) {
      onChange({ ...e, error: `${name} is required` });
    } else {
      onChange({ ...e, error: "" });
    }
  };

  return (
    <div className="form-field checkbox-wrapper">
      <input
        type="checkbox"
        onChange={handleChange}
        checked={fieldValue}
        className={`checkbox-field ${errorClass} ${readOnlyClass}`}
        disabled={readOnly}
        name={name}
      />
      {label && <label htmlFor={name}>{label}</label>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

CheckBox.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  value: PropTypes.any.isRequired,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool
};

export default CheckBox;
