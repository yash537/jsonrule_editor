import { combineReducers } from "redux";
import rulereducer from "./rulereducer";
import AppReducer from "./app-reducer";

export const rootReducer = combineReducers({
  app: AppReducer,
  ruleset: rulereducer,
});
