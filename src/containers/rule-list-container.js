import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomTable from "../components/table/custom-table";
import ToolBar from "../components/toolbar/toolbar";
import Breadcrumbs from "../components/breadcrumbs/breadcrumbs";
import CreateRule from "../components/rule/create-rule";

const RuleListContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: ""
  });

  const columns = [
    { header: "Id", accessor: "id", isLink: false },
    { header: "Rule Title", accessor: "name", isLink: true },
    { header: "Status", accessor: "status", isLink: false },
    { header: "Created At", accessor: "created_at", isLink: false }
  ];

  const data = [
    {
      id: 1,
      name: "Rulesd1",
      status: 1,
      created_at: "1st July,2024",
      link: "/rule-details/1"
    },
    {
      id: 2,
      name: "Rule2sd",
      status: 0,
      created_at: "1st July,2024",
      link: "/rule-details/2"
    },
    {
      id: 3,
      name: "Rule3sd",
      status: 1,
      created_at: "1st July,2024",
      link: "/rule-details/3"
    }
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

  const handleSubmit = () => {
    console.log("submit clicked");
    setShowModal(false);
  };

  const breadcrumbItems = [
    { name: "Home", link: "/" },
    { name: "Rule-Groups", link: "/rule-groups" }
  ];

  return (
    <div className="rules-container">
      {showModal && (
        <CreateRule
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
          data={data}
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
