import {GET_ALL_TASKS, EDIT_TASK} from './types';
import {tasks} from "../constants";

export const getAllTasks = () => ({
    type: GET_ALL_TASKS,
    tasks: tasks
});

export const editTask = (task) => (
    {
        type: EDIT_TASK,
        data: task,
    }
);