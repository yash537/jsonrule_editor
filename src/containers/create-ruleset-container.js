import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { includes } from "lodash/collection";
import { RULE_AVAILABLE_CREATE } from "../constants/messages";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

import { TitlePanel } from "../components/panel/panel";
import InputField from "../components/forms/input-field";
import Button from "../components/button/button";
import Notification from "../components/notification/notification";
import { useNavigate } from "react-router-dom";
import { addRuleset } from "../redux/actions/rule";

const CreateRulesetContainer = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState({});
  const [fileExist, setFileExist] = useState(false);
  const [message, setMessage] = useState({});

  const rulesetnames = useSelector((state) =>
    state.ruleset.rulesets.map((r) => r.name)
  );
  const dispatch = useDispatch();

  const history = useNavigate();

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !name.trim()) {
      setError({ name: "Please specify value" });
    } else if (includes(rulesetnames, name)) {
      setFileExist(true);
      setMessage(RULE_AVAILABLE_CREATE);
    } else {
      dispatch(addRuleset(name));
      history("/ruleset");
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
        <form>
          <div className="upload-panel">
            <InputField
              label="Name"
              onChange={onChangeName}
              value={name}
              error={error.name}
            />
            <Button
              label={"Create"}
              onConfirm={handleAdd}
              classname="primary-btn"
              type="submit"
            />
          </div>
        </form>
      </TitlePanel>
    </div>
  );
};

CreateRulesetContainer.defaultProps = {
  rulesetnames: [],
};

CreateRulesetContainer.propTypes = {
  rulesetnames: PropTypes.array,
};

export default CreateRulesetContainer;
