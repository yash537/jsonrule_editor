import api from "./api";

export const fetchRuleGroups = async () => {
  try {
    const response = await api.get("/list/rule_group");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createRuleGroupApi = async (data) => {
  try {
    const response = await api.post("/add/rule_group", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRuleGroupApi = async (data) => {
  try {
    const response = await api.patch("/update/rule_group", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
