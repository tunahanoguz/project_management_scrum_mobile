import {
    CREATE_SPRINT_PLANNING_MEETING_FAILURE,
    CREATE_SPRINT_PLANNING_MEETING_START,
    CREATE_SPRINT_PLANNING_MEETING_SUCCESS,
    DELETE_SPRINT_PLANNING_MEETING_FAILURE,
    DELETE_SPRINT_PLANNING_MEETING_START,
    DELETE_SPRINT_PLANNING_MEETING_SUCCESS,
    FINISH_SPRINT_PLANNING_MEETING_FAILURE,
    FINISH_SPRINT_PLANNING_MEETING_START,
    FINISH_SPRINT_PLANNING_MEETING_SUCCESS,
    GET_SPRINT_PLANNING_MEETING_FAILURE,
    GET_SPRINT_PLANNING_MEETING_START,
    GET_SPRINT_PLANNING_MEETING_SUCCESS,
    START_SPRINT_PLANNING_MEETING_FAILURE,
    START_SPRINT_PLANNING_MEETING_START,
    START_SPRINT_PLANNING_MEETING_SUCCESS,
} from "../actions/types/sprintPlanningMeetingTypes";

const initialState = {
    loading: false,
    error: "",
    sprintPlanningMeeting: {},
    messages: [],
    userIDs: [],
};

const sprintPlanningMeetingReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SPRINT_PLANNING_MEETING_START:
            return {
                ...state,
                loading: true,
            };
        case CREATE_SPRINT_PLANNING_MEETING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
            };
        case CREATE_SPRINT_PLANNING_MEETING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case GET_SPRINT_PLANNING_MEETING_START:
            return {
                ...state,
                loading: true,
            };
        case GET_SPRINT_PLANNING_MEETING_SUCCESS:
            return {
                ...state,
                loading: false,
                sprintPlanningMeeting: action.sprintPlanningMeeting,
                error: "",
            };
        case GET_SPRINT_PLANNING_MEETING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case START_SPRINT_PLANNING_MEETING_START:
            return {
                ...state,
                loading: true,
            };
        case START_SPRINT_PLANNING_MEETING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
            };
        case START_SPRINT_PLANNING_MEETING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case FINISH_SPRINT_PLANNING_MEETING_START:
            return {
                ...state,
                loading: true,
            };
        case FINISH_SPRINT_PLANNING_MEETING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
            };
        case FINISH_SPRINT_PLANNING_MEETING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case DELETE_SPRINT_PLANNING_MEETING_START:
            return {
                ...state,
                loading: true,
            };
        case DELETE_SPRINT_PLANNING_MEETING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: "",
            };
        case DELETE_SPRINT_PLANNING_MEETING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default sprintPlanningMeetingReducer;
