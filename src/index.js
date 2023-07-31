import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {createStore,applyMiddleware} from "redux";
import creatSagaMiddleware from "redux-saga";
import reducers from './redux/reducers';
import { myScheduleSaga, myrtSaga, mystatysrtSaga} from './redux/sagas';

const sagaMiddleware = creatSagaMiddleware();
const store = createStore(reducers,applyMiddleware(sagaMiddleware));
sagaMiddleware.run(myScheduleSaga);
sagaMiddleware.run(myrtSaga);
sagaMiddleware.run(mystatysrtSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
