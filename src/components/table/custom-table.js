import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const CustomTable = ({ columns, data, className }) => {
  const formatCellValue = (value) => {
    if (Array.isArray(value)) {
      const formattedArray = value
        .map((item) =>
          typeof item === "object" ? item.name || JSON.stringify(item) : item
        )
        .join(", ");
      return formattedArray || "-";
    } else if (typeof value === "object" && value !== null) {
      const formattedObject = Object.keys(value)
        .map((key) => `${key}: ${value[key]}`)
        .join(", ");
      return formattedObject || "-";
    }
    return value || "-";
  };

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={row.id ? row.id : rowIndex + 1}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.accessor === "id" ? (
                    <span>{row.id ? row.id : rowIndex + 1}</span>
                  ) : col.isLink ? (
                    <Link to={`${row[col.accessor]}`}>
                      {formatCellValue(row[col.accessor])}
                    </Link>
                  ) : col.actions ? (
                    <div className="action-wrapper">
                      {col.actions.map((action, actionIndex) => (
                        <FontAwesomeIcon
                          onClick={() => action.handler(row)}
                          key={actionIndex}
                          icon={action.font}
                          className={action.iconClass}
                        />
                      ))}
                    </div>
                  ) : (
                    <span className={className}>
                      {formatCellValue(row[col.accessor])}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr style={{ textAlign: "center" }}>
            <td colSpan={columns.length}>No Data Found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CustomTable;
