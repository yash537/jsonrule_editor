import React, { useCallback, useEffect, useState } from "react";
import CustomTable from "../components/table/custom-table";
import ToolBar from "../components/toolbar/toolbar";
import Breadcrumbs from "../components/breadcrumbs/breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { isContains } from "../utils/stringutils";
import { handleKey } from "../redux/actions/key";
import CreateConstant from "../components/constants/create-constant";
import { handleFetchConstants } from "../redux/actions/constant";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ManageConstantsContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");

  const dispatch = useDispatch();

  const constants = useSelector((state) => state.constant.constants);

  const [formData, setFormData] = useState({});

  const handleEdit = (row) => {
    setFormData(row);
    setShowModal(true);
  };

  const handleDelete = (row) => {
    alert(`Delete action clicked for ${row.id}`);
  };

  useEffect(() => {
    if (constants.length === 0) {
      dispatch(handleFetchConstants());
    }
  }, []);

  const columns = [
    { header: "Id", accessor: "id", isLink: false },
    { header: "Name", accessor: "name", isLink: false },
    { header: "Type", accessor: "type", isLink: false },
    { header: "Value", accessor: "value", isLink: false },
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
      dispatch(handleKey("UPDATE", payload, payload.id));
    } else {
      dispatch(handleKey("ADD", payload));
    }
    setShowModal(false);
  };

  const filterKey = useCallback(() => {
    return constants.filter(
      (att) =>
        isContains(att.name, searchCriteria) ||
        isContains(att.type, searchCriteria) ||
        isContains(att.value, searchCriteria)
    );
  }, [constants, searchCriteria]);

  const filteredconstants = searchCriteria ? filterKey() : constants;

  return (
    <div className="rules-container">
      {showModal && (
        <CreateConstant
          inputData={formData}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          showModal={showModal}
        />
      )}
      <ToolBar
        handleAdd={handleAdd}
        reset={handleReset}
        searchTxt={handleSearch}
      />
      <div className="custom-table">
        <CustomTable
          columns={columns}
          data={filteredconstants}
          onActionClick={handleActionClick}
        />
      </div>
    </div>
  );
};

ManageConstantsContainer.propTypes = {};

export default ManageConstantsContainer;
