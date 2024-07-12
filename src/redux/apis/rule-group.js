import api from "./api";

export const fetchRuleGroups = async () => {
  try {
    const response = await api.get("external/list/rule_group");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRuleGroupApi = async (data) => {
  try {
    const response = await api.post("external/add/rule_group", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRuleGroupApi = async (data) => {
  try {
    const response = await api.patch("external/update/rule_group", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteRuleGroupApi = async (data) => {
  try {
    const response = await api.delete(`external/group_name/${data}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
