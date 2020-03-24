import {
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    GET_USER_BY_ID_START,
    GET_USER_BY_ID_SUCCESS,
    GET_USER_BY_ID_FAILURE,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAILURE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    CHANGE_USER_FULLNAME_SUCCESS,
    CHANGE_USER_FULLNAME_FAILURE,
    UPDATE_PP_SUCCESS,
    UPDATE_PP_FAILURE,
} from "../actions/types/authTypes";

const initialState = {
    authState: false,
    users: [],
    user: {},
    foundUser: {},
    error: "",
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_SUCCESS:
            return {
                ...state,
                authState: action.authState,
                user: action.user,
            };
        case GET_USER_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case GET_USER_BY_ID_START:
            return {
                ...state,
                loading: true,
            };
        case GET_USER_BY_ID_SUCCESS:
            return {
                ...state,
                foundUser: action.foundUser,
                loading: false,
            };
        case GET_USER_BY_ID_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.users,
            };
        case GET_ALL_USERS_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                authState: action.authState,
                user: action.user,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case REGISTER_SUCCESS:
            return {
                ...state,
                authState: action.authState,
                user: action.user,
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                authState: action.authState,
                user: action.user,
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case CHANGE_USER_FULLNAME_SUCCESS:
            return {
                ...state,
                fullName: action.fullName,
            };
        case CHANGE_USER_FULLNAME_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        case UPDATE_PP_FAILURE:
            return {
                ...state,
                error: action.error,
            };
        default:
            return state;
    }
};

export default authReducer;
