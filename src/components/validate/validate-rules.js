import React, { useState } from "react";
import PropTypes from "prop-types";
import Panel from "../panel/panel";
import InputField from "../forms/input-field";
import SelectField from "../forms/selectmenu-field";
import Button from "../button/button";
import Table from "../table/table";
import Banner from "../panel/banner";
import * as Message from "../../constants/messages";
import { validateRuleset } from "../../validations/rule-validation";
import Loader from "../loader/loader";
import { ViewOutcomes } from "../attributes/view-attributes";

const ValidateRules = ({ attributes, decisions }) => {
  const [conditions, setConditions] = useState(
    attributes
      .filter((attr) => attr.type !== "object")
      .map((attr) => ({ name: attr.name, value: "" }))
  );
  const [message, setMessage] = useState(Message.NO_VALIDATION_MSG);
  const [loading, setLoading] = useState(false);
  const [outcomes, setOutcomes] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [result, setResult] = useState(false);

  const handleAttribute = (e, index) => {
    const newConditions = [...conditions];
    newConditions[index].name = e.target.value;
    setConditions(newConditions);
  };

  const handleValue = (e, index) => {
    const newConditions = [...conditions];
    newConditions[index].value = e.target.value;
    setConditions(newConditions);
  };

  const handleAdd = () => {
    setConditions([...conditions, { name: "", value: "" }]);
  };

  const validateRules = async (e) => {
    e.preventDefault();
    setLoading(true);
    let facts = {};
    conditions.forEach((condition) => {
      const attrProps = attributes.find((attr) => attr.name === condition.name);
      if (attrProps.type === "number") {
        facts[condition.name] = Number(condition.value);
      } else if (condition.value && condition.value.indexOf(",") > -1) {
        facts[condition.name] = condition.value.split(",");
      } else {
        facts[condition.name] = condition.value;
      }
    });

    try {
      const outcomes = await validateRuleset(facts, decisions);
      setLoading(false);
      setOutcomes(outcomes);
      setResult(true);
      setError(false);
      setErrorMessage("");
    } catch (e) {
      setLoading(false);
      setError(true);
      setErrorMessage(e.error);
      setResult(true);
    }
  };

  const attributeItems = () => {
    const options = attributes.map((att) => att.name);

    const formElements = conditions.map((condition, index) => (
      <tr key={condition.name + index || "item" + index}>
        <td>
          <SelectField
            options={options}
            onChange={(e) => handleAttribute(e, index)}
            value={condition.name}
            readOnly
          />
        </td>
        <td colSpan="2">
          <InputField
            onChange={(e) => handleValue(e, index)}
            value={condition.value}
          />
        </td>
      </tr>
    ));

    let messageContent;
    if (result) {
      if (error) {
        messageContent = (
          <div className="form-error">
            Problem occurred when processing the rules. Reason is {errorMessage}
          </div>
        );
      } else if (outcomes && outcomes.length < 1) {
        messageContent = <div>No results found</div>;
      } else if (outcomes && outcomes.length > 0) {
        messageContent = (
          <div className="view-params-container">
            <h4>Outcomes</h4>
            <ViewOutcomes items={outcomes} />
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        <Table columns={["Name", "Value"]}>{formElements}</Table>
        <div className="btn-group">
          <Button
            label="Validate Ruleset"
            onConfirm={validateRules}
            className="primary-btn"
            type="submit"
          />
        </div>
        <hr />
        {loading && <Loader />}
        {!loading && messageContent}
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      {decisions.length < 1 && <Banner message={message} />}
      {decisions.length > 0 && (
        <Panel>
          <form>
            <div>{attributeItems()}</div>
          </form>
        </Panel>
      )}
    </React.Fragment>
  );
};

ValidateRules.defaultProps = {
  attributes: [],
  decisions: [],
};

ValidateRules.propTypes = {
  attributes: PropTypes.array,
  decisions: PropTypes.array,
};

export default ValidateRules;
