import * as ActionTypes from "../actionTypes/action-type";

const initialState = {
  attributes: [],
  attributesOfRule: []
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
      return {
        ...state,
        attributes: state.attributes.filter(
          (attribute) => attribute.name !== action.payload
        )
      };
    }
    case ActionTypes.FETCH_FACTS_PER_RULE: {
      return {
        ...state,
        attributesOfRule: action.payload,
        error: null
      };
    }
    case ActionTypes.FETCH_FACTS: {
      return {
        ...state,
        attributes: action.payload,
        error: null
      };
    }
    case ActionTypes.DELETE_FACT_FROM_RULE: {
      return {
        ...state,
        attributesOfRule: state.attributesOfRule.filter(
          (attribute) => attribute.name !== action.payload
        )
      };
    }

    default:
      return state;
  }
};

export default FactReducer;
