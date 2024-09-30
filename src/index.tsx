import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { apolloClient } from './graphql/ApolloClient';
import { Provider } from 'react-redux';
import store from 'src/core/configureStore';
import { ApolloProvider } from '@apollo/client';
import AuthProvider from 'src/modules/authentication/authentication/adapters/in/providers/AuthProvider';
import ThemeCustomization from './core/themes';
import Locales from 'src/modules/patients/patient-console/patient-sidebar/components/Locales';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  // <React.StrictMode>
  <ThemeCustomization>
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Provider store={store}>
          <BrowserRouter>
            <Locales>
              <App />
            </Locales>
          </BrowserRouter>
        </Provider>
      </AuthProvider>
    </ApolloProvider>
  </ThemeCustomization>,
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
