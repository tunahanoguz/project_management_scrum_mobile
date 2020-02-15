import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import taskReducer from "./reducers/TaskReducer";
import authReducer from "./reducers/authReducer";
import teamReducer from "./reducers/teamReducer";
import projectReducer from "./reducers/projectReducer";

const rootReducer = combineReducers({
    taskReducer: taskReducer,
    authReducer: authReducer,
    teamReducer: teamReducer,
    projectReducer: projectReducer,
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;