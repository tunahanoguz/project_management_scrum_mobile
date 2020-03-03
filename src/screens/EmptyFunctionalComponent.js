import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {withNavigation} from 'react-navigation';

const EmptyFunctionalComponent = ({navigation}) => {
    const projectID = navigation.getParam('projectID', "");
    const dispatch = useDispatch();
    const loading = useSelector(state => state.taskReducer.loading);
    const error = useSelector(state => state.taskReducer.error);
    const tasks = useSelector(state => state.taskReducer.tasks);

    useEffect(() => {
        dispatch();
    });
};

export default withNavigation(EmptyFunctionalComponent);