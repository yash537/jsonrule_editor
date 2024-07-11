import { combineReducers } from "redux";
import rulereducer from "./rulereducer";
import AppReducer from "./app-reducer";
import FactReducer from "./factReducer";
import RuleGroupReducer from "./rule-group-reducer";
import ConstantReducer from "./constantReducer";
import KeyReducer from "./KeyReducer";
import RulesReducer from "./rulesReducer";

export const rootReducer = combineReducers({
  app: AppReducer,
  ruleset: rulereducer,
  fact: FactReducer,
  ruleGroup: RuleGroupReducer,
  constant: ConstantReducer,
  key: KeyReducer,
  rules: RulesReducer
});
