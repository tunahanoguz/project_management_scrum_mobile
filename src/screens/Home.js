import React, {useState, useEffect, Fragment} from 'react';
import {View, Text, FlatList, Animated, StyleSheet, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {withNavigation} from 'react-navigation';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import TopBar from "../components/TopBar";
import ProjectCard from "../components/cards/ProjectCards";
import Icon from "react-native-vector-icons/Feather";
import {colors, fonts} from "../styles";
import {getAllTasks} from "../actions/taskActions";
import {getAllTeams} from "../actions/teamActions";

const Home = (props) => {
    const [isOpenAbsoluteButtons, setIsOpenAbsoluteButtons] = useState(false);
    const [animatedValueFirst, setAnimatedValueFirst] = useState(new Animated.Value(0));
    const [animatedValueSecond, setAnimatedValueSecond] = useState(new Animated.Value(0));
    const [animatedValueThird, setAnimatedValueThird] = useState(new Animated.Value(0));
    const dispatch = useDispatch();
    const authState = useSelector(state => state.authReducer.authState);
    const user = useSelector(state => state.authReducer.user);
    const tasks = useSelector(state => state.taskReducer.tasks);

    useEffect(() => {
        changeNavigationBarColor('#3f38dd');
        dispatch(getAllTasks());
        dispatch(getAllTeams(user.uid));
    }, []);

    const projectDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor...";
    const projects = [
        {
            id: 1,
            name: 'e-commerce app design',
            description: projectDescription,
        },
        {
            id: 2,
            name: 'e-commerce app design',
            description: projectDescription,
        },
        {
            id: 3,
            name: 'e-commerce app design',
            description: projectDescription,
        },
        {
            id: 4,
            name: 'e-commerce app design',
            description: projectDescription,
        },
        {
            id: 5,
            name: 'e-commerce app design',
            description: projectDescription,
        },
    ];

    const projectContainer = () => (
        <View style={{marginRight: -30}}>
            <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={projects}
                keyExtractor={item => item.id.toString()}
                renderItem={({item, index}) => {
                    let color = "#FFB129";
                    if (index % 2 !== 0) {
                        color = "#024630";
                    }

                    return <ProjectCard key={item.id} id={item.id} name={item.name} description={item.description}
                                        color={color}/>;
                }}/>
        </View>
    );

    const priorityValues = (priority) => {
        if (priority === 1) {
            return [colors.highPriorityDark, colors.highPriorityLight, 'arrow-up'];
        } else if (priority === 2) {
            return [colors.mediumPriorityDark, colors.mediumPriorityLight, 'arrow-right'];
        } else {
            return [colors.lowPriorityDark, colors.lowPriorityLight, 'arrow-down'];
        }
    };

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

    const goToTaskDetail = (task) => {
        props.navigation.navigate('TaskDetail', {task});
    };

    const jobsContainer = () => (
        tasks.slice(0, 3).map(task => {
            const colors = priorityValues(task.priority);
            const title = () => {
                const title = task.title;
                const titleLength = title.length;

                if (titleLength > 28){
                    return title.substring(0, 30) + "...";
                } else {
                    return title;
                }
            };

            return (
                <TouchableOpacity key={task.id} style={{
                    ...styles.taskContainer,
                    // borderLeftWidth: 10,
                    // borderLeftColor: priorityDotColor(task.priority)
                }} onPress={() => goToTaskDetail(task)}>
                    <View style={{width: 50, height: 50, justifyContent: 'center', alignItems: 'center', backgroundColor: colors[0], marginRight: 10, borderRadius: 20}}>
                        <Icon name={colors[2]} size={20} color='rgba(255, 255, 255, 0.8)' />
                    </View>
                    <View>
                        <View style={styles.taskTitleContainer}>
                            <Text style={styles.taskTitle}>{title()}</Text>
                        </View>
                        <View style={styles.dateContainer}>
                            <Icon name='calendar' size={16} style={styles.dateIcon}/>
                            <Text style={styles.dateText}>{task.goalFinishDate}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        })
    );

    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

    const goToScreen = (screenName) => {
        return props.navigation.navigate(screenName);
    };

    const goToLogin = () => {
        return props.navigation.navigate('Login');
    };

    const authenticatedHome = () => {
        return (
            <Fragment>
                <TopBar isBack={false} title="Anasayfa" profilePhoto={user.photoURL}/>
                <View style={styles.container}>
                    <Text style={fonts.title}>Son Projeler</Text>
                    {projectContainer()}
                    <View style={styles.space}/>
                    <Text style={fonts.title}>Yaklaşan İşler</Text>
                    {jobsContainer()}
                </View>

                <AnimatedTouchable style={[absoluteButtonStyle(colors.orange), {bottom: 10, transform: [{translateY: animatedValueFirst}], alignSelf: 'flex-end'}]}
                                   activeOpacity={0.6}
                                   onPress={() => goToScreen('CreateProject')}>
                    <Icon name='briefcase' size={24} color='white'/>
                </AnimatedTouchable>
                <AnimatedTouchable style={[absoluteButtonStyle(colors.darkGreen), {bottom: 10, transform: [{translateY: animatedValueSecond}]}]}
                                   activeOpacity={0.6}
                                   onPress={() => goToScreen('CreateTeam')}>
                    <Icon name='users' size={20} color='white'/>
                </AnimatedTouchable>
                <AnimatedTouchable style={[absoluteButtonStyle(colors.yellow), {bottom: 10, transform: [{translateY: animatedValueThird}]}]}
                                   activeOpacity={0.6} onPress={() => alert("asd")}>
                    <Icon name='plus' size={24} color='white'/>
                </AnimatedTouchable>
                <TouchableOpacity style={[absoluteButtonStyle(colors.purple), {bottom: 10,}]} activeOpacity={0.6}
                                  onPress={() => absoluteButtonsAnimate()}>
                    <Icon name='plus' size={24} color={colors.orange}/>
                </TouchableOpacity>
            </Fragment>
        );
    };

    return (
        authState ? authenticatedHome() : goToLogin()
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.05)',
        marginBottom: 10,
        paddingVertical: 10,
        // paddingHorizontal: 10,
        borderRadius: 5,
    },
    taskTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 2
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
    dateContainer: {
        flexDirection: 'row',
        marginTop: 4,
    },
    dateIcon: {
        marginRight: 4,
    },
    dateText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        marginTop: -1,
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
