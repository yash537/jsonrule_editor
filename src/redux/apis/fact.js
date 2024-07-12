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
