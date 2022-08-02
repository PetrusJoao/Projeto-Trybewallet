import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    // console.log(expenses);
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">
            {/* Trecho formatado após consulta no código da amiga Larissa-Menezes */}
            { expenses.reduce((acc, cur) => {
              const { value, currency, exchangeRates } = cur;
              return acc + parseFloat(value) * parseFloat(exchangeRates[currency].ask);
            }, 0).toFixed(2) }
          </p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <div>
          <h1>TrybeWallet</h1>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Header);
