// Coloque aqui suas actions
const newEmail = (state) => ({ type: 'USER_EMAIL', state });

export const receiveCurrency = (currencies) => ({
  type: 'RECEIVE_CURRENCIES',
  currencies });

export function fetchCurrency() {
  return (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((currency) => dispatch(receiveCurrency(Object.keys(currency).filter(
      (moeda) => moeda !== 'USDT',
    ))));
}

export default newEmail;
