import React, { useState } from "react";
import PropTypes from "prop-types";
import Panel from "../panel/panel";
import InputField from "../forms/input-field";
import SelectField from "../forms/selectmenu-field";
import Button from "../button/button";
import attributeValidations from "../../validations/attribute-validations";
import dataTypes from "../../data-objects/operator.json";

const AddAttributes = ({
  attribute = {},
  addAttribute,
  cancel,
  buttonProps = {}
}) => {
  const [name, setName] = useState(attribute.name ?? "");
  const [type, setType] = useState(attribute.type ?? "");
  const [error, setError] = useState({});

  const handleAdd = (e) => {
    e.preventDefault();
    const validationErrors = attributeValidations({ name, type });

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    } else {
      addAttribute({ name, type });
    }
  };

  const handleCancel = () => {
    cancel();
  };

  const attributeTypes = Object.keys(dataTypes);

  return (
    <Panel>
      <form>
        <div className="add-attribute-wrapper">
          <div className="form-groups-inline">
            <InputField
              label="Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              error={error.name}
              required
            />
            <SelectField
              label="Type"
              options={attributeTypes}
              onChange={(e) => setType(e.target.value)}
              value={type}
              error={error.type}
            />
          </div>
          <div className="btn-group">
            <Button
              label={buttonProps.primaryLabel}
              onConfirm={handleAdd}
              classname="primary-btn"
              type="submit"
            />
            <Button
              label={buttonProps.secondaryLabel}
              onConfirm={handleCancel}
              classname="cancel-btn"
            />
          </div>
        </div>
      </form>
    </Panel>
  );
};

AddAttributes.propTypes = {
  addAttribute: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
  attribute: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string
  }),
  buttonProps: PropTypes.shape({
    primaryLabel: PropTypes.string.isRequired,
    secondaryLabel: PropTypes.string.isRequired
  })
};

export default AddAttributes;
