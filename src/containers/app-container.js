import React, { useContext, useEffect, useState } from "react";
import Title from "../components/title/title";
import NavigationPanel from "../components/navigation/navigation-panel";
import ApperanceContext from "../context/apperance-context";
import { connect } from "react-redux";
import { updateRulesetIndex } from "../redux/actions/rule";
import { updateState } from "../redux/actions/app";
import PropTypes from "prop-types";

const AppContainer = (props) => {
  const {
    navState,
    rulenames,
    loggedIn,
    activeIndex,
    updateState,
    setActiveRulesetIndex,
  } = props;
  const [theme, setTheme] = useState(ApperanceContext);

  const toggleBackground = (value) => {
    const updatedTheme = { ...theme, background: value };
    document.body.className = value;
    setTheme(updatedTheme);
  };

  useEffect(() => {
    document.body.className = theme.background;
  }, [theme.background]);

  const closednav = navState !== "open";

  return (
    <>
      <ApperanceContext.Provider value={theme}>
        <Title title={"Json Rule Editor"} />
        <NavigationPanel
          closedState={closednav}
          updateState={updateState}
          activeIndex={activeIndex}
          rulenames={rulenames}
          setActiveRulesetIndex={setActiveRulesetIndex}
          loggedIn={loggedIn}
        />
        {/* <AppRoutes
          closedState={closednav}
          loggedIn={this.props.loggedIn}
          appctx={this.state.theme}
        /> */}
      </ApperanceContext.Provider>
    </>
  );
};

AppContainer.defaultProps = {
  rulenames: [],
  setActiveRulesetIndex: () => false,
  navState: undefined,
  activeIndex: 0,
  loggedIn: false,
  updateState: () => false,
};

AppContainer.propTypes = {
  rulenames: PropTypes.array,
  setActiveRulesetIndex: PropTypes.func,
  navState: PropTypes.string,
  loggedIn: PropTypes.bool,
  updateState: PropTypes.func,
  activeIndex: PropTypes.number,
};

const mapStateToProps = (state) => ({
  navState: state.app.navState,
  rulenames: state.ruleset.rulesets.map((r) => r.name),
  loggedIn: state.app.loggedIn,
  activeIndex: state.ruleset.activeRuleset,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveRulesetIndex: (name) => dispatch(updateRulesetIndex(name)),
  updateState: (val) => dispatch(updateState(val)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);

// export default AppContainer;
