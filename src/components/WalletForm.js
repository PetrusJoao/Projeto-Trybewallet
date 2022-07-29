import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency } from '../redux/actions';

class WalletForm extends Component {
  /* constructor() {
    super();
    this.state = {
      currencyList: '',
    };
  } */

  componentDidMount() {
    const { currency } = this.props;
    currency();
  }

  render() {
    // const { currencyList } = this.state;
    const { currencies } = this.props;
    // console.log(Object.keys(currencies));
    return (
      <div>
        {currencies ? (
          <div>
            <h1>WalletForm</h1>
            <form>
              <label htmlFor="value">
                Despesa:
                {' '}
                <input type="text" id="value" data-testid="value-input" />
              </label>
              <label htmlFor="valdescriptionue">
                Descrição:
                {' '}
                <input type="text" id="description" data-testid="description-input" />
              </label>
              <label htmlFor="moeda">
                Moeda:
                {' '}
                <select name="moeda" data-testid="currency-input">
                  {currencies.map(
                    (currency) => (
                      <option
                        value={ currency }
                        key={ currency }
                      >
                        {currency}
                      </option>
                    ),
                  )}
                </select>
              </label>
              <label htmlFor="metodo">
                Método de pagamento:
                {' '}
                <select name="metodo" data-testid="method-input">
                  <option value="dinheiro">Dinheiro</option>
                  <option value="credito">Cartão de crédito</option>
                  <option value="debito">Cartão de débito</option>
                </select>
              </label>
              <label htmlFor="tag">
                Categoria:
                {' '}
                <select name="tag" data-testid="tag-input">
                  <option value="alimentacao">Alimentação</option>
                  <option value="lazer">Lazer</option>
                  <option value="trabalho">Trabalho</option>
                  <option value="transporte">Transporte</option>
                  <option value="saude">Saúde</option>
                </select>
              </label>
            </form>
          </div>
        ) : 'erro' }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  currency: () => { dispatch(fetchCurrency()); },
});

WalletForm.propTypes = {
  fetchCurrency: PropTypes.func,
  currency: PropTypes.func,
  currencies: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
