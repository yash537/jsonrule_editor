import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Panel from "../panel/panel";
import SelectField from "../forms/selectmenu-field";
import Button from "../button/button";
import { attributeValidationsForRules } from "../../validations/attribute-validations";
import dataTypes from "../../data-objects/operator.json";
import CheckBox from "../forms/checkbox";
import { useDispatch, useSelector } from "react-redux";
import { handleFetchFacts } from "../../redux/actions/fact";
import Spinner from "../Spinner";
import { handlefetchKeys } from "../../redux/actions/key";

const AddKeys = ({
  attribute = {},
  addAttribute,
  cancel,
  buttonProps = {}
}) => {
  const [name, setName] = useState(attribute.name ?? "");
  const [type, setType] = useState(attribute.type ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [filteredAttributes, setfilteredAttributes] = useState([]);
  const { keys, keysPerRule } = useSelector((state) => state.key);

  useEffect(() => {
    // Filter out constants that are present in constantsPerRule
    const newfilteredAttributes = keys.filter(
      (attr) =>
        !keysPerRule.some(
          (attributeOfRule) => attributeOfRule.name === attr.name
        )
    );
    setfilteredAttributes(newfilteredAttributes);
  }, [keys, keysPerRule]);

  const handleAdd = (e) => {
    e.preventDefault();
    const validationErrors = attributeValidationsForRules({
      name
    });

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
    } else {
      addAttribute({ name, type });
    }
  };

  const handleCancel = () => {
    cancel();
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(handlefetchKeys());
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

AddKeys.propTypes = {
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

export default AddKeys;
