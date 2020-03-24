import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {ProgressCircle} from "react-native-svg-charts";
import {
    TopBar,
    ProfilePicture,
} from 'components';
import {
    Container,
    DirectionContainer,
    Divider,
    InnerContainer,
    Text
} from "../../styles";
import {getUserById} from "../../actions/authActions";
import {getTasksForUser} from "../../actions/taskActions";
import {getProjectsForUser} from "../../actions/projectActions";

const UserProfile = ({navigation}) => {
    const userID = navigation.getParam('userID', "");

    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.foundUser);
    const tasks = useSelector(state => state.taskReducer.userTasks);
    const projects = useSelector(state => state.projectReducer.userProjects);

    useEffect(() => {
        dispatch(getUserById(userID));
        dispatch(getTasksForUser(userID));
        dispatch(getProjectsForUser(userID));
    }, []);

    const {fullName, email, photoURL} = user;

    const finishedTasksCount = () => {
        const finishedTasks = tasks.filter(task => task.finishDate !== null);
        return finishedTasks?.length;
    };

    const finishedProjectsCount = () => {
        const finishedProjects = projects.filter(project => project.finishDate !== null);
        return finishedProjects?.length;
    };

    const renderUserGeneralInfo = () => (
        <InnerContainer>
            <DirectionContainer row alignCenter>
                <ProfilePicture
                    size={50}
                    picture={photoURL ? photoURL : ""}
                />

                <Divider width={10} />

                <DirectionContainer>
                    <Text medium>{fullName}</Text>
                    <Text normal size={12}>{email}</Text>
                </DirectionContainer>

            </DirectionContainer>
        </InnerContainer>
    );

    const renderUserTasks = () => (
        <InnerContainer>
            <ProgressCircle
                style={{ height: 60 }}
                progress={finishedTasksCount() / tasks?.length}
                progressColor={'indigo'}
                strokeWidth={8}
            />

            <Divider height={20} />

            <DirectionContainer alignCenter>
                <Text medium size={14}>Toplamda {tasks?.length} iş üzerinde çalışmış.</Text>
                <Text medium size={14}>{finishedTasksCount()} tanesi bitmiş.</Text>
            </DirectionContainer>
        </InnerContainer>
    );

    const renderUserProjects = () => (
        <InnerContainer>
            <ProgressCircle
                style={{ height: 60 }}
                progress={finishedProjectsCount() / projects?.length}
                progressColor={'indigo'}
                strokeWidth={8}
            />

            <Divider height={20} />

            <DirectionContainer alignCenter>
                <Text medium size={14}>Toplamda {projects?.length} iş üzerinde çalışmış.</Text>
                <Text medium size={14}>{finishedProjectsCount()} tanesi bitmiş.</Text>
            </DirectionContainer>
        </InnerContainer>
    );

    return (
        <Container>
            <TopBar isBack={true}/>

            <Container space>
                {renderUserGeneralInfo()}

                <Divider height={30}/>

                {renderUserTasks()}

                <Divider height={30} />

                {renderUserProjects()}
            </Container>
        </Container>
    );
};

export default UserProfile;
