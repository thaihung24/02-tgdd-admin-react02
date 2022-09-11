import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
// import { createStore } from 'redux'
import { Provider } from 'react-redux';
import { store } from './app/store';

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Layout from './component/layout/Layout';
import { Loading } from './component/loading/Loading';
import './assets/admin/boxicons-2.0.7/css/boxicons.min.css'
import './assets/css/theme.css'
import './assets/css/index.css'
import './assets/css/grid.css'


// const store = createStore(
//   rootReducer
// )

let persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(root)
root.render(

  <React.StrictMode>
    <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <Layout />
      </PersistGate>
    </Provider>
  </React.StrictMode>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
