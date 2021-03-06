import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.css';

export default function CheckoutSummary(props) {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!!!</h1>
      <div style={{width: '100%', margin: 'auto'}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType='Danger' click={props.checkoutCancel}>Cancel</Button>
      <Button btnType='Success' click={props.checkoutContinue}>Continue</Button>
    </div>
  )
}
