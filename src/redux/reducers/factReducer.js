import * as ActionTypes from "../actionTypes/action-type";

const initialState = {
  attributes: []
};

const FactReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_FACT:
      return {
        ...state,
        attributes: state.attributes.concat(action.payload)
      };
    case ActionTypes.UPDATE_FACT: {
      const { index, attribute } = action.payload;
      return {
        ...state,
        attributes: [
          attribute,
          ...state.attributes.filter((attribute) => attribute.id !== index)
        ]
      };
    }
    case ActionTypes.DELETE_FACT: {
      const { name } = action.payload;
      return {
        ...state,
        attributes: [
          attribute,
          ...state.attributes.filter((attribute) => attribute.name !== name)
        ]
      };
    }
    case ActionTypes.FETCH_FACTS: {
      return {
        ...state,
        attributes: action.payload,
        error: null
      };
    }
    default:
      return state;
  }
};

export default FactReducer;
