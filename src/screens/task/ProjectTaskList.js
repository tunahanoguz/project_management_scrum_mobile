import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {withNavigation} from 'react-navigation';
import {getAllProjectTasks} from "../../actions/taskActions";
import {
    TopBar,
    List,
    Button,
} from 'components';
import {Container, Divider, Title} from "../../styles";

const ProjectTaskList = ({navigation}) => {
    const projectID = navigation.getParam('projectID', "");
    const dispatch = useDispatch();
    const loading = useSelector(state => state.taskReducer.loading);
    const error = useSelector(state => state.taskReducer.error);
    const tasks = useSelector(state => state.taskReducer.tasks);

    useEffect(() => {
        dispatch(getAllProjectTasks(projectID));
    }, []);

    const goToCreateTask = () => {
        navigation.navigate('CreateTask', {projectID});
    };

    const renderTaskList = () => {
        return (
            <List
                loading={loading}
                error={error}
                data={tasks}
                orderColor='orange'
                type='task'
                isFunctioned={false}
            />
        );
    };

    return (
        <Container>
            <TopBar isBack={true} />

            <Container space>
                <Title>İşler</Title>

                <Divider height={10} />

                <Container flex={0.8}>
                    {renderTaskList()}
                </Container>

                <Container flex={0.2} verticalMiddle>
                    <Button
                        action={goToCreateTask}
                        color='purple'
                        text="💪 Yeni İş Oluştur"
                    />
                </Container>
            </Container>
        </Container>
    );
};

export default withNavigation(ProjectTaskList);
