import React, { useContext } from "react";
import ApperanceContext from "../../context/apperance-context";

const Appearance = ({ onClose, showModal }) => {
  const themes = [
    { name: "Light", value: "light", class: "light-mode" },
    { name: "Dark", value: "dark", class: "dark-mode" },
    { name: "Mid-Blue", value: "md-blue", class: "mdblue-mode" }
  ];

  const { toggleBackground, background } = useContext(ApperanceContext);

  return (
    <div id="myModal" className={`modal ${showModal ? "show" : ""}`}>
      <div className="modal-content">
        <div className="title-bar">
          <span className="title">Change Theme</span>
          <span className="close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="theme-container">
          {themes.map((theme) => (
            <div className="theme-icon" key={theme.value}>
              <input
                type="radio"
                id={theme.value}
                name="themeMode"
                value={theme.value}
                checked={background === theme.value}
                onChange={(e) => toggleBackground(e.target.value)}
              />
              <label htmlFor={theme.value}>
                <span className={theme.class}></span>
                <div>{theme.name}</div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Appearance;
