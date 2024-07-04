import React from "react";

const CustomTable = ({ columns, data, onActionClick, className }) => {
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
                    <a href={row["link"]}>{row[col.accessor]}</a>
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
