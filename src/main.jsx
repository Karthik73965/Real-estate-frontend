import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import './index.css';
import { persist, store } from './redux/Store.js';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null}  persistor={persist}>
    <App />
    </PersistGate>
  </Provider>
)
