import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {
    authReducer,
    teamReducer,
    projectReducer,
    taskReducer,
    sprintReducer,
    dailyScrumMeetingReducer,
    sprintPlanningMeetingReducer,
    notificationReducer,
} from './reducers';

const rootReducer = combineReducers({
    taskReducer,
    authReducer,
    teamReducer,
    projectReducer,
    sprintReducer,
    dailyScrumMeetingReducer,
    sprintPlanningMeetingReducer,
    notificationReducer,
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
