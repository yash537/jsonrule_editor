import api from "./api";

export const fetchTypesApi = async () => {
  try {
    const response = await api.get("/datatype/list");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchOperatorApi = async () => {
  try {
    const response = await api.get("/operators/list");
    return response.data;
  } catch (error) {
    throw error;
  }
};
