import React, { useState } from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import Search from "../search/search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUndo } from "@fortawesome/free-solid-svg-icons"; // Assuming these icons are used

const ToolBar = ({ handleAdd, reset, searchTxt }) => {
  const [alert, setAlert] = useState({
    type: null, // success, warning, null
    show: false,
    message: ""
  });

  const handleReset = () => {
    setAlert({ type: "warning", show: true, message: "Are you sure?" });
  };

  const handleSearch = (value) => {
    searchTxt(value);
  };

  const handleAlertConfirm = () => {
    if (alert.type === "success") {
      reset();
    }
    setAlert({ ...alert, show: false });
  };

  const handleAlertCancel = () => {
    setAlert({ ...alert, show: false });
  };

  const resetAction = () => {
    reset();
    setAlert({
      type: "success",
      show: true,
      message: "Your changes are reset"
    });
  };

  const alertComponent = () => {
    if (alert.type === "success") {
      return (
        <SweetAlert
          success
          title={alert.message}
          onConfirm={handleAlertConfirm}
          onCancel={handleAlertCancel}
        />
      );
    } else if (alert.type === "warning") {
      return (
        <SweetAlert
          warning
          showCancel
          confirmBtnText="Yes, Reset it!"
          confirmBtnBsStyle="danger"
          title={alert.message}
          onConfirm={resetAction}
          onCancel={handleAlertCancel}
          focusCancelBtn
        >
          You will not be able to recover the changes!
        </SweetAlert>
      );
    }
    return null;
  };

  return (
    <div className={`attributes-header`}>
      {alert.show && alertComponent()}
      <div className="attr-link" onClick={handleAdd}>
        <FontAwesomeIcon icon={faPlus} className="plus-icon" />
        <span className="text">Add</span>
      </div>
      <div className="attr-link" onClick={handleReset}>
        <FontAwesomeIcon icon={faUndo} className="reset-icon" />
        <span className="text">Reset</span>
      </div>
      <div>
        <Search onConfirm={handleSearch} onChange={handleSearch} />
      </div>
    </div>
  );
};

ToolBar.propTypes = {
  handleAdd: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  searchTxt: PropTypes.func.isRequired
};

export default ToolBar;
