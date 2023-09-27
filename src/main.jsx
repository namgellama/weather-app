import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { legacy_createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from '@redux-saga/core';

// const sagaMiddleware = createSagaMiddleware();
// const rootReducer = combineReducers({});

// const store = legacy_createStore(rootReducer, applyMiddleware(sagaMiddleware));
// sagaMiddleware.run()

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		{/* <Provider store={store}> */}
		<App />
		{/* </Provider> */}
	</React.StrictMode>
);
