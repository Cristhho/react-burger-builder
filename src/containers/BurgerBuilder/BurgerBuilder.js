import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {

	state = {
		purchasing: false,
	}

	componentDidMount() {
		this.props.onInitIngredients();
	}

	updatePurchaseState = (ingredients) => {
		const sum = Object.keys(ingredients)
				.map(igKey => {
					return ingredients[igKey];
				})
				.reduce((sum, el) => {
					return sum + el;
				}, 0);
		return sum > 0;
	}

	purchaseHandler = () => {
		this.setState({purchasing: true})
	}
	purchaseCancelHandler = () => {
		this.setState({purchasing: false})
	}
	purchaseContinueHandler = () => {
		this.props.onInitPurchased();
		this.props.history.push('/checkout');
	}

	render() {
		const disabledInfo = {
			...this.props.ings
		}
		for(let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		let orderSummary = null;

		let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
		if(this.props.ings) {
			burger = (
				<Auxiliary>
					<Burger ingredients={this.props.ings}/>
					<BuildControls
						price={this.props.price}
						purchasable={this.updatePurchaseState(this.props.ings)}
						purchasing={this.purchaseHandler}
						ingredientAdded={this.props.onAddIngredient}
						ingredientRemoved={this.props.onRemoveIngredient}
						disabled={disabledInfo} />
				</Auxiliary>);
			orderSummary = <OrderSummary
					price={this.props.price}
					ingredients={this.props.ings}
					purchaseCancel={this.purchaseCancelHandler}
					purchaseContinue={this.purchaseContinueHandler}/>;
		}
		return (
			<Auxiliary>
				<Modal
				show={this.state.purchasing}
				modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Auxiliary>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ings: state.burgerBuilder.ingredients,
		price: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAddIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
		onRemoveIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
		onInitIngredients: () => dispatch(actions.initIngredients()),
		onInitPurchased: () => dispatch(actions.purchaseInit())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));