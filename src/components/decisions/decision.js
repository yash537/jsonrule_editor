import React, { useState } from "react";
import Tree from "./decision-tree";
import ManageDecision from "./manage-decision";
import Button from "../button/button";

const initialData = {
  name: "mplemployeeEligibility",
  conditions: []
};

const Decisions = () => {
  const [treeData, setTreeData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentNode, setCurrentNode] = useState(null);
  const [formData, setFormData] = useState({
    fact: "",
    operator: "",
    value: "",
    valueref: "",
    type: "",
    action: "",
    mode: "add"
  });

  const handleAddNode = (parentNode) => {
    setModalMode("add");
    setCurrentNode(parentNode);
    setFormData({
      fact: "",
      operator: "",
      value: "",
      valueref: "",
      type: "",
      action: "",
      mode: "add"
    });
    setShowModal(true);
  };

  const handleEditNode = (node) => {
    setModalMode("edit");
    setCurrentNode(node);
    setFormData({
      fact: node.fact,
      operator: node.operator,
      value: node.value,
      valueref: node.valueref,
      type: node.type,
      action: node.action?.action || "",
      mode: "edit"
    });
    setShowModal(true);
  };

  const handleDeleteNode = (nodeToDelete) => {
    const deleteNode = (data) => {
      if (data.conditions) {
        data.conditions = data.conditions.filter(
          (cond) => cond !== nodeToDelete
        );
        data.conditions.forEach(deleteNode);
      }
    };

    const newData = { ...treeData };
    deleteNode(newData);
    setTreeData(newData);
  };

  const handleSubmit = (submittedData) => {
    const updatedCondition = {
      fact: submittedData.fact,
      operator: submittedData.operator,
      value: submittedData.value,
      valueref: submittedData.valueref,
      type: submittedData.type,
      action: {
        action: submittedData.action
      }
    };

    const updateTree = (data) => {
      if (modalMode === "add" && currentNode === data) {
        data.conditions = data.conditions
          ? [...data.conditions, updatedCondition]
          : [updatedCondition];
      } else if (modalMode === "edit" && currentNode === data) {
        Object.assign(data, updatedCondition);
      } else if (data.conditions) {
        data.conditions.forEach(updateTree);
      }
    };

    const newData = { ...treeData };
    if (modalMode === "add" && currentNode === null) {
      newData.conditions = newData.conditions
        ? [...newData.conditions, updatedCondition]
        : [updatedCondition];
    } else {
      updateTree(newData);
    }
    setTreeData(newData);
    setShowModal(false);
  };

  return (
    <div className="tree">
      {treeData.conditions.length === 0 && (
        <Button
          label="Create Node"
          onConfirm={() => handleAddNode(null)}
          classname="btn-success"
          type="button"
        />
      )}
      <Tree
        treeData={treeData}
        onAddNode={handleAddNode}
        onEditNode={handleEditNode}
        onDeleteNode={handleDeleteNode}
      />
      {showModal && (
        <ManageDecision
          inputData={formData}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          showModal={showModal}
        />
      )}
    </div>
  );
};

export default Decisions;
