import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "../components/table/custom-table";
import ToolBar from "../components/toolbar/toolbar";
import CreateRuleGroup from "../components/rule-group/create-rule-group";
import { useDispatch, useSelector } from "react-redux";
import {
  createRuleGroup,
  deleteRuleGroup,
  loadRuleGroups,
  updateRuleGroup
} from "../redux/actions/rule-group";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import DeleteModal from "../components/Delete";
import { isContains } from "../utils/stringutils";

const RuleGroupsContainer = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oldName, setOldName] = useState("");
  const [mode, setMode] = useState("add");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    executionMethod: ""
  });
  const { ruleGroups, error } = useSelector((state) => state.ruleGroup);

  const handleEdit = (row) => {
    setFormData(row);
    setOldName(row.name);
    setShowModal(true);
    setMode("edit");
  };

  const handleDelete = (row) => {
    setShowDeleteModal(true);
    setFormData(row);
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

  const handleActionClick = () => {
    setLoading(true);
    setShowDeleteModal(false);
    dispatch(deleteRuleGroup(formData.name));
    setLoading(false);
  };

  const handleAdd = (row) => {
    setMode("add");
    setShowModal(true);
    setFormData({
      name: "",
      executionMethod: ""
    });
  };

  const handleSearch = (value) => {
    setSearchCriteria(value);
  };

  const handleSubmit = (formData) => {
    setLoading(true);
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
    setLoading(false);
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

  const filterRuleGroup = useCallback(() => {
    return ruleGroups.filter((att) => isContains(att.name, searchCriteria));
  }, [ruleGroups, searchCriteria]);

  const filteredRuleGroups = searchCriteria ? filterRuleGroup() : ruleGroups;

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <div className="rules-container">
      {showDeleteModal && (
        <DeleteModal
          onCancel={() => setShowDeleteModal(false)}
          onProceed={handleActionClick}
          showModal={showDeleteModal}
        />
      )}
      {showModal && (
        <CreateRuleGroup
          inputData={formData}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          showModal={showModal}
          mode={mode}
        />
      )}
      <ToolBar handleAdd={handleAdd} searchTxt={handleSearch} />
      <div className="custom-table">
        {loading ? (
          <div className="loading-spinner">Loading...</div> // Add your spinner component or HTML here
        ) : (
          <CustomTable columns={columns} data={filteredRuleGroups} />
        )}
      </div>
    </div>
  );
};

RuleGroupsContainer.propTypes = {
  rulesetNames: PropTypes.array
};

export default RuleGroupsContainer;
