import {
    GET_ALL_SPRINTS_FAILURE,
    GET_ALL_SPRINTS_START,
    GET_ALL_SPRINTS_SUCCESS, GET_SINGLE_SPRINT_FAILURE, GET_SINGLE_SPRINT_START, GET_SINGLE_SPRINT_SUCCESS,
    GET_SPRINTS_FOR_HOME_FAILURE,
    GET_SPRINTS_FOR_HOME_START,
    GET_SPRINTS_FOR_HOME_SUCCESS, GET_SPRINTS_FOR_PROJECT_FAILURE,
    GET_SPRINTS_FOR_PROJECT_START,
    GET_SPRINTS_FOR_PROJECT_SUCCESS
} from "../actions/types";

const initialState = {
    sprints: [],
    homeSprints: [],
    sprint: {},
    loading: false,
    error: "",
};

const sprintReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_SPRINTS_START:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_SPRINTS_SUCCESS:
            return {
                ...state,
                sprints: action.sprints,
                loading: false,
            };
        case GET_ALL_SPRINTS_FAILURE:
            return {
                ...state,
                sprints: [],
                error: action.error,
                loading: false,
            };
        case GET_SPRINTS_FOR_PROJECT_START:
            return {
                ...state,
                loading: true,
            };
        case GET_SPRINTS_FOR_PROJECT_SUCCESS:
            return {
                ...state,
                sprints: action.sprints,
                loading: false,
            };
        case GET_SPRINTS_FOR_PROJECT_FAILURE:
            return {
                ...state,
                sprints: [],
                error: action.error,
                loading: false,
            };
        case GET_SPRINTS_FOR_HOME_START:
            return {
                ...state,
                loading: true,
            };
        case GET_SPRINTS_FOR_HOME_SUCCESS:
            return {
                ...state,
                homeSprints: action.sprints,
                loading: false,
            };
        case GET_SPRINTS_FOR_HOME_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_SINGLE_SPRINT_START:
            return {
                ...state,
                loading: true,
            };
        case GET_SINGLE_SPRINT_SUCCESS:
            return {
                ...state,
                sprint: action.sprint,
                loading: false,
            };
        case GET_SINGLE_SPRINT_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        default:
            return state;
    }
};

export default sprintReducer;