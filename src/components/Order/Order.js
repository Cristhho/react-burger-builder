import React from 'react';

import classes from './Order.css';

export default function Order(props) {
  return (
    <div className={classes.Order}>
      <p>Ingredients: </p>
      <p>Price: <strong>USD 0.00</strong></p>
    </div>
  )
}
