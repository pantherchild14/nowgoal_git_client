import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import creatSagaMiddleware from "redux-saga";
import {createStore,applyMiddleware} from "redux";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reducers from './redux/reducers';
import { myOddsSingleSaga, myScheduleSaga, myScheduleSingleSaga, myrtSaga, mystatysrtSaga} from './redux/sagas';

const sagaMiddleware = creatSagaMiddleware();
const store = createStore(reducers,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(myScheduleSaga);
sagaMiddleware.run(myrtSaga);
sagaMiddleware.run(mystatysrtSaga);
sagaMiddleware.run(myOddsSingleSaga);
sagaMiddleware.run(myScheduleSingleSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
