import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import ToolBar from "../toolbar/toolbar";
import Banner from "../panel/banner";
import * as Message from "../../constants/messages";
import { isContains } from "../../utils/stringutils";
import AddAttributes from "./add-atrribtues";
import AttributeDetails from "./attr-details";

const Attributes = ({ handleAttribute, attributes = [] }) => {
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
      handleAttribute("ADD", attribute);
    },
    [handleAttribute]
  );

  const handleReset = useCallback(() => {
    handleAttribute("RESET");
  }, [handleAttribute]);

  const cancelAddAttribute = useCallback(() => {
    setShowAddAttr(false);
    setBannerflag(false);
  }, []);

  const filterAttribute = useCallback(() => {
    return attributes.filter(
      (att) =>
        isContains(att.name, searchCriteria) ||
        isContains(att.dataType, searchCriteria)
    );
  }, [attributes, searchCriteria]);

  const buttonProps = { primaryLabel: "Add Fact", secondaryLabel: "Cancel" };
  const filteredAttributes = searchCriteria ? filterAttribute() : attributes;

  return (
    <div className="attributes-container">
      <ToolBar
        handleAdd={handleAdd}
        reset={handleReset}
        searchTxt={handleSearch}
        addTitle="Add"
      />
      {showAddAttr && (
        <AddAttributes
          addAttribute={addAttribute}
          cancel={cancelAddAttribute}
          buttonProps={buttonProps}
        />
      )}
      <AttributeDetails
        attributes={filteredAttributes}
        updateAttribute={handleAttribute}
        removeAttribute={handleAttribute}
      />
      {!bannerflag && attributes.length < 1 && (
        <Banner message={Message.NO_ATTRIBUTE_MSG} onConfirm={handleAdd} />
      )}
    </div>
  );
};

Attributes.propTypes = {
  handleAttribute: PropTypes.func,
  attributes: PropTypes.array
};

export default Attributes;
