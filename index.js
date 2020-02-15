import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import * as firebase from 'firebase';
import configureStore from "./src/store";
import {Provider} from "react-redux";
import React from "react";

firebase.initializeApp({
    apiKey: "AIzaSyBRbT3OgGpMKPM3IiFsMn8QW3F4AFBLOD4",
    authDomain: "scrum-project-management.firebaseapp.com",
    databaseURL: "https://scrum-project-management.firebaseio.com",
    projectId: "scrum-project-management",
    storageBucket: "scrum-project-management.appspot.com",
    messagingSenderId: "994800323007",
    appId: "1:994800323007:web:8082618567e3abe152b90a",
    measurementId: "G-0HF89MS4L9"
});

const store = configureStore();
const redux = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

AppRegistry.registerComponent(appName, () => redux);
