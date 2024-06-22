import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import Search from "../search/search";
import ApperanceContext from "../../context/apperance-context";

const ToolBar = ({ handleAdd, reset, searchTxt }) => {
  const [submitAlert, setSubmitAlert] = useState(false);
  const [resetAlert, setResetAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const context = useContext(ApperanceContext);

  const handleReset = () => {
    setResetAlert(true);
  };

  const handleSearch = (value) => {
    searchTxt(value);
  };

  const cancelAlert = () => {
    setSubmitAlert(false);
    setResetAlert(false);
    setSuccessAlert(false);
  };

  const resetAction = () => {
    reset();
    setResetAlert(false);
    setSuccessAlert(true);
    setSuccessMsg("Your changes are reset");
  };

  const successAlertComponent = () => (
    <SweetAlert success title={successMsg} onConfirm={cancelAlert} />
  );

  const resetAlertComponent = () => (
    <SweetAlert
      warning
      showCancel
      confirmBtnText="Yes, Reset it!"
      confirmBtnBsStyle="danger"
      title="Are you sure?"
      onConfirm={resetAction}
      onCancel={cancelAlert}
      focusCancelBtn
    >
      You will not be able to recover the changes!
    </SweetAlert>
  );

  return (
    <div className={`attributes-header ${context.background}`}>
      {resetAlert && resetAlertComponent()}
      {successAlert && successAlertComponent()}
      <div className="attr-link" onClick={handleAdd}>
        <span className="plus-icon" />
        <span className="text">Add</span>
      </div>
      <div className="attr-link" onClick={handleReset}>
        <span className="reset-icon" />
        <span className="text">Reset</span>
      </div>
      <div>
        <Search onConfirm={handleSearch} onChange={handleSearch} />
      </div>
    </div>
  );
};

ToolBar.defaultProps = {
  handleAdd: () => false,
  reset: () => false,
  searchTxt: () => false,
};

ToolBar.propTypes = {
  handleAdd: PropTypes.func,
  reset: PropTypes.func,
  searchTxt: PropTypes.func,
};

export default ToolBar;
