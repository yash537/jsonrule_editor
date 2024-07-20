import React, { useState } from "react";
import PropTypes from "prop-types";
import { PanelBox } from "../panel/panel";
import Button from "../button/button";
import AddConstants from "./add-constants";
import DeleteModal from "../Delete";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleRemoveConstantFromRule } from "../../redux/actions/constant";

const ConstantDetails = ({ constants }) => {
  const { ruleId } = useParams();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();

  const handleDelete = (row) => {
    setShowDeleteModal(true);
    setFormData(row);
  };

  const handleActionClick = () => {
    setShowDeleteModal(false);
    dispatch(handleRemoveConstantFromRule(ruleId, formData.name));
  };

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

ConstantDetails.propTypes = {
  constants: PropTypes.array,
  updateAttribute: PropTypes.func,
  removeAttribute: PropTypes.func
};

export default ConstantDetails;
