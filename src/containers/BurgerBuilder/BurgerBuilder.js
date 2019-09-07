import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Auxiliary from '../../hoc/Auxiliary';

const INGREDIENT_PRICES = {
	salad: 0.5,
	bacon: 0.7,
	cheese: 0.4,
	meat: 1.3
}

export class BurgerBuilder extends Component {

	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {...this.state.ingredients};
		const priceAddition = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		updatedIngredients[type] = updatedCount;
		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice
		});
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if(oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {...this.state.ingredients};
		const priceDeduction = INGREDIENT_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		updatedIngredients[type] = updatedCount;
		this.setState({
			ingredients: updatedIngredients,
			totalPrice: newPrice
		});
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		}
		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		return (
			<Auxiliary>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls
					price={this.state.totalPrice}
					ingredientAdded={this.addIngredientHandler}
					ingredientRemoved={this.removeIngredientHandler}
					disabled={disabledInfo} />
			</Auxiliary>
		);
	}
}

export default BurgerBuilder;