export const fetchConstantsApi = async () => {
  try {
    // const response = await api.get("/albums");
    // return response.data;
    return [
      {
        name: "Minor",
        type: "number",
        value: 10,
        id: 1,
        created_at: "1st July, 2024"
      },
      {
        name: "Adult",
        type: "string",
        value: 20,
        id: 2,
        created_at: "1st July, 2024"
      },
      {
        name: "Aged",
        type: "boolean",
        value: 60,
        id: 3,
        created_at: "1st July, 2024"
      }
    ];
  } catch (error) {
    throw error;
  }
};

export const createConstantApi = async (constant) => {
  try {
    // const response = await api.get("/create");
    // return response.data;
    return {
      id: 10,
      name: constant.name,
      type: constant.type,
      value: constant.value,
      created_at: "12st July,2024"
    };
  } catch (error) {
    throw error;
  }
};

export const updateconstantApi = async (constant, index) => {
  try {
    // const response = await api.get("/create");
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
