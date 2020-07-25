import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

import Classes from './ContactData.css';

export default class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
			loading: true
		});
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Christian Ochoa',
				address: {
					street: 'test street 1',
					zipCode: '090101',
					country: 'Ecuador'
				},
				email: 'cristhho@gmail.com'
			},
			deliveryMethod: 'fastest'
		};
		axios.post('/orders.json', order)
			.then(response => {
        console.log(response)
        this.props.history.push('/');
      })
			.catch(error => console.log(error))
			.finally(() => this.setState({
				loading: false
			}));
  }

  render() {
    let form = (
      <form>
        <input type='text' name='name' placeholder='Your name' />
        <input type='email' name='email' placeholder='Your email' />
        <input type='text' name='street' placeholder='Street' />
        <input type='text' name='postal' placeholder='Postal code' />
        <Button btnType='Success' click={this.orderHandler}>Order</Button>
      </form>
    );
    if(this.state.loading)
      form = <Spinner />;
    return (
      <div className={Classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    )
  }
}
