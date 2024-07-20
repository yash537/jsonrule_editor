import React from "react";
import Node from "./decision-tree-node";

const Tree = ({ treeData, onAddNode, onEditNode, onDeleteNode }) => {
  const renderNodes = (conditions) => {
    return conditions?.map((condition, index) => (
      <Node
        key={index}
        condition={condition}
        onAddNode={onAddNode}
        onEditNode={onEditNode}
        onDeleteNode={onDeleteNode}
      />
    ));
  };

  return (
    <div id="tree">
      {treeData && treeData.conditions && renderNodes(treeData.conditions)}
    </div>
  );
};

export default Tree;
