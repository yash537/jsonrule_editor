import {
  createRuleGroupApi,
  deleteRuleGroupApi,
  fetchRuleGroups,
  updateRuleGroupApi
} from "../apis/rule-group";
import {
  FETCH_RULE_GROUPS_SUCCESS,
  FETCH_RULE_GROUPS_FAILURE,
  CREATE_RULE_GROUP,
  UPDATE_RULE_GROUP,
  DELETE_RULE_GROUP
} from "../actionTypes/action-type";
import { sendNotification } from "./app";
import {
  CREATE_RULE_GROUP_FAILUER,
  CREATE_RULE_GROUP_SUCCESS,
  DELETE_RULE_GROUP_SUCCESS,
  UPDATE_RULE_GROUP_SUCCESS
} from "../../constants/messages";

export const fetchRuleGroupsSuccess = (ruleGroups) => ({
  type: FETCH_RULE_GROUPS_SUCCESS,
  payload: ruleGroups
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
