import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '~/provider/ThemeContext';
import { store } from '~/store';

import Main from './app/Main';
import './globals.css';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <Main />
      </ThemeProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
