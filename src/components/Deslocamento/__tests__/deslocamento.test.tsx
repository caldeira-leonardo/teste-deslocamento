import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Deslocamento from '../containers/deslocamento';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Global, css } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import theme from '@/styles/theme';

describe('Deve renderizar a página de deslocamento', () => {
  it(' com os botões', () => {
    render(<Deslocamento />);

    const buttonStart = screen.getByText('Iniciar Deslocamento');
    const buttonEnd = screen.getByText('Encerrar Deslocamento');

    expect(buttonStart).toBeInTheDocument();
    expect(buttonEnd).toBeInTheDocument();
  });

  it('com a tabela', () => {
    render(<Deslocamento />);

    const tableHeader = screen.getByTestId('main-table');

    expect(tableHeader).toBeInTheDocument();
  });

  it('com click do botão iniciar deslocamento', () => {
    render(<BaseComponent />);

    const button = screen.getByTestId('iniciarDeslocamento');
    fireEvent.click(button);

    screen.findByText('Adicionar novo deslocamento');
  });

  it('com erro pelo campo estar vazio', () => {
    render(<BaseComponent />);

    const buttonDeslocamento = screen.getByTestId('iniciarDeslocamento');
    fireEvent.click(buttonDeslocamento);

    const button = screen.getByTestId('modal-confirmation');
    fireEvent.click(button);

    screen.findByText('campo obrigatório');
  });
});

const styles = css`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit !important;
    text-decoration: none !important;
  }

  * {
    box-sizing: border-box;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: rgb(228, 228, 228);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgb(192, 192, 192);
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgb(170, 170, 170);
  }
`;

const BaseComponent = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={theme}>
        <Global styles={styles} />
        <CssBaseline />
        <Deslocamento />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </ThemeProvider>
    </LocalizationProvider>
  );
};
