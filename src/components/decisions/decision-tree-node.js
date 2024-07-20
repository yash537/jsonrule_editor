import React, { useState } from "react";
import {
  faPencil,
  faTrash,
  faAdd,
  faAngleDown,
  faAngleUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteModal from "../Delete";

const Node = ({ condition, onAddNode, onEditNode, onDeleteNode }) => {
  const [showChildren, setShowChildren] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentNode, setCurrentNode] = useState({});

  const handleToggleChildren = () => {
    setShowChildren(!showChildren);
  };

  const handleDelete = (node) => {
    setCurrentNode(node);
    setShowDeleteModal(true);
  };

  const handleActionClick = () => {
    setShowDeleteModal(false);
    onDeleteNode(currentNode);
  };

  return (
    <>
      {showDeleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onProceed={handleActionClick}
        />
      )}
      <ul className="tree">
        <li style={{ listStyleType: "none" }}>
          <div className="tree-box">
            <div style={{ display: "flex" }}>
              {condition.conditions && condition.conditions.length > 0 && (
                <span className="toggle-btn" onClick={handleToggleChildren}>
                  {showChildren ? (
                    <FontAwesomeIcon
                      className="close-icon"
                      icon={faAngleDown}
                    ></FontAwesomeIcon>
                  ) : (
                    <FontAwesomeIcon
                      className="close-icon"
                      icon={faAngleUp}
                    ></FontAwesomeIcon>
                  )}
                </span>
              )}
              <div className="tree-box-inner">
                <div style={{ display: "flex" }}>
                  <div>
                    <span className="textbold">{condition.fact} </span>
                    <span> ({condition.operator}) </span>
                    <span className="textbold">{condition.constant}</span>
                  </div>
                  <div className="action-btn">
                    <span
                      className="add-node"
                      onClick={() => onAddNode(condition)}
                    >
                      <FontAwesomeIcon
                        className="close-icon"
                        icon={faAdd}
                      ></FontAwesomeIcon>
                    </span>
                    <span
                      className="edit-node"
                      onClick={() => onEditNode(condition)}
                    >
                      <FontAwesomeIcon
                        className="close-icon"
                        icon={faPencil}
                      ></FontAwesomeIcon>
                    </span>
                    <span
                      className="delete-node"
                      onClick={() => handleDelete(condition)}
                    >
                      <FontAwesomeIcon
                        className="close-icon"
                        icon={faTrash}
                      ></FontAwesomeIcon>
                    </span>
                  </div>
                </div>
                {condition.action.action && (
                  <div className="action">
                    <span className="action-message">
                      {condition.action.action}
                    </span>
                    {condition.action.act && (
                      <div className="action">
                        {Object.entries(condition.action.act).map(
                          ([key, value]) => (
                            <div key={key}>
                              {key}: {value}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
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
    </>
  );
};

export default Node;
