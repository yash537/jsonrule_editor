import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { includes } from "lodash";
import { useNavigate } from "react-router-dom";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { RULE_AVAILABLE_CREATE } from "../constants/messages";
import { addRuleset } from "../redux/actions/rule";
import InputField from "../components/forms/input-field";
import Button from "../components/button/button";
import Notification from "../components/notification/notification";
import { TitlePanel } from "../components/panel/panel";

const CreateRulesetContainer = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState({});
  const [fileExist, setFileExist] = useState(false);
  const [message, setMessage] = useState({});

  const rulesetNames = useSelector((state) =>
    state.ruleset.rulesets.map((r) => r.name)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeName = (e) => setName(e.target.value);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError({ name: "Please specify a value" });
    } else if (includes(rulesetNames, name)) {
      setFileExist(true);
      setMessage(RULE_AVAILABLE_CREATE);
    } else {
      dispatch(addRuleset(name));
      navigate("/ruleset");
    }
  };

  return (
    <div className="single-panel-container">
      {fileExist && (
        <Notification
          body={message.body}
          heading={message.heading}
          type={message.type}
        />
      )}
      <TitlePanel title="Create Rules" titleClass={faSquarePlus}>
        <form onSubmit={handleAdd}>
          <div className="upload-panel">
            <InputField
              label="Name"
              onChange={onChangeName}
              value={name}
              error={error.name}
            />
            <Button label="Create" classname="primary-btn" type="submit" />
          </div>
        </form>
      </TitlePanel>
    </div>
  );
};

CreateRulesetContainer.propTypes = {
  rulesetNames: PropTypes.array
};

export default CreateRulesetContainer;
