import { combineReducers } from "redux";
import rulereducer from "./rulereducer";
import AppReducer from "./app-reducer";
import FactReducer from "./factReducer";
import RuleGroupReducer from "./rule-group-reducer";

export const rootReducer = combineReducers({
  app: AppReducer,
  ruleset: rulereducer,
  fact: FactReducer,
  ruleGroup: RuleGroupReducer
});
