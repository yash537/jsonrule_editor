import React from "react";
import PropTypes from "prop-types";

const Table = ({ columns, children }) => {
  return (
    <table className="table">
      <tbody>
        <tr>
          {columns.map((value) => (
            <th key={value}>{value}</th>
          ))}
        </tr>
        {children}
      </tbody>
    </table>
  );
};

Table.defaultProps = {
  columns: [],
  children: undefined,
};

Table.propTypes = {
  columns: PropTypes.array,
  children: PropTypes.any,
};

export default Table;
