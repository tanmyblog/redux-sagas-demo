import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { List } from 'immutable';
import reducers from './reducers';
import { SHOW_TYPE_ALL, lightTheme } from './common/Constants';
import changeTextSaga from './sagas/changeText';

// const generatorData = () => {
//   let result = []
//   for (let index = 0; index < 100; index++) {
//       result = [...result, {
//           index,
//           type: true
//       }]
//   }
//   return result;
// }

const initalState = {
  items: List(),
  // items: generatorData(),
    themeName: lightTheme,
    showType: SHOW_TYPE_ALL,
    text: '',
  
  };
  
  const saga = createSagaMiddleware();
  const store = createStore(
    reducers,
    initalState,
    applyMiddleware(saga),
  );
  saga.run(changeTextSaga);

ReactDOM.render(<Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

serviceWorker.unregister();
