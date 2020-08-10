import React, { Component } from 'react';
import{ connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
    formIsValid: false,
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({
			loading: true
    });
    const formData = {};
    for(let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
		const order = {
			ingredients: this.props.ings,
			price: this.props.price,
			customer: formData,
			
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

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
  };
}

export default connect(mapStateToProps, null)(ContactData);
