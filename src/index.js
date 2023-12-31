import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import creatSagaMiddleware from "redux-saga";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reducers from './redux/reducers';
import { myCategorySaga, myH2HSaga, myOddsAllSingleSaga, myOddsChangeDetailHistorySaga, myOddsSingleSaga, myPostsSaga, myScheduleAllSingleSaga, myScheduleSaga, myScheduleSingleSaga, myUserSaga, myUsersSaga, myoddsallrtSaga, myrtSaga, mystatysrtSaga } from './redux/sagas';

const sagaMiddleware = creatSagaMiddleware();
const store = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(myScheduleSaga);
sagaMiddleware.run(myrtSaga);
sagaMiddleware.run(myoddsallrtSaga);
sagaMiddleware.run(mystatysrtSaga);
sagaMiddleware.run(myOddsSingleSaga);
sagaMiddleware.run(myScheduleSingleSaga);
sagaMiddleware.run(myScheduleAllSingleSaga);
sagaMiddleware.run(myOddsAllSingleSaga);
sagaMiddleware.run(myH2HSaga);
sagaMiddleware.run(myUserSaga);
sagaMiddleware.run(myUsersSaga);
sagaMiddleware.run(myOddsChangeDetailHistorySaga);
sagaMiddleware.run(myCategorySaga);
sagaMiddleware.run(myPostsSaga);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
