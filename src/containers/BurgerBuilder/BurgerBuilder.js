import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Auxiliary from '../../hoc/Auxiliary';

export class BurgerBuilder extends Component {

	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0
		}
	}

	render() {
		return (
			<Auxiliary>
				<Burger ingredients={this.state.ingredients}/>
				<BuildControls />
			</Auxiliary>
		);
	}
}

export default BurgerBuilder;