// src/components/Breadcrumbs.js
import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ items }) => {
  return (
    <div className="breadcrumb-container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          {items.map((item, index) => (
            <li
              key={index}
              className={`breadcrumb-item ${
                index === items.length - 1 ? "active" : ""
              }`}
            >
              <Link to={item.link}>{item.name}</Link>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumbs;
