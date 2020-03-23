import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import taskReducer from "./reducers/taskReducer";
import authReducer from "./reducers/authReducer";
import teamReducer from "./reducers/teamReducer";
import projectReducer from "./reducers/projectReducer";
import sprintReducer from "./reducers/sprintReducer";
import dailyScrumMeetingReducer from "./reducers/dailyScrumMeetingReducer";
import notificationReducer from "./reducers/notificationReducer";

const rootReducer = combineReducers({
    taskReducer,
    authReducer,
    teamReducer,
    projectReducer,
    sprintReducer,
    dailyScrumMeetingReducer,
    notificationReducer,
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
