import { createStore, compose, applyMiddleware } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import { default as reducer, sagaWatcher } from "./jokesReducer";

const saga = createSagaMiddleware();

const store = createStore(
    reducer,
    compose(applyMiddleware(saga), devToolsEnhancer())
);

saga.run(sagaWatcher);

export default  store
