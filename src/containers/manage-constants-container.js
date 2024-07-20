import React, { useCallback, useEffect, useState } from "react";
import CustomTable from "../components/table/custom-table";
import ToolBar from "../components/toolbar/toolbar";
import { useDispatch, useSelector } from "react-redux";
import { isContains } from "../utils/stringutils";
import CreateConstant from "../components/constants/create-constant";
import {
  handleConstant,
  handleFetchConstants
} from "../redux/actions/constant";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import DeleteModal from "../components/Delete";

const ManageConstantsContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("add");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useDispatch();

  const { constants, error } = useSelector((state) => state.constant);

  const [formData, setFormData] = useState({
    name: "",
    value: "",
    dataType: ""
  });

  const handleEdit = (row) => {
    setMode("edit");
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
      await dispatch(handleFetchConstants());
      setLoading(false);
    };

    fetchData();
  }, [dispatch, constants.length]);

  const columns = [
    { header: "Id", accessor: "id", isLink: false },
    { header: "Name", accessor: "name", isLink: false },
    { header: "Type", accessor: "dataType", isLink: false },
    { header: "Value", accessor: "value", isLink: false },
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

  const handleActionClick = (row) => {
    setLoading(true);
    setShowDeleteModal(false);
    dispatch(handleConstant("DELETE", formData.name));
    setLoading(false);
  };

  const handleAdd = (row) => {
    setMode("add");
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
      dispatch(handleConstant("UPDATE", payload, payload.id));
    } else {
      dispatch(handleConstant("ADD", payload));
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
        <CreateConstant
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
