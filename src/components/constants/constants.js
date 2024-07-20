import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import ToolBar from "../toolbar/toolbar";
import Banner from "../panel/banner";
import * as Message from "../../constants/messages";
import { isContains } from "../../utils/stringutils";
import AddConstants from "./add-constants";
import ConstantDetails from "./constant-details";

const Constants = ({ handleConstant, constants = [] }) => {
  const [showAddAttr, setShowAddAttr] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [bannerflag, setBannerflag] = useState(false);

  const handleSearch = useCallback((value) => {
    setSearchCriteria(value);
  }, []);

  const handleAdd = useCallback(() => {
    setShowAddAttr(true);
    setBannerflag(true);
  }, []);

  const addAttribute = useCallback(
    (attribute) => {
      setShowAddAttr(false);
      handleConstant("ADD", attribute);
    },
    [handleConstant]
  );

  const handleReset = useCallback(() => {
    handleConstant("RESET");
  }, [handleConstant]);

  const cancelAddAttribute = useCallback(() => {
    setShowAddAttr(false);
    setBannerflag(false);
  }, []);

  const filterAttribute = useCallback(() => {
    return constants.filter(
      (att) =>
        isContains(att.name, searchCriteria) ||
        isContains(att.dataType, searchCriteria)
    );
  }, [constants, searchCriteria]);

  const buttonProps = {
    primaryLabel: "Add Constant",
    secondaryLabel: "Cancel"
  };

  const filteredConstants = searchCriteria ? filterAttribute() : constants;

  return (
    <div className="Constants-container">
      <ToolBar
        handleAdd={handleAdd}
        reset={handleReset}
        searchTxt={handleSearch}
        addTitle="Add"
      />
      {showAddAttr && (
        <AddConstants
          addAttribute={addAttribute}
          cancel={cancelAddAttribute}
          buttonProps={buttonProps}
        />
      )}
      <ConstantDetails
        constants={filteredConstants}
        updateAttribute={handleConstant}
        removeAttribute={handleConstant}
      />
      {!bannerflag && filteredConstants.length < 1 && (
        <Banner message={Message.NO_CONSTANT_MSG} onConfirm={handleAdd} />
      )}
    </div>
  );
};

Constants.propTypes = {
  handleConstant: PropTypes.func,
  constants: PropTypes.array
};

export default Constants;
