import {
    GET_ALL_PROJECTS_START,
    GET_ALL_PROJECTS_SUCCESS,
    GET_ALL_PROJECTS_FAILURE,
    GET_SINGLE_PROJECT_START,
    GET_SINGLE_PROJECT_SUCCESS,
    GET_SINGLE_PROJECT_FAILURE,
    GET_ALL_PROJECT_FILES_START,
    GET_ALL_PROJECT_FILES_SUCCESS,
    GET_ALL_PROJECT_FILES_FAILURE,
} from "../actions/types";

const initialState = {
    projects: [],
    project: {},
    files: [],
    file: {},
    loading: false,
    error: null,
};

const projectReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_PROJECTS_START:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_PROJECTS_SUCCESS:
            return {
                ...state,
                projects: action.projects,
                loading: false,
            };
        case GET_ALL_PROJECTS_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_SINGLE_PROJECT_START:
            return {
                ...state,
                loading: true,
            };
        case GET_SINGLE_PROJECT_SUCCESS:
            return {
                ...state,
                project: action.project,
                loading: false,
            };
        case GET_SINGLE_PROJECT_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_ALL_PROJECT_FILES_START:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_PROJECT_FILES_SUCCESS:
            return {
                ...state,
                files: action.files,
                loading: false,
            };
        case GET_ALL_PROJECT_FILES_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        default:
            return state;
    }
};

export default projectReducer;