import React from "react";
import Button from "./button/button";

const DeleteModal = ({ onCancel, showModal, onProceed }) => {
  return (
    <div id="myModal" className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <div className="title-bar">
          <span className="title">Delete Confirmation</span>
          <span className="close" onClick={onCancel}>
            &times;
          </span>
        </div>
        <div>
          <p>Are you sure you want to delete this item?</p>
          <div style={{ display: "flex" }}>
            <Button
              label="Proceed"
              classname="btn-success"
              type="submit"
              onConfirm={onProceed}
            />
            <Button
              label="Cancel"
              onConfirm={onCancel}
              classname="btn-danger"
              type="reset"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
