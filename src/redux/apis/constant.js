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
