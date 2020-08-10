import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  
  checkoutCancel = () => {
    this.props.history.goBack();
  }

  checkoutContinue = () => {
    this.props.history.replace('/checkout/contact-data');
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkoutCancel={this.checkoutCancel}
          checkoutContinue={this.checkoutContinue} />
        <Route
          path={this.props.match.path + '/contact-data'}
          component={ContactData}/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
  };
};

export default connect(mapStateToProps, null)(Checkout);
