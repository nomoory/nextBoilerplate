import {AjaxService} from 'services';

const EXAMPLE_ACTION = 'EXAMPLE_ACTION'
const CHANGE_STATUS = 'CHANGE_STATUS'

// PROGRESSIVE ACTIONS
export function getExampleAction(userName) {
    return (dispatch) => {
        dispach(changeStatus('onUpdate'));
        return AjaxService.connect(userName)
            .then((value) => { dispatch(exampleAction(value)) })
            .catch((error) => { console.log("fail to load", error);});
    };
}

// ACTIONS
export const changeStatus = (value) => {
    return {
        type: 'CHANGE_STATUS',
        value
    }
}

export const exampleAction = (value) => {
    return {
        type: 'EXAMPLE_ACTION',
        value
    }
}
