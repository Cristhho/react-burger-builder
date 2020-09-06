import React, { Component } from 'react';
import{ connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';

import Classes from './ContactData.css';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        error: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        error: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zip code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false,
        error: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        error: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your e-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        error: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ]
        },
        value: 'fastest',
        valid: true
      }
    },
    formIsValid: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    
    const formData = {};
    for(let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			customer: formData
    };
    
    this.props.onOrderBurger(order);
  }

  checkValidity(value, rules) {
    let isValid = true;
    if(rules.required)
      isValid = value.trim() !== '' && isValid;

    if(rules.minLength)
      isValid = value.length >= rules.minLength && isValid;

    if(rules.maxLength)
      isValid = value.length <= rules.maxLength && isValid;
    
    return isValid;
  }

  inputChangeHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputId]
    };
    updatedFormElement.value = event.target.value;
    if(updatedFormElement.validation) {
      updatedFormElement.valid = this.checkValidity(
        updatedFormElement.value, updatedFormElement.validation);
      updatedFormElement.touched = true;
      if(!updatedFormElement.valid)
        updatedFormElement.error = 'Please enter a valid ' + inputId;
      else
        updatedFormElement.error = '';
    }
    updatedOrderForm[inputId] = updatedFormElement;
    
    let formIsValid = true;
    for(let input in updatedOrderForm) {
      formIsValid = updatedOrderForm[input].valid && formIsValid;
    }
    
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid
    });
  }

  render() {
    const formElements = [];
    for(let key in this.state.orderForm) {
      formElements.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElements.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            errorMessage={formElement.config.error}
            changed={(event) => this.inputChangeHandler(event, formElement.id)} />
        ))}
        <Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>
      </form>
    );
    if(this.props.loading)
      form = <Spinner />;
    return (
      <div className={Classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
