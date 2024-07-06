export const fetchKeysApi = async () => {
  try {
    // const response = await api.get("/albums");
    // return response.data;
    return [
      {
        name: "Minor",
        id: 1,
        created_at: "1st July, 2024"
      },
      {
        name: "Adult",
        id: 2,
        created_at: "1st July, 2024"
      },
      {
        name: "Aged",
        id: 3,
        created_at: "1st July, 2024"
      }
    ];
  } catch (error) {
    throw error;
  }
};

export const createKeyApi = async (key) => {
  try {
    // const response = await api.get("/create");
    // return response.data;
    return {
      id: 10,
      name: key.name,
      created_at: "12st July,2024"
    };
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
