import React from 'react';
import App from '../../App';
import { renderWithRouter, renderWithRouterAndRedux } from './renderWith';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../../components/Header';
import WalletForm from '../../components/WalletForm';
import Wallet from '../../pages/Wallet';
import mockData from './mockData';

describe('Desenvolva testes para atingir 60% de cobertura total da aplicação', () => {
	test('Verifica se o botão está na tela com o texto "Entrar"', () => {
		renderWithRouterAndRedux(<App />);
		const buttonTest = screen.getByRole('button');
		expect(buttonTest).toBeInTheDocument();
		const buttonText = screen.getByText('Entrar');
		expect(buttonText).toBeInTheDocument();
		expect(buttonTest).not.toBeEnabled();
	});

	test('Verifica se a pagina possui um header com texto "Hello, TrybeWallet!"', () => {
		renderWithRouterAndRedux(<App />);
		const headerTest = screen.getByRole('heading');
		expect(headerTest).toBeInTheDocument();
		const headerText = screen.getByText('Hello, TrybeWallet!');
		expect(headerText).toBeInTheDocument();
	});

	test('Verifica se a pagina possui campos de email e senha', () => {
		renderWithRouterAndRedux(<App />);
		const inputEmail = screen.getByLabelText('E-mail:');
		expect(inputEmail).toBeInTheDocument();
		const inputSenha = screen.getByLabelText('Senha:');
		expect(inputSenha).toBeInTheDocument();
	});

	test('Verifica se o botão abilita ao preencher os campos de email e senha', () => {
		const { history } = renderWithRouterAndRedux(<App />);

		const buttonTest = screen.getByRole('button');
		expect(buttonTest).toBeInTheDocument();
		const buttonText = screen.getByText('Entrar');
		expect(buttonText).toBeInTheDocument();
		expect(buttonTest).not.toBeEnabled();
		const inputEmail = screen.getByLabelText('E-mail:');
		expect(inputEmail).toBeInTheDocument();
		const inputSenha = screen.getByLabelText('Senha:');
		expect(inputSenha).toBeInTheDocument();

		userEvent.type(inputEmail, 'tryber@teste.com');
		userEvent.type(inputSenha, '123456');

		expect(buttonTest).toBeEnabled();

		userEvent.click(buttonTest);
    expect(history.location.pathname).toBe('/carteira');
	});

	test('Verifica se possui estado com email salvo', () => {
		const initialStateMock = {
			user: { email: 'tryber@teste.com' },
			wallet: {
				expenses: [
					{
						value: 1,
						currency: 'USD',
						exchangeRates: {
							USD: {
								ask: '5.00',
							},
						},
					},
				],
			},
		};
		renderWithRouterAndRedux(<Header />, {
			initialState: initialStateMock,
			initialPath: '/',
		});

		const emailField = screen.getByTestId('email-field');
		const totalField = screen.getByTestId('total-field');

		expect(emailField).toHaveTextContent('tryber@teste.com');
		expect(totalField).toHaveTextContent('5.00');
	});

	test('Verifica se WalletForm possui as informações corretas', async () => {
		const initialStateMock = {
			user: { email: 'tryber@teste.com' },
			wallet: {
				currencies: Object.keys(mockData),
				expenses: [
					{
						value: '',
						currency: 'USD',
						exchangeRates: {
							USD: {
								ask: '4.7531',
							},
						},
					},
				],
			},
		};
		renderWithRouterAndRedux(<Wallet />, {
			initialState: initialStateMock,
		});

		const valueInput = screen.getByTestId('value-input');
		const descriptionInput = screen.getByTestId('description-input');
		const currencyInput = screen.getByTestId('currency-input');
		const methodInput = screen.getByTestId('method-input');
		const tagInput = screen.getByTestId('tag-input');

		expect(valueInput).toBeInTheDocument();
		expect(descriptionInput).toBeInTheDocument();
		expect(currencyInput).toBeInTheDocument();
		expect(methodInput).toBeInTheDocument();
		expect(tagInput).toBeInTheDocument();

		const buttonTest = screen.getByRole('button', {name: 'Adicionar despesa'});
		expect(buttonTest).toBeInTheDocument();

		userEvent.type(valueInput, 1);
		userEvent.type(descriptionInput, 'teste1');
		userEvent.click(buttonTest);

		expect(valueInput).toHaveTextContent('');
		expect(descriptionInput).toHaveTextContent('');
		expect(currencyInput).toHaveTextContent('USD');
    expect(methodInput).toHaveTextContent('Dinheiro');
	});

	test('Verifica se WalletForm possui elementos de tabela', async () => {
		const initialStateMock = {
			user: { email: 'tryber@teste.com' },
			wallet: {
				currencies: Object.keys(mockData),
				expenses: [
					{
						value: '',
						currency: 'USD',
						exchangeRates: {
							USD: {
								ask: '4.7531',
							},
						},
					},
				],
			},
		};
		renderWithRouterAndRedux(<Wallet />, {
			initialState: initialStateMock,
		});

		const tableTest = screen.getByRole('table');
		expect(tableTest).toBeInTheDocument();

		const thDescrição = screen.getByText('Descrição');
		const thTag = screen.getByText('Tag');
		const thMétodo = screen.getByText('Método de pagamento');
		const thValor = screen.getByText('Valor');
		const thMoeda = screen.getByText('Moeda');
		const thCambio = screen.getByText('Câmbio utilizado');
		const thValorConvertido = screen.getByText('Valor convertido');
		const thMoedaconversão = screen.getByText('Moeda de conversão');
		const thEditarExcluir = screen.getByText('Editar/Excluir');

		expect(thDescrição).toBeInTheDocument();
		expect(thTag).toBeInTheDocument();
		expect(thMétodo).toBeInTheDocument();
		expect(thValor).toBeInTheDocument();
		expect(thMoeda).toBeInTheDocument();
		expect(thCambio).toBeInTheDocument();
		expect(thValorConvertido).toBeInTheDocument();
		expect(thMoedaconversão).toBeInTheDocument();
		expect(thEditarExcluir).toBeInTheDocument();

		const buttonExcluir = screen.getByRole('button', {name: 'Excluir'});
		expect(buttonExcluir).toBeInTheDocument();
		const buttonEditar = screen.getByRole('button', {name: 'Editar'});
		expect(buttonEditar).toBeInTheDocument();

	});
});

// test('', () =>{

// });
