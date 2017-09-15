// ACTIONS
export const exampleAction = (params) => {
    params = params || {id:1};
    params.type = 'EXAMPLE_ACTION';
    return params
}
