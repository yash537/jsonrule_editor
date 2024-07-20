import api from "./api";

export const fetchFactsApi = async () => {
  try {
    const response = await api.get("/fact/list");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createFactApi = async (fact) => {
  try {
    const response = await api.post("/fact/add", fact);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateFactApi = async (fact, index) => {
  try {
    return {
      id: index,
      name: fact.name,
      type: fact.type,
      created_at: "12st July,2024"
    };
  } catch (error) {
    throw error;
  }
};

export const deleteFactApi = async (fact) => {
  try {
    const response = await api.delete(`/fact/${fact}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchFactsPerRuleApi = async (ruleId) => {
  try {
    const response = await api.get(`/fact/rule_name/${ruleId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const assignFactsToRule = async (ruleId, fact) => {
  try {
    const response = await api.put(`external/${ruleId}/fact/${fact}`);
    return response.data?.facts ?? [];
  } catch (error) {
    throw error;
  }
};

export const handleRemoveAttrFromRuleApi = async (ruleId, key) => {
  try {
    const response = await api.patch(`/external/remove/${ruleId}/fact/${key}`);
    return response.data?.facts ?? [];
  } catch (error) {
    throw error;
  }
};
