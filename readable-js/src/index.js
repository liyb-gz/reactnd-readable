import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/core';
import 'fontsource-playfair-display';
import { BrowserRouter as Router } from 'react-router-dom';
import theme from './themes/theme';
import * as serviceWorker from './serviceWorker';
ReactDOM.render(React.createElement(Router, null,
    React.createElement(ThemeProvider, { theme: theme },
        React.createElement(Provider, { store: store },
            React.createElement(App, null)))), document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
