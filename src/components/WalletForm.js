import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrency, newExpense } from '../redux/actions';

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentacao',
      description: '',
      id: 0,
      exchangeRates: {},
    };
  }

  componentDidMount() {
    const { currency } = this.props;
    currency();
  }

askConsult = async () => {
  const { expense, expenses } = this.props;
  const ask = await this.fetchAsk();
  this.setState({
    exchangeRates: ask,
    id: expenses.length,
  }, () => expense(this.state));
  this.resetForm();
}

  handleAdd = () => {
    this.askConsult();
  };

  handleEdit = async () => {
    const { idToEdit, expense } = this.props;
    const ask = await this.fetchAsk();
    this.setState({
      exchangeRates: ask,
      id: idToEdit,
    }, () => expense(this.state));
    this.resetForm();
  };

  resetForm = () => {
    this.setState({
      value: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentacao',
      description: '',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  fetchAsk = async () => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json());

  render() {
    const { value, currency, method, tag, description } = this.state;
    const { currencies, edit } = this.props;
    return (
      <div>
        {currencies ? (
          <div>
            <h1>WalletForm</h1>
            <form>
              <label htmlFor="value">
                Despesa:
                {' '}
                <input
                  type="number"
                  name="value"
                  id="value-input"
                  value={ value }
                  data-testid="value-input"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="description">
                Descrição:
                {' '}
                <input
                  type="text"
                  name="description"
                  value={ description }
                  id="description-input"
                  data-testid="description-input"
                  onChange={ this.handleChange }
                />
              </label>
              <label htmlFor="currency">
                Moeda:
                {' '}
                <select
                  name="currency"
                  value={ currency }
                  onChange={ this.handleChange }
                  data-testid="currency-input"
                >
                  {currencies.map(
                    (currencyAtMoment) => (
                      <option
                        value={ currencyAtMoment }
                        key={ currencyAtMoment }
                      >
                        {currencyAtMoment}
                      </option>
                    ),
                  )}
                </select>
              </label>
              <label htmlFor="method">
                Método de pagamento:
                {' '}
                <select
                  name="method"
                  value={ method }
                  data-testid="method-input"
                  onChange={ this.handleChange }
                >
                  <option value="Dinheiro">Dinheiro</option>
                  <option value="Cartão de crédito">Cartão de crédito</option>
                  <option value="Cartão de débito">Cartão de débito</option>
                </select>
              </label>
              <label htmlFor="tag">
                Categoria:
                {' '}
                <select
                  name="tag"
                  value={ tag }
                  data-testid="tag-input"
                  onChange={ this.handleChange }
                >
                  <option value="Alimentacao">Alimentação</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Trabalho">Trabalho</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Saúde">Saúde</option>
                </select>
              </label>
              <div>
                {edit ? (
                  <button
                    type="button"
                    onClick={ this.handleEdit }
                  >
                    Editar despesa
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={ this.handleAdd }
                  >
                    Adicionar despesa
                  </button>
                )}
              </div>
            </form>
          </div>
        ) : 'erro' }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  edit: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  currency: () => { dispatch(fetchCurrency()); },
  expense: (despesa) => dispatch(newExpense(despesa)),
});

WalletForm.propTypes = {
  fetchCurrency: PropTypes.func,
  currency: PropTypes.func,
  currencies: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
