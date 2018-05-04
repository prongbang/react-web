import {createStore, applyMiddleware, compose} from 'redux';
import AppReducer from './reducers';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import {routerMiddleware} from 'react-router-redux'

import mySaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState = {}, history) {

    // Create the store with two middlewares
    const middlewares = [sagaMiddleware, logger, thunk, routerMiddleware(history)]

    const enhancers = [applyMiddleware(...middlewares)]

    const store = createStore(AppReducer, initialState, compose(...enhancers))

    // Extensions
    store.asyncReducers = {} // Async reducer registry

    // then run the saga
    // sagaMiddleware.run(mySaga)

    return store
}