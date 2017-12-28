// ACTIONS
export const exampleAction = (value) => {
   return {
       type: 'EXAMPLE_ACTION',
       value
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
