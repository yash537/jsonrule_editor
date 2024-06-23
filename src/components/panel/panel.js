import React, { useContext } from "react";
import PropTypes from "prop-types";
import { TitleIcon } from "../title/page-title";
import ApperanceContext from "../../context/apperance-context";

const Panel = ({ title, children }) => {
  return (
    <div className="panel-wrapper">
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
};

Panel.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any
};

export const PanelBox = ({ className, children }) => {
  return (
    <div className={`panel-box-wrapper ${className}-type`}>{children}</div>
  );
};

PanelBox.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export const TitlePanel = ({ children = {}, titleClass = {}, title = "" }) => {
  let appTheme = useContext(ApperanceContext);
  return (
    <div className={`title-panel ${appTheme.background}`}>
      <div className="title">
        {titleClass && (
          <div>
            {titleClass && <TitleIcon iconClass={titleClass} name={title} />}
          </div>
        )}
        <h3>{title}</h3>
      </div>
      {children}
    </div>
  );
};

TitlePanel.propTypes = {
  children: PropTypes.any,
  titleClass: PropTypes.object,
  title: PropTypes.string
};

export default Panel;
