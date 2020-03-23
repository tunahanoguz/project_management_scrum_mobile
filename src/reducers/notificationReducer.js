import {
    CREATE_NOTIFICATION_START,
    CREATE_NOTIFICATION_SUCCESS,
    CREATE_NOTIFICATION_FAILURE,
    GET_ALL_NOTIFICATIONS_START,
    GET_ALL_NOTIFICATIONS_SUCCESS,
    GET_ALL_NOTIFICATIONS_FAILURE, SEND_NOTIFICATION_START, SEND_NOTIFICATION_SUCCESS, SEND_NOTIFICATION_FAILURE,
} from '../actions/types';

const initialState = {
    loading: false,
    error: "",
    notifications: [],
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_NOTIFICATION_START:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case CREATE_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
            };
        case CREATE_NOTIFICATION_FAILURE:
            return {
                ...state,
                loading: true,
                error: action.error,
            };
        case GET_ALL_NOTIFICATIONS_START:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case GET_ALL_NOTIFICATIONS_SUCCESS:
            return {
                ...state,
                notifications: action.notifications,
                loading: false,
                error: "",
            };
        case GET_ALL_NOTIFICATIONS_FAILURE:
            return {
                ...state,
                loading: true,
                error: action.error,
            };
        case SEND_NOTIFICATION_START:
            return {
                ...state,
                loading: true,
                error: "",
            };
        case SEND_NOTIFICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
            };
        case SEND_NOTIFICATION_FAILURE:
            return {
                ...state,
                loading: true,
                error: action.error,
            };
        default:
            return state;
    }
};

export default notificationReducer;
