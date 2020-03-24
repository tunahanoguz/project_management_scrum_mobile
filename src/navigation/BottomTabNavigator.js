import React from "react";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/Feather";
import {
    AuthNavigator,
    TeamNavigator,
    ProjectNavigator,
    NotificationNavigator,
} from 'navigation';

const BottomTabNavigator = createMaterialBottomTabNavigator(
    {
        Home: {
            screen: AuthNavigator,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon name='home' size={22} color={tintColor}/>
                ),
            },
        },
        Team: {
            screen: TeamNavigator,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon name='users' size={22} color={tintColor}/>
                ),
            },
        },
        Project: {
            screen: ProjectNavigator,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon name='briefcase' size={22} color={tintColor}/>
                ),
            },
        },
        Notification: {
            screen: NotificationNavigator,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon name='bell' size={22} color={tintColor}/>
                ),
            },
        },
    },
    {
        activeColor: '#281C9D',
        inactiveColor: '#A9ACB7',
        labeled: false,
        barStyle: {
            backgroundColor: 'white',
            elevation: 30,
        },
    },
);

export default BottomTabNavigator;
