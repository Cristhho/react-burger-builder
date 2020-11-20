import React, { Component } from 'react'
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Classes from './Auth.css';
import * as actions from '../../store/actions'

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your e-mail'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        error: ''
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
        error: ''
      },
    },
    is_signup: true
  };

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
    const updatedControls = {
      ...this.state.controls,
      [inputId]: {
        ...this.state.controls[inputId],
        value: event.target.value,
        valid: this.checkValidity(event.target.value, this.state.controls[inputId].validation),
        touched: true
      }
    };

    this.setState({controls: updatedControls});
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.is_signup
    );
  }

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return {
        is_signup: !prevState.is_signup
      };
    });
  }

  render() {
    const formElements = [];
    for(let key in this.state.controls) {
      formElements.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    let form = formElements.map((element) => (
      <Input
        key={element.id}
        elementType={element.config.elementType}
        elementConfig={element.config.elementConfig}
        value={element.config.value}
        invalid={!element.config.valid}
        shouldValidate={element.config.validation}
        touched={element.config.touched}
        errorMessage={element.config.error}
        changed={(event) => this.inputChangeHandler(event, element.id)} />
    ));

    if(this.props.loading)
      form = <Spinner />

    let errorMessage = null;
    if(this.props.error)
      errorMessage = (<p>{this.props.error.message.toLowerCase().replaceAll('_', ' ')}</p>);

    return (
      <div className={Classes.Auth}>
        <h2>{this.state.is_signup ? 'Signup' : 'Signin'}</h2>
        {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'>Submit</Button>
        </form>
        <Button 
          click={this.switchAuthModeHandler}
          btnType='Danger'>Go to {this.state.is_signup ? 'signin' : 'signup'}</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
