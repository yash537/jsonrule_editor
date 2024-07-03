import React, { useCallback, useEffect, useState } from "react";
import Title from "../components/title/title";
import NavigationPanel from "../components/navigation/navigation-panel";
import ApperanceContext from "../context/apperance-context";
import { connect } from "react-redux";
import { updateRulesetIndex } from "../redux/actions/rule";
import { updateState } from "../redux/actions/app";
import PropTypes from "prop-types";
import AppRoutes from "../routes/app-routes";
import { useNavigate } from "react-router-dom";

const AppContainer = (props) => {
  const history = useNavigate();

  const toggleBackground = useCallback((value) => {
    setTheme((prevTheme) => ({ ...prevTheme, background: value }));
    document.body.className = value;
  }, []);

  const [theme, setTheme] = useState({ background: "light", toggleBackground });

  useEffect(() => {
    document.body.className = theme.background;
  }, [props.loggedIn, history, theme.background]);

  const closednav = props.navState !== "open";

  return (
    <React.Fragment>
      <ApperanceContext.Provider value={theme}>
        <Title title={"Json Rule Editor"} />
        <NavigationPanel
          closedState={closednav}
          updateState={props.updateState}
          activeIndex={props.activeIndex}
          rulenames={props.rulenames}
          setActiveRulesetIndex={props.setActiveRulesetIndex}
          loggedIn={props.loggedIn}
        />
        <AppRoutes
          closedState={closednav}
          loggedIn={props.loggedIn}
          appctx={theme}
        />
      </ApperanceContext.Provider>
    </React.Fragment>
  );
};

AppContainer.defaultProps = {
  rulenames: [],
  setActiveRulesetIndex: () => false,
  navState: undefined,
  activeIndex: 0,
  loggedIn: false,
  updateState: () => false
};

AppContainer.propTypes = {
  rulenames: PropTypes.array,
  setActiveRulesetIndex: PropTypes.func,
  navState: PropTypes.string,
  loggedIn: PropTypes.bool,
  updateState: PropTypes.func,
  activeIndex: PropTypes.number
};

const mapStateToProps = (state, ownProps) => ({
  navState: state.app.navState,
  rulenames: state.ruleset.rulesets.map((r) => r.name),
  loggedIn: state.app.loggedIn,
  activeIndex: state.ruleset.activeRuleset,
  ownProps
});

const mapDispatchToProps = (dispatch) => ({
  handleClick: () => {
    return false;
  },
  setActiveRulesetIndex: (name) => dispatch(updateRulesetIndex(name)),
  updateState: (val) => dispatch(updateState(val))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
