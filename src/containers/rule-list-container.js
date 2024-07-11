import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "../components/table/custom-table";
import ToolBar from "../components/toolbar/toolbar";
import Breadcrumbs from "../components/breadcrumbs/breadcrumbs";
import CreateRule from "../components/rule/create-rule";
import { loadRules, resetRules } from "../redux/actions/rule";
import { useDispatch, useSelector } from "react-redux";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const RuleListContainer = () => {
  const { ruleId } = useParams();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [oldName, setOldName] = useState("");
  const [mode, setMode] = useState("add");
  const [formData, setFormData] = useState({
    name: ""
  });

  const { rules, error } = useSelector((state) => state.rules);

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

  const handleActionClick = (row) => {
    alert(`Action clicked for ${row.name}`);
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

  const handleSearch = (row) => {
    alert(`Action clicked for ${row.name}`);
  };

  const handleSubmit = () => {
    setShowModal(false);
  };

  const breadcrumbItems = [
    { name: "Home", link: "/" },
    { name: "Rule-Groups", link: `/rule-groups` }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(loadRules(ruleId));
      setLoading(false);
    };

    fetchData();
  }, [dispatch, rules.length]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="rules-container">
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
        <CustomTable
          columns={columns}
          data={rules}
          onActionClick={handleActionClick}
        />
      </div>
    </div>
  );
};

RuleListContainer.propTypes = {
  rules: PropTypes.array
};

export default RuleListContainer;
