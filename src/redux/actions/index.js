// ACTIONS
export const exampleAction = ({ id = 1 } = {}) => {
    return {
        type: 'EXAMPLE_ACTION',
        id: id
    }
}

export const undo = () => {
    return {
        type: 'UNDO_COUNTER'
    }
}

export const redo = () => {
    return {
        type: 'REDO_COUNTER'
    }
}
