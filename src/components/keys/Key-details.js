import React, { useState } from "react";
import PropTypes from "prop-types";
import { PanelBox } from "../panel/panel";
import Button from "../button/button";
import DeleteModal from "../Delete";
import { useParams } from "react-router-dom";
import { handleRemoveKeyFromRule } from "../../redux/actions/key";
import { useDispatch } from "react-redux";
import Spinner from "../Spinner";

const KeyDetails = ({ constants, removeAttribute }) => {
  const { ruleId } = useParams();
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

  const handleDelete = (row) => {
    setShowDeleteModal(true);
    setFormData(row);
  };

  const handleActionClick = () => {
    setLoading(true);
    setShowDeleteModal(false);
    dispatch(handleRemoveKeyFromRule(ruleId, formData.name));
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <React.Fragment>
      {showDeleteModal && (
        <DeleteModal
          onCancel={() => setShowDeleteModal(false)}
          onProceed={handleActionClick}
          showModal={showDeleteModal}
        />
      )}
      {constants.map((attr, index) => (
        <div key={attr.name}>
          <PanelBox className={attr.type}>
            <div className="index">{index + 1}</div>
            <div className="name">{attr.name}</div>
            <div className="type">
              <span className={attr.dataType}>{attr.dataType}</span>
            </div>
            <div className="description">
              <span className={attr.description}>
                {attr.description ?? "-"}
              </span>
            </div>
            <div className="menu">
              <Button
                label={"Delete"}
                onConfirm={() => handleDelete(attr)}
                classname="btn-danger"
                type="submit"
              />
            </div>
          </PanelBox>
        </div>
      ))}
    </React.Fragment>
  );
};

KeyDetails.propTypes = {
  constants: PropTypes.array,
  updateAttribute: PropTypes.func,
  removeAttribute: PropTypes.func
};

export default KeyDetails;
