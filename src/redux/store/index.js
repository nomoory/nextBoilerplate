import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducer';

var makeStore = (initialState, options) => {
    const composeEnhancers = compose;

    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(thunkMiddleware))
    );

}

export default makeStore;
