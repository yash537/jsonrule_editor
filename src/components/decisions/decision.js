import React, { useEffect, useState } from "react";
import Tree from "./decision-tree";
import ManageDecision from "./manage-decision";
import Button from "../button/button";
import DeleteModal from "../Delete";
import { useParams } from "react-router-dom";
import { handleSaveDecisionTree } from "../../redux/actions/rule";
import { useDispatch } from "react-redux";
import Banner from "../panel/banner";
import * as Message from "../../constants/messages";
import { handleKey } from "../../redux/actions/key";

const Decisions = ({ tree }) => {
  const { ruleId, ruleGroupId } = useParams();
  const [treeData, setTreeData] = useState(tree);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMode, setModalMode] = useState("add");
  const [currentNode, setCurrentNode] = useState(null);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fact: "",
    operator: "",
    constant: "",
    action: {
      action: "",
      act: {}
    },
    mode: "add"
  });

  const handleAddNode = (parentNode) => {
    setModalMode("add");
    setCurrentNode(parentNode);
    setFormData({
      fact: "",
      operator: "",
      constant: "",
      action: {
        action: "",
        act: {}
      },
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
      constant: node.constant,
      action: {
        action: node.action.action,
        act: node.action.act
      },
      mode: "edit"
    });
    setShowModal(true);
  };

  const handleDeleteNode = (nodeToDelete) => {
    const deleteNode = (data) => {
      if (data.conditions) {
        const filteredConditions = data.conditions.filter(
          (cond) => cond !== nodeToDelete
        );

        const updatedConditions = filteredConditions.map((cond) => {
          return { ...cond, ...deleteNode(cond) };
        });

        return { ...data, conditions: updatedConditions };
      }
      return data;
    };

    const newData = deleteNode({ ...treeData });
    setTreeData(newData);
    handleSaveTree(newData);
  };

  const handleSubmit = (submittedData) => {
    console.log(submittedData);
    console.log("olde tree data", tree);
    const updatedCondition = {
      fact: submittedData.fact,
      operator: submittedData.operator,
      constant: submittedData.constant,
      action: {
        action:
          submittedData.mode == "add"
            ? submittedData.action
            : submittedData.action.action,
        act: submittedData.mode == "add" ? null : submittedData.action.act
      }
    };

    console.log("first");
    if (submittedData.action === "execute") {
      console.log("execute");
      updatedCondition.action.act = {
        [submittedData.key]: ""
      };
    } else if (submittedData.action === "evaluate") {
      console.log("evaluate");
      updatedCondition.action.act = {};
      submittedData.keyValues.forEach(({ key, value }) => {
        updatedCondition.action.act[key] = value;
      });
    }
    console.log("updated tree befoerw");

    const updateTree = (data) => {
      if (modalMode === "add" && currentNode === data) {
        console.log("1");
        data.conditions = data.conditions
          ? data.conditions.concat(updatedCondition)
          : [updatedCondition];
      } else if (modalMode === "edit" && currentNode === data) {
        console.log("2");
        Object.assign(data, updatedCondition);
      } else if (data.conditions) {
        console.log("3");
        data.conditions.forEach(updateTree);
      }
    };

    console.log("seret tree data");
    const newData = { ...treeData };
    if (modalMode === "add" && currentNode === null) {
      console.log("addd tree");
      newData.conditions = newData.conditions
        ? [...newData.conditions, updatedCondition]
        : [updatedCondition];
    } else {
      console.log("update tree");
      updateTree(newData);
    }

    setTreeData(newData);
    console.log("set treed ata");
    setShowModal(false);
    console.log("showe modal ");
  };

  console.log("tree data", treeData);
  const handleActionClick = () => {
    setLoading(true);
    setShowDeleteModal(false);
    dispatch(handleKey("DELETE", formData.name));
    setLoading(false);
  };

  const handleSaveTree = (newData = treeData) => {
    // console.log(treeData);
    // const newTreeData = JSON.parse(JSON.stringify(newData));
    dispatch(handleSaveDecisionTree(ruleGroupId, ruleId, newData));
  };

  return (
    <div className="tree">
      {showDeleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          onCancel={() => setShowDeleteModal(false)}
          onProceed={handleActionClick}
        />
      )}
      <div className="tree-btn-wrapper">
        {treeData.conditions?.length === 0 && (
          <Button
            label="Create Node"
            onConfirm={() => handleAddNode(null)}
            classname="btn-success"
            type="button"
          />
        )}
        {treeData.conditions?.length > 0 && (
          <Button
            label="Save Tree"
            onConfirm={() => handleSaveTree()}
            classname="btn-success"
            type="button"
          />
        )}
      </div>
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
      {treeData.conditions?.length < 1 && (
        <Banner
          message={Message.NO_DECISION_TREE_MSG}
          onConfirm={() => handleAddNode(null)}
        />
      )}
    </div>
  );
};

export default Decisions;
