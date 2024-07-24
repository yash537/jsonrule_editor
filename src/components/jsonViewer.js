import React from "react";

const JSONViewer = ({ json }) => {
  const prettyPrintJson = (json) => {
    const replacer = null;
    const space = 2;
    return JSON.stringify(json, replacer, space);
  };

  const formattedJson = prettyPrintJson(json);

  return (
    <div className="json-viewer">
      <pre>{formattedJson}</pre>
    </div>
  );
};

export default JSONViewer;
