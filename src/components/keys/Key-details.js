import React, { useState } from "react";
import PropTypes from "prop-types";
import { PanelBox } from "../panel/panel";
import Button from "../button/button";
import AddConstants from "./add-keys";

const KeyDetails = ({ constants, updateAttribute, removeAttribute }) => {
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

  return (
    <React.Fragment>
      {constants.map((attr, index) => (
        <div key={attr.name}>
          <PanelBox className={attr.type}>
            <div className="index">{index + 1}</div>
            <div className="name">{attr.name}</div>
            <div className="type">
              <span className={attr.dataType}>{attr.dataType}</span>
            </div>
            <div className="">
              <span className={attr.description}>
                {attr.description ?? "-"}
              </span>
            </div>
            <div className="menu">
              <Button
                label={"Delete"}
                onConfirm={(e) => handleRemove(e, index)}
                classname="btn-danger"
                type="submit"
              />
            </div>
          </PanelBox>
          {showRuleIndex === index && (
            <AddConstants
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

KeyDetails.propTypes = {
  constants: PropTypes.array,
  updateAttribute: PropTypes.func,
  removeAttribute: PropTypes.func
};

export default KeyDetails;
