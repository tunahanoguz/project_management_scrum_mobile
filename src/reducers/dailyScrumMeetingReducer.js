import {
    CREATE_DAILY_SCRUM_MEETING_START,
    CREATE_DAILY_SCRUM_MEETING_SUCCESS,
    CREATE_DAILY_SCRUM_MEETING_FAILURE,
    GET_DAILY_SCRUM_MEETING_START,
    GET_DAILY_SCRUM_MEETING_SUCCESS,
    GET_DAILY_SCRUM_MEETING_FAILURE,
    GET_ALL_DAILY_SCRUM_MEETING_MESSAGES_START,
    GET_ALL_DAILY_SCRUM_MEETING_MESSAGES_SUCCESS, GET_ALL_DAILY_SCRUM_MEETING_MESSAGES_FAILURE,
} from "../actions/types";

const initialState = {
    loading: false,
    error: "",
    dailyScrumMeeting: {},
    messages: [],
    userIDs: [],
};

const dailyScrumMeetingReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_DAILY_SCRUM_MEETING_START:
            return {
                ...state,
                loading: true,
            };
        case CREATE_DAILY_SCRUM_MEETING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case CREATE_DAILY_SCRUM_MEETING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case GET_DAILY_SCRUM_MEETING_START:
            return {
                ...state,
                loading: true,
            };
        case GET_DAILY_SCRUM_MEETING_SUCCESS:
            return {
                ...state,
                loading: false,
                dailyScrumMeeting: action.dailyScrumMeeting,
                error: action.error,
            };
        case GET_DAILY_SCRUM_MEETING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case GET_ALL_DAILY_SCRUM_MEETING_MESSAGES_START:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_DAILY_SCRUM_MEETING_MESSAGES_SUCCESS:
            return {
                ...state,
                loading: false,
                messages: action.messages,
                error: action.error,
            };
        case GET_ALL_DAILY_SCRUM_MEETING_MESSAGES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default dailyScrumMeetingReducer;
