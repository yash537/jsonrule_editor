import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Panel from "../panel/panel";
import SelectField from "../forms/selectmenu-field";
import Button from "../button/button";
import { attributeValidationsForRules } from "../../validations/attribute-validations";
import CheckBox from "../forms/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchFacts } from "../../redux/actions/fact";
import Spinner from "../Spinner";

const AddAttributes = ({
  attribute = {},
  addAttribute,
  cancel,
  buttonProps = {}
}) => {
  const [name, setName] = useState(attribute.name ?? "");
  const [type, setType] = useState(attribute.type ?? "");
  const [loading, setLoading] = useState(false);
  const [isMandatory, setMandatory] = useState(attribute.mandatory ?? false);
  const [error, setError] = useState({});
  const [filteredAttributes, setfilteredAttributes] = useState([]);
  const { attributes, attributesOfRule } = useSelector((state) => state.fact);

  useEffect(() => {
    // Filter out constants that are present in constantsPerRule
    const newfilteredAttributes = attributes.filter(
      (attr) =>
        !attributesOfRule.some(
          (attributeOfRule) => attributeOfRule.name === attr.name
        )
    );
    setfilteredAttributes(newfilteredAttributes);
  }, [attributes, attributesOfRule]);

  const handleAdd = (e) => {
    e.preventDefault();
    const validationErrors = attributeValidationsForRules({
      name,
      isMandatory
    });

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

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(handleFetchFacts());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Panel>
      <form>
        <div className="add-attribute-wrapper">
          <div className="form-groups-inline">
            <SelectField
              label="Name"
              options={filteredAttributes.map((item) => item.name)}
              onChange={(e) => setName(e.target.value)}
              value={name}
              error={error.name}
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
