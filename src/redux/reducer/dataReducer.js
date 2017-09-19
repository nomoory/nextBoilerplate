import update from 'immutability-helper';

const initialState = {
  values: [1,2],
}

// REDUCER
export default (state = initialState, action) => {
    switch (action.type) {
        case "EXAMPLE_ACTION": {
            return update ( state, {
                values: { [action.id]: {$set: state.values[action.id]+1 } }
            });
        }

        default:
            return state;
    }
}
