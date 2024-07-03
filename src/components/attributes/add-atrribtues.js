import React, { useState } from "react";
import PropTypes from "prop-types";
import Panel from "../panel/panel";
import InputField from "../forms/input-field";
import SelectField from "../forms/selectmenu-field";
import Button from "../button/button";
import attributeValidations from "../../validations/attribute-validations";
import dataTypes from "../../data-objects/operator.json";
import CheckBox from "../forms/checkbox";

const AddAttributes = ({
  attribute = {},
  addAttribute,
  cancel,
  buttonProps = {}
}) => {
  const [name, setName] = useState(attribute.name ?? "");
  const [type, setType] = useState(attribute.type ?? "");
  const [isMandatory, setMandatory] = useState(attribute.mandatory ?? false);
  const [error, setError] = useState({});

  const handleAdd = (e) => {
    e.preventDefault();
    const validationErrors = attributeValidations({ name, type, isMandatory });

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    } else {
      addAttribute({ name, type, isMandatory });
    }
  };

  const handleCancel = () => {
    cancel();
  };

  const handleChange = (e) => {
    const { checked } = e.target;
    setMandatory(checked);
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
            <CheckBox
              label="Is Mandatory"
              name="isMandatory"
              checked={isMandatory}
              onChange={handleChange}
              required={false}
            />
          </div>
          <div className="btn-group">
            <Button
              label={buttonProps.primaryLabel}
              onConfirm={handleAdd}
              classname="btn-success"
              type="submit"
            />
            <Button
              label={buttonProps.secondaryLabel}
              onConfirm={handleCancel}
              classname="btn-danger"
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
