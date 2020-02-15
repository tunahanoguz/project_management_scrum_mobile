import {CREATE_TASK, GET_ALL_TASKS, EDIT_TASK} from '../actions/types';

const initialState = {
    tasks: [],
};

const taskReducer = (state = initialState, action) => {
    switch(action.type){
        case EDIT_TASK:
            return;
        case GET_ALL_TASKS:
            return {
                ...state,
                tasks: action.tasks,
            };
        default:
            return state;
    }
};

export default taskReducer;