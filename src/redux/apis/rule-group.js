export const fetchRuleGroups = async () => {
  try {
    // const response = await api.get("/albums");
    // return response.data;
    return [
      {
        id: 1,
        name: "Rule Group1",
        status: 1,
        created_at: "1st July,2024",
        link: "/rule-group/1"
      },
      {
        id: 2,
        name: "Rule Group2",
        status: 0,
        created_at: "1st July,2024",
        link: "/rule-group/2"
      },
      {
        id: 3,
        name: "Rule Group3",
        status: 1,
        created_at: "1st July,2024",
        link: "/rule-group/3"
      }
    ];
  } catch (error) {
    throw error;
  }
};

export const createRuleGroupApi = async (name) => {
  try {
    // const response = await api.get("/create");
    // return response.data;
    return {
      id: 10,
      name,
      status: 1,
      created_at: "12st July,2024",
      link: "/rule-group/10"
    };
  } catch (error) {
    throw error;
  }
};
