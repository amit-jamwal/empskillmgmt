import { compose, createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import { createLogger } from 'redux-logger';

let finalCreateStore = compose(
    applyMiddleware(createLogger())
)(createStore)

export default function configureStore(initialState = { todos: [] }) {
    return finalCreateStore(reducer, initialState)
}