import React, { useContext } from "react";
import { connect } from "react-redux";
import ApperanceContext from "../context/apperance-context";

const themes = [
  { name: "Light", value: "light", class: "light-mode" },
  { name: "Dark", value: "dark", class: "dark-mode" },
  { name: "Midnight Blue", value: "md-blue", class: "mdblue-mode" }
];

const AppearanceContainer = () => {
  const { toggleBackground, background } = useContext(ApperanceContext);

  return (
    <div>
      <h3>Theme</h3>
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
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppearanceContainer);
