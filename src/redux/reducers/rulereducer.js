import * as ActionTypes from "../actionTypes/action-type";
import { cloneDeep } from "lodash/lang";
import { findIndex } from "lodash/array";

const initialState = {
  rulesets: [],
  activeRuleset: 0,
  updatedFlag: false,
  uploadedRules: [],
};

const replaceRulesetByIndex = (rulesets, targetset, index) => {
  return [...rulesets.slice(0, index), targetset, ...rulesets.slice(index + 1)];
};

function ruleset(state = initialState, action = "") {
  switch (action.type) {
    case ActionTypes.UPLOAD_RULESET: {
      const { ruleset } = action.payload;
      const updatedRulesets = state.rulesets.concat(ruleset);
      return {
        ...state,
        rulesets: cloneDeep(updatedRulesets),
        uploadedRules: cloneDeep(updatedRulesets),
      };
    }

    case ActionTypes.ADD_RULESET: {
      const { name } = action.payload;
      const newRuleset = { name, attributes: [], decisions: [] };
      const updatedRulesets = state.rulesets.concat(newRuleset);
      const count = updatedRulesets.length - 1; // index of the last added ruleset
      return {
        ...state,
        rulesets: cloneDeep(updatedRulesets),
        activeRuleset: count,
      };
    }

    case ActionTypes.UPDATE_RULESET_INDEX: {
      const { name } = action.payload;
      const index = findIndex(state.rulesets, { name });
      return { ...state, activeRuleset: index };
    }

    case ActionTypes.ADD_DECISION: {
      const { condition } = action.payload;
      const updatedDecisions = [
        ...state.rulesets[state.activeRuleset].decisions,
        condition,
      ];

      const updatedRuleSet = {
        ...state.rulesets[state.activeRuleset],
        decisions: updatedDecisions,
      };

      return {
        ...state,
        updatedFlag: true,
        rulesets: replaceRulesetByIndex(
          state.rulesets,
          updatedRuleSet,
          state.activeRuleset
        ),
      };
    }

    case ActionTypes.UPDATE_DECISION: {
      const { condition, decisionIndex } = action.payload;
      const updatedDecisions = [
        ...state.rulesets[state.activeRuleset].decisions,
      ];
      updatedDecisions[decisionIndex] = condition;

      const updatedRuleSet = {
        ...state.rulesets[state.activeRuleset],
        decisions: updatedDecisions,
      };

      return {
        ...state,
        updatedFlag: true,
        rulesets: replaceRulesetByIndex(
          state.rulesets,
          updatedRuleSet,
          state.activeRuleset
        ),
      };
    }

    case ActionTypes.REMOVE_DECISION: {
      const { decisionIndex } = action.payload;
      const updatedDecisions = [
        ...state.rulesets[state.activeRuleset].decisions.slice(
          0,
          decisionIndex
        ),
        ...state.rulesets[state.activeRuleset].decisions.slice(
          decisionIndex + 1
        ),
      ];

      const updatedRuleSet = {
        ...state.rulesets[state.activeRuleset],
        decisions: updatedDecisions,
      };

      return {
        ...state,
        updatedFlag: true,
        rulesets: replaceRulesetByIndex(
          state.rulesets,
          updatedRuleSet,
          state.activeRuleset
        ),
      };
    }

    case ActionTypes.REMOVE_DECISIONS: {
      const { outcome } = action.payload;
      const updatedDecisions = state.rulesets[
        state.activeRuleset
      ].decisions.filter(
        (decision) => !(decision.event && decision.event.type === outcome)
      );

      const updatedRuleSet = {
        ...state.rulesets[state.activeRuleset],
        decisions: updatedDecisions,
      };

      return {
        ...state,
        updatedFlag: true,
        rulesets: replaceRulesetByIndex(
          state.rulesets,
          updatedRuleSet,
          state.activeRuleset
        ),
      };
    }

    case ActionTypes.ADD_ATTRIBUTE: {
      const { attribute } = action.payload;
      const updatedAttributes = [
        ...state.rulesets[state.activeRuleset].attributes,
        attribute,
      ];

      const updatedRuleSet = {
        ...state.rulesets[state.activeRuleset],
        attributes: updatedAttributes,
      };

      return {
        ...state,
        updatedFlag: true,
        rulesets: replaceRulesetByIndex(
          state.rulesets,
          updatedRuleSet,
          state.activeRuleset
        ),
      };
    }

    case ActionTypes.UPDATE_ATTRIBUTE: {
      const { attribute, index } = action.payload;
      const updatedAttributes = [
        ...state.rulesets[state.activeRuleset].attributes.slice(0, index),
        attribute,
        ...state.rulesets[state.activeRuleset].attributes.slice(index + 1),
      ];

      const updatedRuleSet = {
        ...state.rulesets[state.activeRuleset],
        attributes: updatedAttributes,
      };

      return {
        ...state,
        updatedFlag: true,
        rulesets: replaceRulesetByIndex(
          state.rulesets,
          updatedRuleSet,
          state.activeRuleset
        ),
      };
    }

    case ActionTypes.REMOVE_ATTRIBUTE: {
      const { index } = action.payload;
      const updatedAttributes = [
        ...state.rulesets[state.activeRuleset].attributes.slice(0, index),
        ...state.rulesets[state.activeRuleset].attributes.slice(index + 1),
      ];

      const updatedRuleSet = {
        ...state.rulesets[state.activeRuleset],
        attributes: updatedAttributes,
      };

      return {
        ...state,
        updatedFlag: true,
        rulesets: replaceRulesetByIndex(
          state.rulesets,
          updatedRuleSet,
          state.activeRuleset
        ),
      };
    }

    case ActionTypes.RESET_ATTRIBUTE: {
      if (
        state.uploadedRules[state.activeRuleset] &&
        state.uploadedRules[state.activeRuleset].attributes
      ) {
        const updatedRuleSet = {
          ...state.rulesets[state.activeRuleset],
          attributes: cloneDeep(
            state.uploadedRules[state.activeRuleset].attributes
          ),
        };

        return {
          ...state,
          rulesets: replaceRulesetByIndex(
            state.rulesets,
            updatedRuleSet,
            state.activeRuleset
          ),
        };
      }
      return { ...state };
    }

    case ActionTypes.RESET_DECISION: {
      if (
        state.uploadedRules[state.activeRuleset] &&
        state.uploadedRules[state.activeRuleset].decisions
      ) {
        const updatedRuleSet = {
          ...state.rulesets[state.activeRuleset],
          decisions: cloneDeep(
            state.uploadedRules[state.activeRuleset].decisions
          ),
        };

        return {
          ...state,
          rulesets: replaceRulesetByIndex(
            state.rulesets,
            updatedRuleSet,
            state.activeRuleset
          ),
        };
      }
      return { ...state };
    }

    default:
      return { ...state };
  }
}

export default ruleset;
