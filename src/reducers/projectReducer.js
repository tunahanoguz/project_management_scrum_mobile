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
    GET_ALL_PROJECT_COMMENTS_SUCCESS,
    GET_ALL_PROJECT_COMMENTS_ERROR,
    GET_ALL_PROJECT_CHILD_COMMENTS_REQUEST,
    GET_ALL_PROJECT_CHILD_COMMENTS_SUCCESS,
    GET_ALL_PROJECT_CHILD_COMMENTS_ERROR,
    GET_ALL_PROJECTS_FOR_HOME_START,
    GET_ALL_PROJECTS_FOR_HOME_SUCCESS,
    GET_ALL_PROJECTS_FOR_HOME_FAILURE,
    GET_PROJECTS_FOR_TEAM_START,
    GET_PROJECTS_FOR_TEAM_SUCCESS,
    GET_PROJECTS_FOR_TEAM_FAILURE,
    GET_TASK_REPLY_COMMENTS_START,
    GET_TASK_REPLY_COMMENTS_SUCCESS,
    GET_TASK_REPLY_COMMENTS_FAILURE,
    GET_PROJECT_REPLY_COMMENTS_START,
    GET_PROJECT_REPLY_COMMENTS_SUCCESS,
    GET_PROJECT_REPLY_COMMENTS_FAILURE,
    GET_PROJECTS_FOR_USER_START,
    GET_PROJECTS_FOR_USER_SUCCESS,
    GET_PROJECTS_FOR_USER_FAILURE,
    GET_PROJECT_NOTES_REQUEST,
    GET_PROJECT_NOTES_SUCCESS,
    GET_PROJECT_NOTES_FAILURE,
    GET_PROJECT_DESCRIPTION_REQUEST, GET_PROJECT_DESCRIPTION_SUCCESS, GET_PROJECT_DESCRIPTION_FAILURE,
} from "../actions/types/projectTypes";

const initialState = {
    projects: [],
    homeProjects: [],
    userProjects: [],
    projectIDs: [],
    project: {},
    files: [],
    file: {},
    comments: [],
    replyComments: [],
    projectDescription: "",
    projectNotes: [],
    loading: false,
    error: "",
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
                projectIDs: action.projectIDs,
                loading: false,
                error: "",
            };
        case GET_ALL_PROJECTS_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_PROJECT_NOTES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_PROJECT_NOTES_SUCCESS:
            return {
                ...state,
                projectNotes: action.projectNotes,
                loading: false,
                error: "",
            };
        case GET_PROJECT_NOTES_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_ALL_PROJECTS_FOR_HOME_START:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_PROJECTS_FOR_HOME_SUCCESS:
            return {
                ...state,
                homeProjects: action.projects,
                loading: false,
                error: "",
            };
        case GET_ALL_PROJECTS_FOR_HOME_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_PROJECTS_FOR_TEAM_START:
            return {
                ...state,
                loading: true,
            };
        case GET_PROJECTS_FOR_TEAM_SUCCESS:
            return {
                ...state,
                projects: action.projects,
                loading: false,
                error: "",
            };
        case GET_PROJECTS_FOR_TEAM_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_PROJECTS_FOR_USER_START:
            return {
                ...state,
                loading: true,
            };
        case GET_PROJECTS_FOR_USER_SUCCESS:
            return {
                ...state,
                projects: action.projects,
                loading: false,
                error: "",
            };
        case GET_PROJECTS_FOR_USER_FAILURE:
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
                error: "",
            };
        case GET_SINGLE_PROJECT_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_PROJECT_DESCRIPTION_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case GET_PROJECT_DESCRIPTION_SUCCESS:
            return {
                ...state,
                projectDescription: action.projectDescription,
                loading: false,
                error: "",
            };
        case GET_PROJECT_DESCRIPTION_FAILURE:
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
                error: "",
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
                error: "",
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
                error: "",
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
                error: "",
            };
        case GET_ALL_PROJECT_COMMENTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case GET_PROJECT_REPLY_COMMENTS_START:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case GET_PROJECT_REPLY_COMMENTS_SUCCESS:
            return {
                ...state,
                replyComments: action.replyComments,
                loading: false,
                error: "",
            };
        case GET_PROJECT_REPLY_COMMENTS_FAILURE:
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
