import React, { useCallback, useEffect, useState } from "react";
import CustomTable from "../components/table/custom-table";
import ToolBar from "../components/toolbar/toolbar";
import Breadcrumbs from "../components/breadcrumbs/breadcrumbs";
import { useDispatch, useSelector } from "react-redux";
import { isContains } from "../utils/stringutils";
import { handleKey, handlefetchKeys } from "../redux/actions/key";
import CreateKey from "../components/keys/create-key";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import DeleteModal from "../components/Delete";

const ManageKeysContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useDispatch();

  const keys = useSelector((state) => state.key.keys);

  const [formData, setFormData] = useState({});

  const handleEdit = (row) => {
    setFormData(row);
    setShowModal(true);
  };

  const handleDelete = (row) => {
    setShowDeleteModal(true);
    setFormData(row);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(handlefetchKeys());
      setLoading(false);
    };

    fetchData();
  }, [dispatch, keys.length]);

  const columns = [
    { header: "Id", accessor: "id", isLink: false },
    { header: "Key Name", accessor: "name", isLink: false },
    { header: "DataType", accessor: "dataType", isLink: false },
    { header: "Description", accessor: "description", isLink: false },
    {
      header: "Action",
      accessor: "action",
      isLink: false,
      actions: [
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
    dispatch(handleKey("DELETE", formData.name));
    setLoading(false);
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
    setLoading(true);
    if (payload.id) {
      dispatch(handleKey("UPDATE", payload, payload.id));
    } else {
      dispatch(handleKey("ADD", payload));
    }
    setShowModal(false);
    setLoading(false);
  };

  const filterKey = useCallback(() => {
    return keys.filter((att) => isContains(att.name, searchCriteria));
  }, [keys, searchCriteria]);

  const filteredkeys = searchCriteria ? filterKey() : keys;

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
        <CreateKey
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
          data={filteredkeys}
          onActionClick={handleActionClick}
        />
      </div>
    </div>
  );
};

ManageKeysContainer.propTypes = {};

export default ManageKeysContainer;
