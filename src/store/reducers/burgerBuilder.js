import * as actionTypes from '../actions/actionTypes';

const initialState = {
  ingredients: null,
	error: false,
	totalPrice: 4,
};

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient],
      };
    case actionTypes.SET_INGREDIENT:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4
      };
    case actionTypes.FETCH_INGREDIENT_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return {
        ...state
      };
  }
};