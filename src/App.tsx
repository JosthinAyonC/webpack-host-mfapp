import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { DialogProvider } from '~/provider/DialogContext';
import { ThemeProvider } from '~/provider/ThemeProvider';
import { store } from '~/store';

import AppRouting from './app/AppRouting';
import './globals.css';

const App = () => (
  <React.StrictMode>
    <BrowserRouter>
      <DialogProvider>
        <Provider store={store}>
          <ThemeProvider>
            <AppRouting />
          </ThemeProvider>
        </Provider>
      </DialogProvider>
    </BrowserRouter>
  </React.StrictMode>
);
const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('Failed to find the root element');

const root = ReactDOM.createRoot(rootElement as HTMLElement);

root.render(<App />);
