import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WalletForm from '../components/WalletForm';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <header>
          <p data-testid="email-field">{email}</p>
          <p data-testid="total-field">0,00</p>
          <p data-testid="header-currency-field">BRL</p>
        </header>
        <div>
          <h1>TrybeWallet</h1>
          <WalletForm />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Wallet.propTypes = {
  email: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Wallet);
