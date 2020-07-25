import React from 'react';

import classes from './Order.css';

export default function Order(props) {

  const ingredients = [];

  for(let ing in props.ingredients) {
    if(props.ingredients[ing] > 0)
      ingredients.push({
        name: ing,
        amount: props.ingredients[ing]
      });
  }

  const ingredientsOutput = ingredients.map(ing => {
    return <span
            style={{
              textTransform: 'capitalize',
              display: 'inline-block',
              margin: '0 8px',
              border: '1px solid #ccc',
              padding: '5px'
            }} key={ing.name}>
            {ing.name} ({ing.amount})
           </span>;
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>Price: <strong>USD {props.price}</strong></p>
    </div>
  )
}
