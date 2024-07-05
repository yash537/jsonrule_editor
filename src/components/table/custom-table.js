import React from "react";
import { Link } from "react-router-dom";

const CustomTable = ({ columns, data, className }) => {
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
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.isLink ? (
                    <Link to={row["link"]}>{row[col.accessor]}</Link>
                  ) : col.actions ? (
                    <div className="action-wrapper">
                      {col.actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          className={action.className}
                          onClick={() => action.handler(row)}
                        >
                          {action.actionName}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <span className={className}>{row[col.accessor]}</span>
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
