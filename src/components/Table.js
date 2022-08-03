import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  arredonda = (valor, cotacao) => (
    Math.round(parseFloat(valor) * parseFloat(cotacao) * 100) / 100
  )

  render() {
    const { expenses, deleteItem } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses.map(({
                id, description, tag, method, value, currency, exchangeRates,
              }) => (
                <tr key={ id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{parseFloat(value).toFixed(2)}</td>
                  {/* Trecho formatado após ajuda da amiga Larissa-Menezes */}
                  <td>{exchangeRates[currency].name}</td>
                  <td>
                    {
                      parseFloat(exchangeRates[currency].ask).toFixed(2)
                    }
                  </td>
                  <td>
                    {
                      this.arredonda(value,
                        exchangeRates[currency].ask)
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button type="button">Editar</button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => deleteItem(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>))
            }
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteItem: (id) => dispatch(deleteExpense(id)),
});

Table.propTypes = {
  // fetchCurrency: PropTypes.func,
  currency: PropTypes.func,
  currencies: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
