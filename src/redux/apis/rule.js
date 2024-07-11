import api from "./api";

export const fetchRulesbyRuleGroupName = async (name) => {
  try {
    const response = await api.get(`/list/rule/group/${name}`);
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

// export const createRuleGroupApi = async (data) => {
//   try {
//     const response = await api.post("/add/rule_group", data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const updateRuleGroupApi = async (data) => {
//   try {
//     const response = await api.patch("/update/rule_group", data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };
