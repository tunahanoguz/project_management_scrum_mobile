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
    DELETE_PROJECT_FILE_START,
    DELETE_PROJECT_FILE_SUCCESS,
    DELETE_PROJECT_FILE_FAILURE,
    DELETE_PROJECT_REQUEST,
    DELETE_PROJECT_SUCCESS,
    DELETE_PROJECT_FAILURE,
    GET_ALL_PROJECT_COMMENTS_REQUEST,
    GET_ALL_PROJECT_COMMENTS_SUCCESS, GET_ALL_PROJECT_COMMENTS_ERROR,
    GET_ALL_PROJECT_CHILD_COMMENTS_REQUEST, GET_ALL_PROJECT_CHILD_COMMENTS_SUCCESS, GET_ALL_PROJECT_CHILD_COMMENTS_ERROR,
} from "../actions/types";

const initialState = {
    projects: [],
    project: {},
    files: [],
    file: {},
    comments: [],
    childComments: [],
    loading: false,
    error: null,
    deleteProjectFileLoading: false,
    deleteProjectFileSuccess: false,
    deleteProjectFileFailure: "",
    deleteProjectState: 3,
    deleteProjectMessage: "",
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
                error: null,
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
        case DELETE_PROJECT_REQUEST:
            return {
                ...state,
            };
        case DELETE_PROJECT_SUCCESS:
            return {
                ...state,
            };
        case DELETE_PROJECT_FAILURE:
            return {
                ...state,
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
        case DELETE_PROJECT_FILE_START:
            return {
                ...state,
                deleteProjectFileLoading: true,
            };
        case DELETE_PROJECT_FILE_SUCCESS:
            return {
                ...state,
                deleteProjectFileSuccess: true,
                deleteProjectFileLoading: false,
            };
        case DELETE_PROJECT_FILE_FAILURE:
            return {
                ...state,
                deleteProjectFileFailure: action.error,
                deleteProjectFileLoading: false,
            };
        case GET_ALL_PROJECT_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_PROJECT_COMMENTS_SUCCESS:
            return {
                ...state,
                comments: action.comments,
                loading: false,
            };
        case GET_ALL_PROJECT_COMMENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case GET_ALL_PROJECT_CHILD_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_PROJECT_CHILD_COMMENTS_SUCCESS:
            return {
                ...state,
                childComments: action.comments,
                loading: false,
            };
        case GET_ALL_PROJECT_CHILD_COMMENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default projectReducer;