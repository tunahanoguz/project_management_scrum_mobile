import {
    CREATE_TASK_START,
    CREATE_TASK_FAILURE,
    GET_ALL_TASKS_START,
    GET_ALL_TASKS_SUCCESS,
    GET_ALL_TASKS_FAILURE,
    GET_TASKS_FOR_HOME_START,
    GET_TASKS_FOR_HOME_SUCCESS,
    GET_TASKS_FOR_HOME_FAILURE,
    GET_MY_TASKS_START,
    GET_MY_TASKS_SUCCESS,
    GET_MY_TASKS_FAILURE,
    GET_ALL_PROJECT_TASKS_START,
    GET_ALL_PROJECT_TASKS_SUCCESS,
    GET_ALL_PROJECT_TASKS_FAILURE,
    GET_ALL_TASK_FILES_START,
    GET_ALL_TASK_FILES_SUCCESS,
    GET_ALL_TASK_FILES_FAILURE,
    GET_ALL_TASK_COMMENTS_START,
    GET_ALL_TASK_COMMENTS_SUCCESS,
    GET_ALL_TASK_COMMENTS_FAILURE,
    GET_TASK_REPLY_COMMENTS_START,
    GET_TASK_REPLY_COMMENTS_SUCCESS,
    GET_TASK_REPLY_COMMENTS_FAILURE,
    CREATE_TASK_FILE_START,
    CREATE_TASK_FILE_SUCCESS,
    CREATE_TASK_FILE_FAILURE,
    GET_TASKS_FOR_USER_START,
    GET_TASKS_FOR_USER_SUCCESS,
    GET_TASKS_FOR_USER_FAILURE,
    GET_SINGLE_TASK_START,
    GET_SINGLE_TASK_SUCCESS,
    GET_SINGLE_TASK_FAILURE,
} from '../actions/types/taskTypes';

const initialState = {
    tasks: [],
    homeTasks: [],
    myTasks: [],
    userTasks: [],
    task: {},
    files: [],
    comments: [],
    replyComments: [],
    loading: false,
    error: "",
};

const taskReducer = (state = initialState, action) => {
    switch(action.type){
        case CREATE_TASK_START:
            return {
                ...state,
                loading: true,
            };
        case CREATE_TASK_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: true,
            };
        case GET_ALL_TASKS_START:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.tasks,
                loading: false,
            };
        case GET_ALL_TASKS_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_SINGLE_TASK_START:
            return {
                ...state,
                loading: true,
                error: ""
            };
        case GET_SINGLE_TASK_SUCCESS:
            return {
                ...state,
                task: action.task,
                loading: false,
                error: "",
            };
        case GET_SINGLE_TASK_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_ALL_PROJECT_TASKS_START:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_PROJECT_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.tasks,
                loading: false,
            };
        case GET_ALL_PROJECT_TASKS_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_MY_TASKS_START:
            return {
                ...state,
                loading: true,
            };
        case GET_MY_TASKS_SUCCESS:
            return {
                ...state,
                myTasks: action.tasks,
                loading: false,
            };
        case GET_MY_TASKS_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_TASKS_FOR_HOME_START:
            return {
                ...state,
                loading: true,
            };
        case GET_TASKS_FOR_HOME_SUCCESS:
            return {
                ...state,
                homeTasks: action.tasks,
                loading: false,
            };
        case GET_TASKS_FOR_HOME_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_TASKS_FOR_USER_START:
            return {
                ...state,
                loading: true,
            };
        case GET_TASKS_FOR_USER_SUCCESS:
            return {
                ...state,
                userTasks: action.userTasks,
                loading: false,
            };
        case GET_TASKS_FOR_USER_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case CREATE_TASK_FILE_START:
            return {
                ...state,
                loading: true,
            };
        // case CREATE_TASK_FILE_SUCCESS:
        //     return {
        //         ...state,
        //         files: action.files,
        //         loading: false,
        //     };
        case CREATE_TASK_FILE_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_ALL_TASK_FILES_START:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_TASK_FILES_SUCCESS:
            return {
                ...state,
                files: action.taskFiles,
                loading: false,
            };
        case GET_ALL_TASK_FILES_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_ALL_TASK_COMMENTS_START:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case GET_ALL_TASK_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.comments,
                loading: false,
                error: "",
            };
        case GET_ALL_TASK_COMMENTS_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_TASK_REPLY_COMMENTS_START:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case GET_TASK_REPLY_COMMENTS_SUCCESS:
            return {
                ...state,
                replyComments: action.replyComments,
                loading: false,
                error: "",
            };
        case GET_TASK_REPLY_COMMENTS_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        default:
            return state;
    }
};

export default taskReducer;
