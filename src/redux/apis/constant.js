import api from "./api";

export const fetchConstantsApi = async () => {
  try {
    const response = await api.get("/constant/list");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createConstantApi = async (constant) => {
  try {
    const response = await api.post("/constant/add", constant);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateconstantApi = async (constant, index) => {
  try {
    // const response = await api.patch("/create");
    // return response.data;
    return {
      id: index,
      name: constant.name,
      value: constant.value,
      type: constant.type,
      created_at: "12st July,2024"
    };
  } catch (error) {
    throw error;
  }
};

export const fetchConstantsPerRuleApi = async (ruleId) => {
  try {
    const response = await api.get(`/constant/rule_name/${ruleId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteConstantApi = async (constant) => {
  try {
    const response = await api.delete(`/constant/${constant}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const assignConstantsToRule = async (ruleId, fact) => {
  try {
    const response = await api.put(`external/${ruleId}/const/${fact}`);
    return response.data?.constants ?? [];
  } catch (error) {
    throw error;
  }
};

export const handleRemoveConstantFromRuleApi = async (ruleId, key) => {
  try {
    const response = await api.patch(`/external/remove/${ruleId}/const/${key}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
