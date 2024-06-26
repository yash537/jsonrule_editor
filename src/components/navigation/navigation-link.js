import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavLinks = (props) => {
  const { links } = props;
  const [visible, setVisible] = useState({ 0: true });
  const history = useNavigate();

  const enableSublinks = (e, index, navigate) => {
    e.preventDefault();
    setVisible((prevVisible) => ({ [index]: !prevVisible[index] }));
    if (navigate) {
      history(navigate);
    }
  };

  return links.map((link, index) => (
    <ul className="link-container" key={link.name + props.activeIndex}>
      <NavParentLink
        link={link}
        onConfirm={enableSublinks}
        index={index}
        visible={visible[index]}
      />
      {link.sublinks && link.sublinks.length > 0 && (
        <NavSubLink
          sublinks={link.sublinks}
          visible={visible[index]}
          onConfirm={props.onConfirm}
          activeIndex={props.activeIndex}
        />
      )}
    </ul>
  ));
};

const NavParentLink = ({ link, onConfirm, index, visible }) => {
  return (
    <li
      className={link.linkClass}
      onClick={(e) => onConfirm(e, index, link.navigate)}
    >
      <a href="/" className={`link ${visible ? "active" : ""}`}>
        <span className={link.iconClass} />
        {link.fontIcons && <FontAwesomeIcon icon={link.fontIcons} />}
        <span className="text">{link.name}</span>
      </a>
    </li>
  );
};

NavParentLink.propTypes = {
  link: PropTypes.object,
  onConfirm: PropTypes.func,
  index: PropTypes.number,
  visible: PropTypes.bool
};

const NavSubLink = ({ sublinks, visible, onConfirm, activeIndex }) => {
  const [active, setActive] = useState(sublinks[activeIndex]);

  const handleClick = (e, link) => {
    e.preventDefault();
    setActive(link);
    onConfirm(link);
  };

  return sublinks.map((link) => (
    <ul className={`sublink-container ${visible ? "visible" : ""}`} key={link}>
      <li
        className={`sublink ${visible ? "visible" : ""} ${
          active === link ? "active" : ""
        }`}
        onClick={(e) => handleClick(e, link)}
      >
        <a href="/" className="link">
          <span className="text">{link}</span>
        </a>
      </li>
    </ul>
  ));
};

NavSubLink.propTypes = {
  sublinks: PropTypes.array,
  visible: PropTypes.bool,
  onConfirm: PropTypes.func,
  activeIndex: PropTypes.number
};

export default NavLinks;
