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
import MyProfile from "./src/screens/auth/MyProfile";
import ChangePasswordFirstScreen from "./src/screens/auth/ChangePasswordFirstScreen";
import ChangePasswordSecondScreen from "./src/screens/auth/ChangePasswordSecondScreen";
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
import ProjectSendComment from "./src/screens/project/ProjectSendComment";
import CreateTask from "./src/screens/task/CreateTask";
import CreateSprint from "./src/screens/sprint/CreateSprint";
import SprintList from "./src/screens/sprint/SprintList";
import EditSprint from "./src/screens/sprint/EditSprint";
import SprintDetail from "./src/screens/sprint/SprintDetail";
import TeamProjectsList from "./src/screens/team/TeamProjectsList";
import ProjectTaskList from "./src/screens/task/ProjectTaskList";
import TaskList from "./src/screens/task/TaskList";
import CreateTaskComment from "./src/screens/task/CreateTaskComment";
import TaskCommentList from "./src/screens/task/TaskCommentList";
import TaskCommentDetail from "./src/screens/task/TaskCommentDetail";
import TaskCommentReply from "./src/screens/task/TaskCommentReply";
import ProjectCommentDetail from "./src/screens/project/ProjectCommentDetail";
import CreateProjectComment from "./src/screens/project/CreateProjectComment";
import ProjectCommentReply from "./src/screens/project/ProjectCommentReply";
import CreateTaskFile from "./src/screens/task/CreateTaskFile";
import TaskFileList from "./src/screens/task/TaskFileList";
import StartTask from "./src/screens/task/StartTask";
import TeamDescription from "./src/screens/team/TeamDescription";
import StartSprint from "./src/screens/sprint/StartSprint";
import DailyScrumMeeting from "./src/screens/sprint/DailyScrumMeeting";
import NotificationList from "./src/screens/notification/NotificationList";

const stackNavigator = createStackNavigator(
    {
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
        initialRouteName: 'Home',
        headerMode: 'none',
    }
);

// stackNavigator.navigationOptions = ({navigation}) => {
//     let tabBarVisible = true;
//     if (navigation.state.index === 0){
//         tabBarVisible = false;
//     }
//
//     return {tabBarVisible};
// };

const teamNavigator = createStackNavigator(
    {
        TeamList: TeamList,
        TeamDetail: TeamDetail,
        TeamDescription: TeamDescription,
        TeamMembers: TeamMembers,
        TeamProjectsList: TeamProjectsList,
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
        CreateProjectComment: CreateProjectComment,
        ProjectCommentList: ProjectCommentList,
        ProjectCommentDetail: ProjectCommentDetail,
        ProjectCommentReply: ProjectCommentReply,
        ProjectFileList: ProjectFileList,
        ProjectFileUpload: ProjectFileUpload,
        ProjectAllTasks: ProjectAllTasks,
        ProjectTaskList: ProjectTaskList,
        TaskList: TaskList,
        CreateTask: CreateTask,
        StartTask: StartTask,
        CreateTaskFile: CreateTaskFile,
        TaskDetail: TaskDetail,
        EditTask: EditTask,
        TaskFileList: TaskFileList,
        TaskCommentList: TaskCommentList,
        CreateTaskComment: CreateTaskComment,
        TaskCommentDetail: TaskCommentDetail,
        TaskCommentReply: TaskCommentReply,
        ProjectSendComment: ProjectSendComment,
        CreateSprint: CreateSprint,
        SprintList: SprintList,
        EditSprint: EditSprint,
        SprintDetail: SprintDetail,
        StartSprint: StartSprint,
        DailyScrumMeeting,
    },
    {
        initialRouteName: 'ProjectList',
        headerMode: 'none',
    }
);

const notificationNavigator = createStackNavigator(
    {
        NotificationList,
    },
    {
        initialRouteName: 'NotificationList',
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
        Notification: {
            screen: notificationNavigator,
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

export default createAppContainer(bottomBarNavigator);
