import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import undoable, { includeAction } from 'redux-undo';

const rootReducer = combineReducers({
    dataReducer
    // For Redo Undo
    // : undoable(dataReducer, {
    //     filter: includeAction([
    //         "EXAMPLE_ACTION"
    //     ]),
    //     limit: 15,
    //     debug: true,
    //     undoType: "UNDO_COUNTER",
    //     redoType: "REDO_COUNTER"
    // })
});

export default rootReducer;
