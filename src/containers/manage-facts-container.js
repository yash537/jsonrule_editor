import React, { useCallback, useMemo, useState } from "react";
import CustomTable from "../components/table/custom-table";
import ToolBar from "../components/toolbar/toolbar";
import Breadcrumbs from "../components/breadcrumbs/breadcrumbs";
import CreateFact from "../components/facts/create-fact";
import { handleFact } from "../redux/actions/fact";
import { useDispatch, useSelector } from "react-redux";
import { isContains } from "../utils/stringutils";

const ManageFactsContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");

  const dispatch = useDispatch();

  const attributes = useSelector((state) => state.fact.attributes);

  const [formData, setFormData] = useState({
    name: "",
    type: "",
    id: "1",
    created_at: "1st July, 2024"
  });

  const columns = [
    { header: "Id", accessor: "id", isLink: false },
    { header: "Fact Name", accessor: "name", isLink: false },
    { header: "Type", accessor: "type", isLink: false, className: "type" },
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

  const handleSearch = useCallback((value) => {
    setSearchCriteria(value);
  }, []);

  const handleSubmit = (payload) => {
    dispatch(handleFact("ADD", payload));
    setShowModal(false);
  };

  const filterAttribute = useCallback(() => {
    return attributes.filter(
      (att) =>
        isContains(att.name, searchCriteria) ||
        isContains(att.type, searchCriteria)
    );
  }, [attributes, searchCriteria]);

  const breadcrumbItems = [{ name: "Home", link: "/" }];
  const filteredAttributes = searchCriteria ? filterAttribute() : attributes;

  return (
    <div className="rules-container">
      {showModal && (
        <CreateFact
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
          data={filteredAttributes}
          onActionClick={handleActionClick}
        />
      </div>
    </div>
  );
};

ManageFactsContainer.propTypes = {};

export default ManageFactsContainer;
