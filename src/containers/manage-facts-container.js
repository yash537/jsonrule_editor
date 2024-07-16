import React, { useCallback, useEffect, useState } from "react";
import CustomTable from "../components/table/custom-table";
import ToolBar from "../components/toolbar/toolbar";
import CreateFact from "../components/facts/create-fact";
import {
  deleteFact,
  handleFact,
  handleFetchFacts
} from "../redux/actions/fact";
import { useDispatch, useSelector } from "react-redux";
import { isContains } from "../utils/stringutils";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import DeleteModal from "../components/Delete";

const ManageFactsContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("add");
  const [searchCriteria, setSearchCriteria] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dispatch = useDispatch();

  const { attributes, error } = useSelector((state) => state.fact);

  const [formData, setFormData] = useState({});

  const handleDelete = (row) => {
    setShowDeleteModal(true);
    setFormData(row);
  };

  const handleEdit = (row) => {
    setFormData(row);
    setMode("edit");
    setShowModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await dispatch(handleFetchFacts());
      setLoading(false);
    };

    fetchData();
  }, [dispatch, attributes.length]);

  const columns = [
    { header: "Id", accessor: "id", isLink: false },
    { header: "Fact Name", accessor: "name", isLink: false },
    { header: "Type", accessor: "dataType", isLink: false, className: "type" },
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
    dispatch(handleFact("DELETE", formData.name));
    setLoading(false);
  };

  const handleAdd = (row) => {
    setShowModal(true);
    setFormData({});
    setMode("add");
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
      dispatch(handleFact("UPDATE", payload, payload.id));
    } else {
      dispatch(handleFact("ADD", payload));
    }
    setShowModal(false);
    setLoading(false);
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
        <CreateFact
          inputData={formData}
          onSubmit={handleSubmit}
          onClose={() => setShowModal(false)}
          showModal={showModal}
          mode={mode}
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
