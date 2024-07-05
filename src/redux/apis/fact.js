export const fetchFactsApi = async () => {
  try {
    // const response = await api.get("/albums");
    // return response.data;
    return [
      {
        name: "Age",
        type: "number",
        id: 1,
        created_at: "1st July, 2024"
      },
      {
        name: "Location",
        type: "string",
        id: 2,
        created_at: "1st July, 2024"
      },
      {
        name: "Subscription",
        type: "boolean",
        id: 3,
        created_at: "1st July, 2024"
      }
    ];
  } catch (error) {
    throw error;
  }
};

export const createFactApi = async (fact) => {
  try {
    // const response = await api.get("/create");
    // return response.data;
    return {
      id: 10,
      name: fact.name,
      type: fact.type,
      created_at: "12st July,2024"
    };
  } catch (error) {
    throw error;
  }
};

export const updateFactApi = async (fact, index) => {
  try {
    // const response = await api.get("/create");
    // return response.data;
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
