import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
  arredonda = (valor, cotacao) => (
    Math.round(parseFloat(valor) * parseFloat(cotacao) * 100) / 100
  )

  render() {
    const { expenses } = this.props;
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
              expenses.map((expense) => (
                <tr key={ expense.id }>
                  <td>{expense.description}</td>
                  <td>{expense.tag}</td>
                  <td>{expense.method}</td>
                  <td>{parseFloat(expense.value).toFixed(2)}</td>
                  {/* Trecho formatado após ajuda da amiga Larissa-Menezes */}
                  <td>{expense.exchangeRates[expense.currency].name}</td>
                  <td>
                    {
                      parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)
                    }
                  </td>
                  <td>
                    {
                      this.arredonda(expense.value,
                        expense.exchangeRates[expense.currency].ask)
                    }
                  </td>
                  <td>Real</td>
                  <td>
                    <button type="button">Editar</button>
                    <button type="button">Excluir</button>
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

// const mapDispatchToProps = (dispatch) => ({
//   currency: () => { dispatch(fetchCurrency()); },
//   expense: (despesa) => dispatch(newExpense(despesa)),
// });

Table.propTypes = {
  // fetchCurrency: PropTypes.func,
  currency: PropTypes.func,
  currencies: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps)(Table);
