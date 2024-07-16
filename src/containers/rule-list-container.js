import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "../components/table/custom-table";
import ToolBar from "../components/toolbar/toolbar";
import Breadcrumbs from "../components/breadcrumbs/breadcrumbs";
import CreateRule from "../components/rule/create-rule";
import {
  createrule,
  deleteRule,
  loadRules,
  updaterule
} from "../redux/actions/rule";
import { useDispatch, useSelector } from "react-redux";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import { isContains } from "../utils/stringutils";
import DeleteModal from "../components/Delete";

const RuleListContainer = () => {
  const { ruleGroupId } = useParams();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [oldName, setOldName] = useState("");
  const [mode, setMode] = useState("add");
  const [formData, setFormData] = useState({
    name: ""
  });
  const [searchCriteria, setSearchCriteria] = useState("");
  const { rules, error } = useSelector((state) => state.rules);

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
    { header: "Rule Name", accessor: "name", isLink: true },
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

  const dispatch = useDispatch();

  const handleActionClick = () => {
    setLoading(true);
    setShowDeleteModal(false);
    dispatch(deleteRule(formData.name));
    setLoading(false);
  };

  const handleAdd = (row) => {
    setShowModal(true);
    setMode("add");
    setOldName("");
    setFormData({
      name: ""
    });
  };

  const handleReset = (row) => {
    alert(`Action clicked for ${row.name}`);
  };

  const handleSearch = (value) => {
    setSearchCriteria(value);
  };

  const filterAttribute = useCallback(() => {
    return rules.filter((att) => isContains(att.name, searchCriteria));
  }, [rules, searchCriteria]);

  const filteredRules = searchCriteria ? filterAttribute() : rules;

  const handleSubmit = (formData) => {
    setLoading(true);
    if (oldName) {
      dispatch(
        updaterule({
          name: oldName,
          updatedName: formData.name
        })
      );
    } else {
      dispatch(
        createrule({
          ruleGroup: ruleGroupId,
          name: formData.name
        })
      );
    }
    setShowModal(false);
    setLoading(false);
  };

  const breadcrumbItems = [
    { name: "Home", link: "/" },
    { name: "Rule-Groups", link: `/rule-groups` },
    { name: ruleGroupId, link: `/rule-groups/${ruleGroupId}` }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(loadRules(ruleGroupId));
      setLoading(false);
    };

    fetchData();
  }, [dispatch, rules.length]);

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
        <CreateRule
          inputData={formData}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          showModal={showModal}
          mode={mode}
        />
      )}
      <Breadcrumbs items={breadcrumbItems} />
      <ToolBar
        handleAdd={handleAdd}
        reset={handleReset}
        searchTxt={handleSearch}
      />
      <div className="custom-table">
        <CustomTable columns={columns} data={filteredRules} />
      </div>
    </div>
  );
};

RuleListContainer.propTypes = {
  rules: PropTypes.array
};

export default RuleListContainer;
