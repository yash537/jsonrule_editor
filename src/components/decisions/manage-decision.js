import React from "react";

const ManageDecision = ({ formData, onChange, onSubmit, onClose }) => {
  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form id="addNodeForm" onSubmit={onSubmit}>
          <label htmlFor="field">Field:</label>
          <input
            type="text"
            id="field"
            name="field"
            value={formData.field}
            onChange={onChange}
            className="input-field"
            required
          />
          <br />
          <label htmlFor="operator">Operator:</label>
          <input
            type="text"
            id="operator"
            name="operator"
            value={formData.operator}
            onChange={onChange}
            className="input-field"
            required
          />
          <br />
          <label htmlFor="value">Value:</label>
          <input
            type="text"
            id="value"
            name="value"
            value={formData.value}
            onChange={onChange}
            className="input-field"
            required
          />
          <br />
          <label htmlFor="valueref">Value Reference:</label>
          <input
            type="text"
            id="valueref"
            name="valueref"
            value={formData.valueref}
            onChange={onChange}
            className="input-field"
            required
          />
          <br />
          <label htmlFor="type">Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={onChange}
            className="input-field"
            required
          />
          <br />
          <label htmlFor="action">Action:</label>
          <input
            type="text"
            id="action"
            name="action"
            value={formData.action}
            onChange={onChange}
            className="input-field"
            required
          />
          <br />
          <button type="submit" className="form-button">
            {formData.mode === "edit" ? "Edit" : "Add"} Condition
          </button>
        </form>
      </div>
    </div>
  );
};

export default ManageDecision;
