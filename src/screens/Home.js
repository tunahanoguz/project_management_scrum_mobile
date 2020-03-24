import React, {
    Fragment,
    useState,
    useEffect,
} from 'react';
import {
    Text,
    Animated,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {withNavigation} from 'react-navigation';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Icon from "react-native-vector-icons/Feather";
import styled, {css} from 'styled-components';
import SplashScreen from 'react-native-splash-screen';
import auth from "@react-native-firebase/auth";
import {
    TopBar,
    Divider,
    List,
} from 'components';
import {Container} from "../styles";

import {getTasksForHome} from "actions/taskActions";
import {getAllTeams, getTeamsForHomeScreen} from "../actions/teamActions";
import {getAllProjects, getProjectsForHomeScreen} from "../actions/projectActions";
import {getSprintsForHomeScreen} from "../actions/sprintActions";
import {getUser} from "../actions/authActions";


const Home = (props) => {
    const [isOpenAbsoluteButtons, setIsOpenAbsoluteButtons] = useState(false);
    const [animatedValueFirst, setAnimatedValueFirst] = useState(new Animated.Value(0));
    const [animatedValueSecond, setAnimatedValueSecond] = useState(new Animated.Value(0));
    const [animatedValueThird, setAnimatedValueThird] = useState(new Animated.Value(0));
    const [teamIDsValue, setTeamIDsValue] = useState([]);
    const [projectIDsValue, setProjectIDsValue] = useState([]);
    const [selectedTab, setSelectedTab] = useState(0);

    const dispatch = useDispatch();

    const authState = useSelector(state => state.authReducer.authState);
    const user = useSelector(state => state.authReducer.user);

    const teamIDs = useSelector(state => state.teamReducer.teamIDs);
    const projectIDs = useSelector(state => state.projectReducer.projectIDs);

    const projectLoading = useSelector(state => state.projectReducer.loading);
    const projectError = useSelector(state => state.projectReducer.error);
    const homeProjects = useSelector(state => state.projectReducer.homeProjects);

    const teamLoading = useSelector(state => state.teamReducer.loading);
    const teamError = useSelector(state => state.teamReducer.error);
    const homeTeams = useSelector(state => state.teamReducer.homeTeams);

    const sprintLoading = useSelector(state => state.sprintReducer.loading);
    const sprintError = useSelector(state => state.sprintReducer.error);
    const homeSprints = useSelector(state => state.sprintReducer.homeSprints);

    const taskLoading = useSelector(state => state.taskReducer.loading);
    const taskError = useSelector(state => state.taskReducer.error);
    const homeTasks = useSelector(state => state.taskReducer.homeTasks);

    useEffect(() => {
        dispatch(getUser());
        changeNavigationBarColor('#281C9D');
    }, []);

    useEffect(() => {
        auth().onAuthStateChanged(function (user) {
            if (user) {
                SplashScreen.hide();
                dispatch(getAllTeams(user.uid));
            } else {
                props.navigation.navigate('Login');
                SplashScreen.hide();
            }
        });
    }, [authState]);

    useEffect(() => {
        setTeamIDsValue(teamIDs);
        setProjectIDsValue(projectIDs);
    });

    useEffect(() => {
        if (teamIDs.length !== 0) {
            dispatch(getProjectsForHomeScreen(teamIDs));
            dispatch(getAllProjects(teamIDs));
        }
    }, [teamIDsValue]);

    const absoluteButtonStyle = (color) => {
        return {
            ...styles.absoluteButton,
            backgroundColor: color,
        };
    };

    const absoluteButtonsAnimate = () => {
        setIsOpenAbsoluteButtons(value => !value);
        const toValueFirst = isOpenAbsoluteButtons ? 0 : -60;
        const toValueSecond = isOpenAbsoluteButtons ? 0 : -120;
        const toValueThird = isOpenAbsoluteButtons ? 0 : -180;

        Animated.parallel([
            Animated.timing(animatedValueFirst, {
                toValue: toValueFirst,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValueSecond, {
                toValue: toValueSecond,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValueThird, {
                toValue: toValueThird,
                duration: 1000,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    const goToScreen = (screenName) => {
        return props.navigation.navigate(screenName);
    };

    const tabButtonAction = (order) => {
        setSelectedTab(order);

        if (order === 1){
            dispatch(getTeamsForHomeScreen(user.uid));
        } else if (order === 2){
            dispatch(getSprintsForHomeScreen(projectIDs));
        } else if (order === 3){
            dispatch(getTasksForHome(projectIDs));
        }
    };

    const renderTabItem = (icon, name, order) => {
        return (
            <Tab selected={order === selectedTab} onPress={() => tabButtonAction(order)}>
                <Text style={{fontSize: 16,}}>{icon}</Text>
                <Divider height={6}/>
                <TabText selected={order === selectedTab}>{name}</TabText>
            </Tab>
        );
    };

    // const renderTitle = (title) => {
    //     const titleLength = title.length;
    //     if (titleLength > 20) {
    //         return title.substring(0, 20) + "...";
    //     } else {
    //         return title;
    //     }
    // };
    //
    // const renderDate = (date) => {
    //     moment.locale('tr-TR');
    //     return moment(date).format('LLL');
    // };

    const renderProjectList = () => {
        return (
            <List
                loading={projectLoading}
                error={projectError}
                data={homeProjects}
                type='project'
                orderColor='orangered'
                isFunctioned={false}
            />
        );
    };

    const renderTeamList = () => {
        return (
            <List
                loading={teamLoading}
                error={teamError}
                data={homeTeams}
                type='team'
                orderColor='teal'
                isFunctioned={false}
            />
        );
    };

    const renderSprintList = () => {
        return (
            <List
                loading={sprintLoading}
                error={sprintError}
                data={homeSprints}
                type='sprint'
                orderColor='indigo'
                isFunctioned={false}
            />
        );
    };

    const renderTaskList = () => {
        return (
            <List
                loading={taskLoading}
                error={taskError}
                data={homeTasks}
                type='task'
                orderColor='midnightblue'
                isFunctioned={false}
            />
        );
    };

    const renderLists = () => {
        if (selectedTab === 0){
            return renderProjectList();
        } else if (selectedTab === 1){
            return renderTeamList();
        } else if (selectedTab === 2){
            return renderSprintList();
        } else {
            return renderTaskList();
        }
    };

    const authenticatedHome = () => {
        return (
            <Fragment>
                <TopBar
                    isBack={false}
                    title="Anasayfa"
                    profilePhoto={user.photoURL}
                />

                <HelloContainer>
                    <HelloText large>Merhaba,</HelloText>
                    <HelloText normal>{user.displayName}</HelloText>
                </HelloContainer>

                <Container space>
                    <TabContainer>
                        {renderTabItem('💼', 'Proje', 0)}
                        {renderTabItem('🤝', 'Takım', 1)}
                        {renderTabItem('🏃', 'Sprint', 2)}
                        {renderTabItem('💪', 'İş', 3)}
                    </TabContainer>

                    <Container flex={0.8}>
                        {renderLists()}
                    </Container>
                </Container>

                <AnimatedTouchable
                    style={[absoluteButtonStyle('orangered'), {
                    bottom: 10,
                    transform: [{translateY: animatedValueFirst}],
                    alignSelf: 'flex-end'
                }]}
                    activeOpacity={0.6}
                    onPress={() => goToScreen('CreateProject')}
                >
                    <Icon
                        name='briefcase'
                        size={24}
                        color='white'
                    />
                </AnimatedTouchable>

                <AnimatedTouchable
                    style={[absoluteButtonStyle('mediumseagreen'), {
                    bottom: 10,
                    transform: [{translateY: animatedValueSecond}]
                }]}
                    activeOpacity={0.6}
                    onPress={() => goToScreen('CreateTeam')}>
                    <Icon
                        name='users'
                        size={20}
                        color='white'
                    />
                </AnimatedTouchable>

                <TouchableOpacity
                    style={[absoluteButtonStyle('indigo'), {bottom: 10,}]}
                    activeOpacity={0.6}
                    onPress={() => absoluteButtonsAnimate()}
                >
                    <Icon
                        name='plus'
                        size={24}
                        color='white'
                    />
                </TouchableOpacity>
            </Fragment>
        );
    };

    return (
        authenticatedHome()
    );
};

const HelloContainer = styled.View`
    padding: 30px 0 0 30px;
`;

const HelloText = styled.Text`
    font-family: Poppins-Medium;
    font-size: 24px;
    color: #282D41;
    ${({large}) => large && css`
        font-size: 32px;
    `};
    ${({normal}) => normal && css`
        font-family: Poppins-Regular;
    `};
`;

const TabContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin: 0 -10px 30px 0;
`;

const Tab = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    padding-vertical: 15px;
    border-radius: 15px;
    border-width: 2px;
    border-style: dashed;
    border-color: #E6E8EE;
    ${({selected}) => selected && css`
        background-color: white;
        border-style: solid;
        border-color: white;
    `}
`;

const TabText = styled.Text`
    font-family: Poppins-Medium;
    font-size: 14px;
    color: #8A929B;
    ${({selected}) => selected && css`
        color: #282D41;
    `}
`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#F3F5FA',
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24
    },
    highPriorityDot: {
        width: 8,
        height: 8,
        backgroundColor: 'green',
        borderRadius: 100,
        marginRight: 8,
    },
    taskTitle: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        marginTop: 2
    },
    space: {
        height: 20,
    },
    absoluteButton: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 10,
        borderRadius: 100,
    },
});

export default withNavigation(Home);
