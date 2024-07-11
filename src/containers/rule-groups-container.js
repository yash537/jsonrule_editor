import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "../components/table/custom-table";
import ToolBar from "../components/toolbar/toolbar";
import CreateRuleGroup from "../components/rule-group/create-rule-group";
import { useDispatch, useSelector } from "react-redux";
import {
  createRuleGroup,
  loadRuleGroups,
  updateRuleGroup
} from "../redux/actions/rule-group";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const RuleGroupsContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oldName, setOldName] = useState("");
  const [mode, setMode] = useState("add");

  const [formData, setFormData] = useState({
    name: "",
    executionMethod: ""
  });

  const dispatch = useDispatch();
  const { ruleGroups, error } = useSelector((state) => state.ruleGroup);

  const handleEdit = (row) => {
    setFormData(row);
    setOldName(row.name);
    setShowModal(true);
    setMode("edit");
  };

  const handleDelete = (row) => {
    alert(`Delete action clicked for ${row.id}`);
  };

  const columns = [
    { header: "Id", accessor: "id", isLink: false },
    { header: "RuleGroup Name", accessor: "name", isLink: true },
    { header: "Execution Method", accessor: "executionMethod", isLink: false },
    { header: "Facts", accessor: "facts", isLink: false },
    { header: "Constants", accessor: "constants", isLink: false },
    {
      header: "Action",
      accessor: "action",
      isLink: false,
      actions: [
        {
          actionName: "Edit",
          handler: (row) => handleEdit(row),
          font: faEdit,
          iconClass: "icon edit-icon"
        },
        {
          actionName: "Delete",
          handler: (row) => handleDelete(row),
          font: faTrash,
          iconClass: "icon delete-icon"
        }
      ]
    }
  ];

  const handleActionClick = (row) => {
    alert(`Action clicked for ${row.name}`);
  };

  const handleAdd = (row) => {
    setMode("add");
    setShowModal(true);
    setFormData({
      name: "",
      executionMethod: ""
    });
  };

  const handleReset = (row) => {
    alert(`Action clicked for ${row.name}`);
  };

  const handleSearch = (row) => {
    alert(`Action clicked for ${row.name}`);
  };

  const handleSubmit = (formData) => {
    if (oldName) {
      dispatch(
        updateRuleGroup({
          name: oldName,
          updatedName: formData.name
        })
      );
    } else {
      dispatch(createRuleGroup(formData));
    }
    setShowModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(loadRuleGroups());
      setLoading(false);
    };

    if (ruleGroups.length === 0) {
      fetchData();
    }
  }, [dispatch, ruleGroups.length]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="rules-container">
      {showModal && (
        <CreateRuleGroup
          inputData={formData}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          showModal={showModal}
          mode={mode}
        />
      )}
      <ToolBar
        handleAdd={handleAdd}
        reset={handleReset}
        searchTxt={handleSearch}
      />
      <div className="custom-table">
        {loading ? (
          <div className="loading-spinner">Loading...</div> // Add your spinner component or HTML here
        ) : (
          <CustomTable
            columns={columns}
            data={ruleGroups}
            onActionClick={handleActionClick}
          />
        )}
      </div>
    </div>
  );
};

RuleGroupsContainer.propTypes = {
  rulesetNames: PropTypes.array
};

export default RuleGroupsContainer;
