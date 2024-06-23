import React, { useContext } from "react";
import PropTypes from "prop-types";
import ApperanceContext from "../../context/apperance-context";

const ButtonGroup = ({ buttons, onConfirm }) => {
  const { background } = useContext(ApperanceContext);

  return (
    <div className={`btn-group-container ${background}`}>
      {buttons.map((button) => (
        <div key={button.label} className="btn-grp">
          <button
            onClick={() => onConfirm(button.label)}
            type="button"
            className={button.active ? "active" : ""}
            disabled={button.disable}
          >
            {button.label}
          </button>
        </div>
      ))}
    </div>
  );
};

ButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      active: PropTypes.bool,
      disable: PropTypes.bool
    })
  ).isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default ButtonGroup;
