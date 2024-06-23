import React from "react";
import PropTypes from "prop-types";

const NavButton = ({ classname, onConfirm, label }) => {
  return (
    <div className="nav-btn">
      <button type="button" className={classname} onClick={onConfirm}>
        {label}
      </button>
    </div>
  );
};

NavButton.propTypes = {
  classname: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};

export default NavButton;
