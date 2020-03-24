import {
    GET_SINGLE_TEAM_SUCCESS,
    GET_SINGLE_TEAM_FAILURE,
    GET_ALL_TEAMS_START,
    GET_ALL_TEAMS_SUCCESS,
    GET_ALL_TEAMS_FAILURE,
    CREATE_TEAM_SUCCESS,
    CREATE_TEAM_FAILURE,
    GET_TEAM_MEMBERS_START,
    GET_TEAM_MEMBERS_SUCCESS,
    GET_TEAM_MEMBERS_FAILURE,
    GET_ALL_CREATED_TEAMS_START,
    GET_ALL_CREATED_TEAMS_SUCCESS,
    GET_ALL_CREATED_TEAMS_FAILURE,
    GET_TEAMS_FOR_HOME_START,
    GET_TEAMS_FOR_HOME_SUCCESS,
    GET_TEAMS_FOR_HOME_FAILURE,
    GET_TEAM_USERS_ID_START,
    GET_TEAM_USERS_ID_SUCCESS,
    GET_TEAM_USERS_ID_FAILURE,
} from "../actions/types/teamTypes";

const initialState = {
    team: {},
    teams: [],
    homeTeams: [],
    createdTeams: [],
    teamIDs: [],
    teamMembers: [],
    userIDs: [],
    error: "",
    loading: false,
};

const teamReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SINGLE_TEAM_SUCCESS:
            return {
                ...state,
                team: action.team,
            };
        case GET_SINGLE_TEAM_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case GET_ALL_TEAMS_START:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_TEAMS_SUCCESS:
            return {
                ...state,
                teams: action.teams,
                teamIDs: action.teamIDs,
                loading: false,
            };
        case GET_ALL_TEAMS_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_TEAMS_FOR_HOME_START:
            return {
                ...state,
                loading: true,
            };
        case GET_TEAMS_FOR_HOME_SUCCESS:
            return {
                ...state,
                homeTeams: action.teams,
                loading: false,
            };
        case GET_TEAMS_FOR_HOME_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_ALL_CREATED_TEAMS_START:
            return {
                ...state,
                loading: true,
            };
        case GET_ALL_CREATED_TEAMS_SUCCESS:
            return {
                ...state,
                createdTeams: action.createdTeams,
                loading: false,
            };
        case GET_ALL_CREATED_TEAMS_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case CREATE_TEAM_SUCCESS:
            return {
                ...state,
                teams: action.teams,
            };
        case CREATE_TEAM_FAILURE:
            return {
                ...state,
                error: action.error
            };
        case GET_TEAM_MEMBERS_START:
            return {
                ...state,
                loading: true,
            };
        case GET_TEAM_MEMBERS_SUCCESS:
            return {
                ...state,
                teamMembers: action.teamMembers,
                loading: false,
            };
        case GET_TEAM_MEMBERS_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        case GET_TEAM_USERS_ID_START:
            return {
                ...state,
                loading: true,
            };
        case GET_TEAM_USERS_ID_SUCCESS:
            return {
                ...state,
                userIDs: action.userIDs,
                loading: false,
            };
        case GET_TEAM_USERS_ID_FAILURE:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        default:
            return state;
    }
};

export default teamReducer;
