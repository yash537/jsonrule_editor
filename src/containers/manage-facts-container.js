import React, { useCallback, useEffect, useMemo, useState } from "react";
import CustomTable from "../components/table/custom-table";
import ToolBar from "../components/toolbar/toolbar";
import Breadcrumbs from "../components/breadcrumbs/breadcrumbs";
import CreateFact from "../components/facts/create-fact";
import { handleFact, handleFetchFacts } from "../redux/actions/fact";
import { useDispatch, useSelector } from "react-redux";
import { isContains } from "../utils/stringutils";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ManageFactsContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");

  const dispatch = useDispatch();

  const attributes = useSelector((state) => state.fact.attributes);

  const [formData, setFormData] = useState({});

  const handleEdit = (row) => {
    setFormData(row);
    setShowModal(true);
  };

  const handleDelete = (row) => {
    alert(`Delete action clicked for ${row.id}`);
  };

  useEffect(() => {
    if (attributes.length === 0) {
      dispatch(handleFetchFacts());
    }
  }, []);

  const columns = [
    { header: "Id", accessor: "id", isLink: false },
    { header: "Fact Name", accessor: "name", isLink: false },
    { header: "Type", accessor: "type", isLink: false, className: "type" },
    { header: "Created At", accessor: "created_at", isLink: false },
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
    setShowModal(true);
    setFormData({});
  };

  const handleReset = (row) => {
    alert(`Action clicked for ${row.name}`);
  };

  const handleSearch = useCallback((value) => {
    setSearchCriteria(value);
  }, []);

  const handleSubmit = (payload) => {
    if (payload.id) {
      dispatch(handleFact("UPDATE", payload, payload.id));
    } else {
      dispatch(handleFact("ADD", payload));
    }
    setShowModal(false);
  };

  const filterAttribute = useCallback(() => {
    return attributes.filter(
      (att) =>
        isContains(att.name, searchCriteria) ||
        isContains(att.type, searchCriteria)
    );
  }, [attributes, searchCriteria]);

  // const breadcrumbItems = [{ name: "Home", link: "/" }];
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
      {/* <Breadcrumbs items={breadcrumbItems} /> */}
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
