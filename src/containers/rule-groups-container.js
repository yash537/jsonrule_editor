import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "../components/table/custom-table";
import ToolBar from "../components/toolbar/toolbar";
import Breadcrumbs from "../components/breadcrumbs/breadcrumbs";
import CreateRuleGroup from "../components/rule-group/create-rule-group";
import { useDispatch, useSelector } from "react-redux";
import { createRuleGroup, loadRuleGroups } from "../redux/actions/rule-group";

const RuleGroupsContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: ""
  });
  const dispatch = useDispatch();
  const { ruleGroups, error } = useSelector((state) => state.ruleGroup);

  const columns = [
    { header: "Id", accessor: "id", isLink: false },
    { header: "RuleGroup Name", accessor: "name", isLink: true },
    { header: "Status", accessor: "status", isLink: false },
    { header: "Created At", accessor: "created_at", isLink: false }
  ];

  const handleActionClick = (row) => {
    alert(`Action clicked for ${row.name}`);
  };

  const handleAdd = (row) => {
    setShowModal(true);
  };

  const handleReset = (row) => {
    alert(`Action clicked for ${row.name}`);
  };

  const handleSearch = (row) => {
    alert(`Action clicked for ${row.name}`);
  };

  const handleSubmit = (formData) => {
    console.log("submit clicked");
    setShowModal(false);
    console.log(formData);
    dispatch(createRuleGroup(formData.title));
  };

  useEffect(() => {
    if (ruleGroups.length === 0) {
      dispatch(loadRuleGroups());
    }
  }, []);

  const breadcrumbItems = [{ name: "Home", link: "/" }];

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
          data={ruleGroups}
          onActionClick={handleActionClick}
        />
      </div>
    </div>
  );
};

RuleGroupsContainer.propTypes = {
  rulesetNames: PropTypes.array
};

export default RuleGroupsContainer;
