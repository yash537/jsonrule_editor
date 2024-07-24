import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
  label,
  onChange,
  error,
  required,
  options,
  value,
  readOnly,
  name
}) => {
  const errorClass = error ? "error" : "";
  const readOnlyClass = readOnly ? "readOnly" : "";

  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div className="form-field">
      {label && <label>{label}</label>}
      <select
        onChange={handleChange}
        className={`form-field-drpdwn ${errorClass} ${readOnlyClass}`}
        value={value}
        disabled={readOnly}
        name={name}
      >
        <option value="">Please select...</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  readOnly: PropTypes.bool
};

export default SelectField;
