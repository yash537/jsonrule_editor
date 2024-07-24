import api from "./api";

export const fetchRulesbyRuleGroupName = async (name) => {
  try {
    const response = await api.get(`external/list/rule/group/${name}`);
    return response.data.rules ?? [];
  } catch (error) {
    if (
      error.response &&
      error.response.data &&
      error.response.data.description
    ) {
      throw new Error(error.response.data.description);
    } else {
      throw new Error("An error occurred while fetching the rules.");
    }
  }
};

export const createRuleApi = async (data) => {
  try {
    const response = await api.post("external/add/rule", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRuleApi = async (data) => {
  try {
    const response = await api.patch("external/update/rule", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteRuleApi = async (data) => {
  try {
    const response = await api.delete(`external/rule_name/${data}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchRuleConditions = async (ruleGroup, ruleId) => {
  try {
    const response = await api.get(
      `/external/conditions/rule_group/${ruleGroup}/rule/${ruleId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTree = async (ruleGroup, ruleId, tree) => {
  try {
    const response = await api.post(
      `/external/conditions/rule_group/${ruleGroup}/rule/${ruleId}`,
      tree.conditions
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const saveFactsKeyValuePerRuleApi = async (ruleId, data) => {
  try {
    const response = await api.post(`${ruleId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
