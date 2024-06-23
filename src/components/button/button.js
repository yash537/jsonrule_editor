import React from "react";
import PropTypes from "prop-types";

const Button = ({ label, onConfirm, classname, type, disabled }) => {
  return (
    <div className="btn-container">
      <button
        className={`btn ${classname}`}
        type={type}
        onClick={onConfirm}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
};

Button.propTypes = {
  classname: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool
};

export default Button;
