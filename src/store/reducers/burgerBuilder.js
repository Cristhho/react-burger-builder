import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

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

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredient]: state.ingredients[action.ingredient] + 1
  };
  const updatedIngredients = updateObject(
    state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredient]
  }
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIngredient = {
    [action.ingredient]: state.ingredients[action.ingredient] - 1
  };
  const updatedIngredients = updateObject(
    state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredient]
  }
  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    totalPrice: 4
  });
};

const fetIngredientsFail = (state) => {
  return updateObject(state, {
    error: true
  });
};

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENT: return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENT_FAILED: return fetIngredientsFail(state);
    default: return state;
  }
};