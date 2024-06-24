import React, { useContext, useEffect } from "react";
import Title from "../components/title/title";
import NavigationPanel from "../components/navigation/navigation-panel";
import ApperanceContext from "../context/apperance-context";
import { connect } from "react-redux";
import { updateRulesetIndex } from "../redux/actions/rule";
import { updateState } from "../redux/actions/app";
import PropTypes from "prop-types";
import AppRoutes from "../routes/app-routes";

const AppContainer = (props) => {
  const {
    navState,
    rulenames,
    loggedIn,
    activeIndex,
    updateState,
    setActiveRulesetIndex
  } = props;

  const theme = useContext(ApperanceContext);

  useEffect(() => {
    document.body.className = theme.background;
  }, [theme.background]);

  const closednav = navState !== "open";

  return (
    <>
      <ApperanceContext.Provider value={theme}>
        <Title
          title={"Json Rule Editor"}
          closedState={closednav}
          updateState={updateState}
        />
        <NavigationPanel
          closedState={closednav}
          updateState={updateState}
          activeIndex={activeIndex}
          rulenames={rulenames}
          setActiveRulesetIndex={setActiveRulesetIndex}
          loggedIn={loggedIn}
        />
        <AppRoutes
          closedState={closednav}
          loggedIn={loggedIn}
          appctx={ApperanceContext}
        />
      </ApperanceContext.Provider>
    </>
  );
};

AppContainer.propTypes = {
  rulenames: PropTypes.array,
  setActiveRulesetIndex: PropTypes.func,
  navState: PropTypes.string,
  loggedIn: PropTypes.bool,
  updateState: PropTypes.func,
  activeIndex: PropTypes.number
};

const mapStateToProps = (state) => ({
  navState: state.app.navState,
  rulenames: state.ruleset.rulesets.map((r) => r.name),
  loggedIn: state.app.loggedIn,
  activeIndex: state.ruleset.activeRuleset
});

const mapDispatchToProps = (dispatch) => ({
  setActiveRulesetIndex: (name) => dispatch(updateRulesetIndex(name)),
  updateState: (val) => dispatch(updateState(val))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
