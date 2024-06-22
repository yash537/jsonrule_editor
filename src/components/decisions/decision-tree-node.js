import React, { useState } from "react";
import { faEdit, faTrash, faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Node = ({ condition, onAddNode, onEditNode, onDeleteNode }) => {
  const [showChildren, setShowChildren] = useState(false);

  const handleToggleChildren = () => {
    setShowChildren(!showChildren);
  };

  return (
    <ul className="tree">
      <li style={{ listStyleType: "none" }}>
        <div className="tree-box">
          {condition.conditions && condition.conditions.length > 0 && (
            <span className="toggle-btn" onClick={handleToggleChildren}>
              {showChildren ? "▼" : "▶"}
            </span>
          )}
          <span className="textbold">{condition.field} </span>
          <span> ({condition.operator}) </span>
          <span className="textbold">{condition.value}</span>
          <span className="edit-node" onClick={() => onEditNode(condition)}>
            <FontAwesomeIcon
              className="close-icon"
              icon={faEdit}
            ></FontAwesomeIcon>
          </span>
          <span className="delete-node" onClick={() => onDeleteNode(condition)}>
            <FontAwesomeIcon
              className="close-icon"
              icon={faTrash}
            ></FontAwesomeIcon>
          </span>
          <span className="add-node" onClick={() => onAddNode(condition)}>
            <FontAwesomeIcon
              className="close-icon"
              icon={faAdd}
            ></FontAwesomeIcon>
          </span>
          {condition.action && (
            <div className="action">
              Action: {condition.action.action}
              {condition.action.act && (
                <div className="action">
                  {Object.entries(condition.action.act).map(([key, value]) => (
                    <div key={key}>
                      {key}: {value}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {showChildren &&
          condition.conditions &&
          condition.conditions.length > 0 && (
            <div className="node-children">
              {condition.conditions.map((childCondition, index) => (
                <Node
                  key={index}
                  condition={childCondition}
                  onAddNode={onAddNode}
                  onEditNode={onEditNode}
                  onDeleteNode={onDeleteNode}
                />
              ))}
            </div>
          )}
      </li>
    </ul>
  );
};

export default Node;
