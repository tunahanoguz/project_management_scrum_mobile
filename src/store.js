import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {
    authReducer,
    teamReducer,
    projectReducer,
    taskReducer,
    sprintReducer,
    dailyScrumMeetingReducer,
    notificationReducer,
} from './reducers';

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
