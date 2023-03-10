// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: -1, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'RECEIVE_CURRENCIES':
    return {
      ...state,
      currencies: action.currencies,
    };
  case 'NEW_EXPENSE':
    return {
      ...state,
      expenses: [...state.expenses, action.state],
    };
  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };
  case 'EDIT_EXPENSE':
    return {
      ...state,
      editor: true,
      idToEdit: action.id,
    };
  case 'UPDATE _EXPENSE':
    return {
      ...state,
      editor: false,
      idToEdit: -1,
      expenses: [...state.expenses, action.state],
    };
  default:
    return state;
  }
};

export default wallet;
