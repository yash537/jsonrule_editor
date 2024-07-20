import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import ToolBar from "../toolbar/toolbar";
import Banner from "../panel/banner";
import * as Message from "../../constants/messages";
import { isContains } from "../../utils/stringutils";
import AddKeys from "./add-keys";
import KeyDetails from "./Key-details";

const Keys = ({ handleConstant, keys = [] }) => {
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

  const filterKey = useCallback(() => {
    return keys.filter(
      (att) =>
        isContains(att.name, searchCriteria) ||
        isContains(att.dataType, searchCriteria)
    );
  }, [keys, searchCriteria]);

  const buttonProps = {
    primaryLabel: "Add Key",
    secondaryLabel: "Cancel"
  };

  const filteredKeys = searchCriteria ? filterKey() : keys;

  return (
    <div className="Constants-container">
      <ToolBar
        handleAdd={handleAdd}
        reset={handleReset}
        searchTxt={handleSearch}
        addTitle="Add"
      />
      {showAddAttr && (
        <AddKeys
          addAttribute={addAttribute}
          cancel={cancelAddAttribute}
          buttonProps={buttonProps}
        />
      )}
      <KeyDetails
        constants={filteredKeys}
        updateAttribute={handleConstant}
        removeAttribute={handleConstant}
      />
      {!bannerflag && filteredKeys.length < 1 && (
        <Banner message={Message.NO_KEYS_MSG} onConfirm={handleAdd} />
      )}
    </div>
  );
};

Keys.propTypes = {
  handleConstant: PropTypes.func,
  constants: PropTypes.array
};

export default Keys;
