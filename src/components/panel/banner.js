import React from "react";
import PropTypes from "prop-types";
import Button from "../button/button";

const Banner = ({ message, onConfirm }) => {
  const getButtonClass = () => {
    switch (message.type) {
      case "warning-panel":
        return "btn-warning";
      case "submit-panel":
        return "btn-primary";
      default:
        return "btn-dark";
    }
  };

  const btnClass = getButtonClass();

  return (
    <div className="banner-container">
      <div className={`banner ${message.type}`}>
        <div>
          <header>
            <b>{message.header}</b>
          </header>
          <p>{message.body}</p>
        </div>
        {message.buttonProps && (
          <div>
            <Button
              label={message.buttonProps.label}
              classname={btnClass}
              onConfirm={onConfirm}
            />
          </div>
        )}
      </div>
    </div>
  );
};

Banner.defaultProps = {
  ruleset: {},
  message: {},
  onConfirm: () => false,
};

Banner.propTypes = {
  ruleset: PropTypes.object,
  message: PropTypes.object,
  onConfirm: PropTypes.func,
};

export default Banner;
