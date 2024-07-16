import api from "./api";

export const fetchKeysApi = async () => {
  try {
    const response = await api.get("/keys/list");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createKeyApi = async (key) => {
  try {
    const response = await api.post("/keys/add", key);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateKeyApi = async (key, index) => {
  try {
    // const response = await api.get("/create");
    // return response.data;
    return {
      id: index,
      name: key.name,
      created_at: "12st July,2024"
    };
  } catch (error) {
    throw error;
  }
};

export const deleteKeyApi = async (key) => {
  try {
    const response = await api.delete(`/keys/${key}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
