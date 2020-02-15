import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from "react-navigation-stack";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/Feather';
import Home from "./src/screens/Home";
import Login from "./src/screens/auth/Login";
import Register from "./src/screens/auth/Register";
import ProjectDetail from "./src/screens/project/ProjectDetail";
import ProjectNotes from "./src/screens/project/ProjectNotes";
import ProjectDescription from "./src/screens/project/ProjectDescription";
import ProjectMyTasks from "./src/screens/project/ProjectMyTasks";
import ProjectOtherTasks from "./src/screens/project/ProjectOtherTasks";
import MyProfile from "./src/screens/auth/MyProfile";
import ChangePasswordFirstScreen from "./src/screens/auth/ChangePasswordFirstScreen";
import ChangePasswordSecondScreen from "./src/screens/auth/ChangePasswordSecondScreen";
import SplashScreen from "./src/screens/SplashScreen";
import ProjectAllTasks from "./src/screens/project/ProjectAllTasks";
import EditProfile from "./src/screens/auth/EditProfile";
import TeamList from "./src/screens/team/TeamList";
import TeamDetail from "./src/screens/team/TeamDetail";
import TeamMembers from "./src/screens/team/TeamMembers";
import CreateTeam from "./src/screens/team/CreateTeam";
import UserProfile from "./src/screens/auth/UserProfile";
import CreateProject from "./src/screens/project/CreateProject";
import TaskDetail from "./src/screens/task/TaskDetail";
import EditTask from "./src/screens/task/EditTask";
import ForgotPassword from "./src/screens/auth/ForgotPassword";
import ProjectList from "./src/screens/project/ProjectList";
import ProjectCommentList from "./src/screens/project/ProjectCommentList";
import ProjectFileList from "./src/screens/project/ProjectFileList";
import ProjectFileUpload from "./src/screens/project/ProjectFileUpload";

const stackNavigator = createStackNavigator(
    {
        SplashScreen: {screen: SplashScreen},
        Home: {screen: Home},
        Register: {screen: Register},
        Login: {screen: Login},
        MyProfile: MyProfile,
        ChangePasswordFirstScreen: ChangePasswordFirstScreen,
        ChangePasswordSecondScreen: ChangePasswordSecondScreen,
        ForgotPassword: ForgotPassword,
        EditProfile: EditProfile,
    },
    {
        initialRouteName: 'SplashScreen',
        headerMode: 'none',
    }
);

stackNavigator.navigationOptions = ({navigation}) => {
    let tabBarVisible = true;
    if (navigation.state.index === 0){
        tabBarVisible = false;
    }

    return {tabBarVisible};
};

const teamNavigator = createStackNavigator(
    {
        TeamList: TeamList,
        TeamDetail: TeamDetail,
        TeamMembers: TeamMembers,
        CreateTeam: CreateTeam,
        UserProfile: UserProfile,
    },
    {
        initialRouteName: 'TeamList',
        headerMode: 'none',
    }
);

const projectNavigator = createStackNavigator(
    {
        ProjectList: ProjectList,
        CreateProject: CreateProject,
        ProjectDetail: {screen: ProjectDetail},
        ProjectDescription: {screen: ProjectDescription},
        ProjectNotes: {screen: ProjectNotes},
        ProjectMyTasks: ProjectMyTasks,
        ProjectOtherTasks: ProjectOtherTasks,
        ProjectCommentList: ProjectCommentList,
        ProjectFileList: ProjectFileList,
        ProjectFileUpload: ProjectFileUpload,
        ProjectAllTasks: ProjectAllTasks,
        TaskDetail: TaskDetail,
        EditTask: EditTask,
    },
    {
        initialRouteName: 'ProjectList',
        headerMode: 'none',
    }
);

const bottomBarNavigator = createMaterialBottomTabNavigator(
    {
        Home: {
            screen: stackNavigator,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon name='home' size={22} color={tintColor}/>
                ),
            },
        },
        Team: {
            screen: teamNavigator,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon name='users' size={22} color={tintColor}/>
                ),
            },
        },
        Project: {
            screen: projectNavigator,
            navigationOptions: {
                tabBarIcon: ({tintColor}) => (
                    <Icon name='briefcase' size={22} color={tintColor}/>
                ),
            },
        },
    },
    {
        activeColor: 'white',
        labeled: false,
        barStyle: {
            backgroundColor: '#060518',
        },
    },
);

export default createAppContainer(bottomBarNavigator);
