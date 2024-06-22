import React, { useState } from "react";
import Tree from "./decision-tree";
import ManageDecision from "./manage-decision";

const initialData = {
  name: "mplemployeeEligibility",
  conditions: []
};

const Decisions = () => {
  const [treeData, setTreeData] = useState(initialData);
  const [showModal, setShowModal] = useState(true);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [currentNode, setCurrentNode] = useState(null);
  const [formData, setFormData] = useState({
    field: "",
    operator: "",
    value: "",
    valueref: "",
    type: "",
    action: ""
  });

  const handleAddNode = (parentNode) => {
    setModalMode("add");
    setCurrentNode(parentNode);
    setFormData({
      field: "",
      operator: "",
      value: "",
      valueref: "",
      type: "",
      action: ""
    });
    setShowModal(true);
  };

  const handleEditNode = (node) => {
    setModalMode("edit");
    setCurrentNode(node);
    setFormData({
      field: node.field,
      operator: node.operator,
      value: node.value,
      valueref: node.valueref,
      type: node.type,
      action: node.action?.action || ""
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

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedCondition = {
      field: formData.field,
      operator: formData.operator,
      value: formData.value,
      valueref: formData.valueref,
      type: formData.type,
      action: {
        action: formData.action
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
      // If adding the first node to the root
      newData.conditions = newData.conditions
        ? [...newData.conditions, updatedCondition]
        : [updatedCondition];
    } else {
      updateTree(newData);
    }
    setTreeData(newData);
    setShowModal(false);
  };

  const generateJson = () => {
    alert(JSON.stringify(treeData, null, 2));
    console.log(JSON.stringify(treeData, null, 2));
  };

  return (
    <div className="tree">
      <Tree
        treeData={treeData}
        onAddNode={handleAddNode}
        onEditNode={handleEditNode}
        onDeleteNode={handleDeleteNode}
      />
      {showModal && (
        <ManageDecision
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Decisions;
