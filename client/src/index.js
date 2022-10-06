/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React from 'react';
import './index.css';
import * as ReactDOMClient from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App/App.jsx';
import store from './components/redux/store';

const container = document.getElementById('root');
const root = ReactDOMClient.createRoot(container);

root.render(<Provider store={store}><App /></Provider>);
