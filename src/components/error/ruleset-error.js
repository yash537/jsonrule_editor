import React, { useState, useEffect } from "react";
import Notification from "../notification/notification";
import { RULE_ERROR } from "../../constants/messages";
import PropTypes from "prop-types";

const RuleErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => {
      setHasError(true);
    };

    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <React.Fragment>
      {hasError && (
        <Notification
          heading={RULE_ERROR.heading}
          body={RULE_ERROR.body}
          type={RULE_ERROR.type}
        />
      )}
      {children}
    </React.Fragment>
  );
};

RuleErrorBoundary.propTypes = {
  children: PropTypes.any
};

export default RuleErrorBoundary;
