import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer/reducer';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

let finalCreateStore = compose(
    applyMiddleware(createLogger(), thunk)
)(createStore)

export default function configureStore() {
    return finalCreateStore(rootReducer)
}