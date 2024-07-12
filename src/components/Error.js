import React from "react";
import Button from "./button/button";
import { useNavigate } from "react-router-dom";

export default function Error({ error, handleBack }) {
  const navigate = useNavigate();
  return (
    <div className="error-container">
      <span className="custom-error">Error: {error}</span>
      <Button
        onConfirm={() => navigate(-1)}
        type="button"
        classname={"btn btn-danger"}
        label="Go Back"
      />
    </div>
  );
}
