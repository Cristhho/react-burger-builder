import React, {Component} from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{

  componentDidUpdate() {
    console.log('[orderSummary] DidUpdate');
  }

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients)
      .map(igKey => {
        return (
          <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>{igKey}:</span>{this.props.ingredients[igKey]}
          </li>
        )
      });
    return(
      <Auxiliary>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total price: ${this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout</p>
        <Button
        btnType="Danger"
        click={this.props.purchaseCancel}>Cancel</Button>
        <Button
        btnType="Success"
        click={this.props.purchaseContinue}>Continue</Button>
      </Auxiliary>
    )
  }
}

export default OrderSummary;
