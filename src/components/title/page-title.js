import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { updateCurrentRuleName } from "../../redux/actions/rule";
import { useDispatch, useSelector } from "react-redux";

const PageTitle = ({ titleFlag }) => {
  const ruleset = useSelector(
    (state) => state.ruleset.rulesets[state.ruleset.activeRuleset]
  );
  const activeEditor = useRef(null);
  const dispatch = useDispatch();
  const [editingTitle, setEditingTitle] = useState(false);

  useEffect(() => {
    if (editingTitle != undefined) {
      activeEditor.current?.focus();
      activeEditor.current?.select();
    }
  }, [editingTitle]);

  return (
    <div className="page-title">
      {titleFlag && <TitleIcon />}
      <div>
        <h1>
          {editingTitle ? (
            <input
              ref={activeEditor}
              className="edit-input"
              defaultValue={ruleset?.name ?? ""}
              onInput={(event) =>
                dispatch(updateCurrentRuleName(event.target.value))
              }
              onKeyDown={(event) => {
                if (event.key == "Enter") {
                  setEditingTitle(false);
                  dispatch(updateCurrentRuleName(event.target.value));
                }
              }}
            />
          ) : (
            <span onClick={() => setEditingTitle(true)}>
              {ruleset?.name ?? ""}
            </span>
          )}
        </h1>
      </div>
    </div>
  );
};

PageTitle.propTypes = {
  name: PropTypes.string,
  classname: PropTypes.string,
  titleFlag: PropTypes.bool
};

export const TitleIcon = ({ iconClass = {} }) => {
  return (
    <div className="icon-card">
      <FontAwesomeIcon icon={iconClass} />
    </div>
  );
};

TitleIcon.propTypes = {
  iconClass: PropTypes.object
};

export default PageTitle;
