import { combineReducers } from 'redux';
import undoable, { includeAction } from 'redux-undo';

import dataReducer from './dataReducer';
import undo from './undo';

const rootReducer = combineReducers({
    dataReducer,
    undo: undoable(undo, {
        filter: includeAction([
            "EXAMPLE_ACTION"
        ]),
        limit: 15,
        debug: true,
        undoType: "UNDO_COUNTER",
        redoType: "REDO_COUNTER"
    })
});

export default rootReducer;
