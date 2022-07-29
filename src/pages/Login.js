import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import newEmail from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      senha: '',
      disabled: true,
      redirect: false,
    };
  }

  handleDisebled = () => {
    const { senha, email } = this.state;
    const minLength = 5;
    if (senha.length < minLength) {
      return true;
    }
    if (
      !email.length
      || !email.includes('@')
      || !email.includes('.')
      || email.indexOf('.') === email.length - 1
    ) {
      return true;
    }
    if (senha.length >= minLength) {
      return false;
    }
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    this.setState(({
      disabled: this.handleDisebled(),
    }));
  }

  handleLogin = () => {
    const { email } = this.state;
    const { saveEmail } = this.props;
    this.setState({
      redirect: true,
    });
    saveEmail(email);
  }

  render() {
    const { email, senha, disabled, redirect } = this.state;
    return (
      <div>
        <header>Hello, TrybeWallet!</header>
        {redirect ? <Redirect to="/carteira" /> : ''}
        <h1>Login</h1>
        <div className="input-container">
          <div>
            <label htmlFor="email-input">
              E-mail:
              {' '}
              <input
                type="email"
                id="email-input"
                data-testid="email-input"
                value={ email }
                name="email"
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <div>
            <label htmlFor="password-input">
              Senha:
              {' '}
              <input
                type="password"
                id="password-input"
                data-testid="password-input"
                value={ senha }
                name="senha"
                minLength="6"
                required
                onChange={ this.handleChange }
              />
            </label>
          </div>
          <button
            type="button"
            disabled={ disabled }
            onClick={ this.handleLogin }
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = () => {

};

const mapDispatchToProps = (dispatch) => ({
  saveEmail: (email) => { dispatch(newEmail(email)); },
});

Login.propTypes = {
  saveEmail: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Login);
