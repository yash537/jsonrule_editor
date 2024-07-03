import React, { useState } from "react";
import PropTypes from "prop-types";
import SweetAlert from "react-bootstrap-sweetalert";
import AddAttributes from "./add-atrribtues";
import { PanelBox } from "../panel/panel";
import Button from "../button/button";

const AttributeDetails = ({ attributes, updateAttribute, removeAttribute }) => {
  const [removeAlert, setRemoveAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [activeAttribute, setActiveAttribute] = useState(null);
  const [activeAttributeIndex, setActiveAttributeIndex] = useState(-1);
  const [showRuleIndex, setShowRuleIndex] = useState(-1);

  const handleEdit = (e, val) => {
    e.preventDefault();
    setShowRuleIndex(val);
  };

  const handleRemove = (e, attribute, index) => {
    e.preventDefault();
    setRemoveAlert(true);
    setActiveAttribute(attribute);
    setActiveAttributeIndex(index);
  };

  const remove = () => {
    removeAttribute("REMOVE", activeAttribute, activeAttributeIndex);
    setSuccessAlert(true);
  };

  const cancelAlert = () => {
    setRemoveAlert(false);
    setSuccessAlert(false);
    setShowRuleIndex(-1);
  };

  const updateAttributeFunc = (attribute) => {
    setShowRuleIndex(-1);
    updateAttribute("UPDATE", attribute, showRuleIndex);
  };

  const removeAlertComponent = () => (
    <SweetAlert
      warning
      showCancel
      confirmBtnText="Yes, Remove it!"
      confirmBtnBsStyle="danger"
      title="Are you sure?"
      onConfirm={remove}
      onCancel={cancelAlert}
      focusCancelBtn
    >
      You will not be able to recover the changes!
    </SweetAlert>
  );

  const successAlertComponent = () => (
    <SweetAlert
      success
      title={"Attribute has been removed successfully!!"}
      onConfirm={cancelAlert}
    />
  );

  return (
    <React.Fragment>
      {removeAlert && removeAlertComponent()}
      {successAlert && successAlertComponent()}
      {attributes.map((attr, index) => (
        <div key={attr.name}>
          <PanelBox className={attr.type}>
            <div className="index">{index + 1}</div>
            <div className="name">{attr.name}</div>
            <div className="type">
              <span className={attr.type}>{attr.type}</span>
            </div>
            <div className="mandatory">
              <span
                className={attr.isMandatory ? "success-badge" : "warning-badge"}
              >
                {attr.isMandatory ? "Mandatory" : "Not Mandatory"}
              </span>
            </div>
            <div className="menu">
              <Button
                label={"Edit"}
                onConfirm={(e) => handleEdit(e, index)}
                classname="btn-primary"
                type="submit"
              />
              <Button
                label={"Delete"}
                onConfirm={(e) => handleRemove(e, index)}
                classname="btn-danger"
                type="submit"
              />
            </div>
          </PanelBox>
          {showRuleIndex === index && (
            <AddAttributes
              attribute={attr}
              addAttribute={updateAttributeFunc}
              cancel={cancelAlert}
              buttonProps={{
                primaryLabel: "Save Changes",
                secondaryLabel: "Cancel"
              }}
            />
          )}
        </div>
      ))}
    </React.Fragment>
  );
};

AttributeDetails.propTypes = {
  attributes: PropTypes.array,
  updateAttribute: PropTypes.func,
  removeAttribute: PropTypes.func
};

export default AttributeDetails;
