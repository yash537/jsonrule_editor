import {
  createRuleGroupApi,
  deleteRuleGroupApi,
  fetchFactsForRuleGroup,
  fetchRuleGroups,
  saveFactsKeyValuePerRuleGroupApi,
  updateRuleGroupApi
} from "../apis/rule-group";
import {
  FETCH_RULE_GROUPS_SUCCESS,
  FETCH_RULE_GROUPS_FAILURE,
  CREATE_RULE_GROUP,
  UPDATE_RULE_GROUP,
  DELETE_RULE_GROUP,
  FETCH_FACTS_FOR_RULE_GROUP,
  OUTPUT_FOR_RULE_GROUP_VALIDATION,
  RESET_RULE_GROUPS
} from "../actionTypes/action-type";
import { sendNotification } from "./app";
import {
  CREATE_RULE_GROUP_SUCCESS,
  DELETE_RULE_GROUP_SUCCESS,
  OUTPUT_FOR_RULE_GROUP_SUCCESS,
  UPDATE_RULE_GROUP_SUCCESS
} from "../../constants/messages";

export const fetchRuleGroupsSuccess = (ruleGroups) => ({
  type: FETCH_RULE_GROUPS_SUCCESS,
  payload: ruleGroups
});

export const fecthFactsForRuleGroupSuccess = (factsPerRuleGroup) => ({
  type: FETCH_FACTS_FOR_RULE_GROUP,
  payload: factsPerRuleGroup
});

export const fetchRuleGroupsFailure = (error) => ({
  type: FETCH_RULE_GROUPS_FAILURE,
  payload: error
});

export const addRuleGroup = (ruleGroup) => {
  return { type: CREATE_RULE_GROUP, payload: ruleGroup };
};

export const editRuleGroup = (ruleGroup) => {
  return { type: UPDATE_RULE_GROUP, payload: ruleGroup };
};

export const removeRuleGroup = (ruleGroupName) => {
  return { type: DELETE_RULE_GROUP, payload: ruleGroupName };
};

export const outputForValidation = (output) => {
  return { type: OUTPUT_FOR_RULE_GROUP_VALIDATION, payload: output };
};

export const resetRuleGroups = () => {
  return { type: RESET_RULE_GROUPS };
};
export const loadRuleGroups = () => async (dispatch) => {
  try {
    const ruleGroups = await fetchRuleGroups();
    dispatch(fetchRuleGroupsSuccess(ruleGroups));
  } catch (error) {
    dispatch(
      sendNotification({
        message: error.response.data.description,
        type: "error"
      })
    );
    dispatch(fetchRuleGroupsFailure(error.message));
  }
};

export const createRuleGroup = (data) => async (dispatch) => {
  try {
    const ruleGroup = await createRuleGroupApi(data);
    dispatch(addRuleGroup(ruleGroup));
    dispatch(sendNotification(CREATE_RULE_GROUP_SUCCESS));
  } catch (error) {
    dispatch(fetchRuleGroupsFailure(error.message));
    dispatch(
      sendNotification({
        message: error.response.data.description,
        type: "error"
      })
    );
  }
};

export const updateRuleGroup = (data) => async (dispatch) => {
  try {
    const ruleGroup = await updateRuleGroupApi(data);
    dispatch(editRuleGroup({ ...ruleGroup, oldName: data.name }));
    dispatch(sendNotification(UPDATE_RULE_GROUP_SUCCESS));
  } catch (error) {
    dispatch(fetchRuleGroupsFailure(error.message));
    dispatch(
      sendNotification({
        message: error.response.data.description,
        type: "error"
      })
    );
  }
};

export const deleteRuleGroup = (data) => async (dispatch) => {
  try {
    await deleteRuleGroupApi(data);
    dispatch(removeRuleGroup(data));
    dispatch(sendNotification(DELETE_RULE_GROUP_SUCCESS));
  } catch (error) {
    dispatch(fetchRuleGroupsFailure(error.message));
    dispatch(
      sendNotification({
        message: error.response.data.description,
        type: "error"
      })
    );
  }
};

export const fetchFactsPerRuleGroup = (ruleGroup) => async (dispatch) => {
  try {
    const facts = await fetchFactsForRuleGroup(ruleGroup);
    dispatch(fecthFactsForRuleGroupSuccess(facts));
  } catch (error) {
    dispatch(
      sendNotification({
        message: error.response.data.description,
        type: "error"
      })
    );
    dispatch(fetchRuleGroupsFailure(error.message));
  }
};

export const saveFactsKeyValuePerRuleGroup =
  (ruleGroup, data) => async (dispatch) => {
    try {
      const output = await saveFactsKeyValuePerRuleGroupApi(ruleGroup, data);
      dispatch(outputForValidation(output));
      dispatch(sendNotification(OUTPUT_FOR_RULE_GROUP_SUCCESS));
    } catch (error) {
      dispatch(fetchRuleGroupsFailure(error.message));
      dispatch(
        sendNotification({
          message: error.response.data.description,
          type: "error"
        })
      );
    }
  };
