import React, {Fragment, useState, useEffect} from 'react';
import {FlatList} from 'react-native';
// import PropTypes from 'prop-types';
import {useSelector, useDispatch} from "react-redux";
import TopBar from "../../components/TopBar";
import {Container, Divider, Title} from "../../styles";
import DoubleButton from "../../components/buttons/DoubleButton";
import {getAllProjectTasks} from "../../actions/taskActions";
import TaskCard from "../../components/cards/TaskCard";

const TaskList = ({navigation}) => {
    const [type, setType] = useState(0);
    const [tasksArray, setTasksArray] = useState([]);
    const projectID = navigation.getParam('projectID', "");
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.taskReducer.tasks);
    const user = useSelector(state => state.authReducer.user);

    useEffect(() => {
        dispatch(getAllProjectTasks(projectID));
        const tasksValue = tasks.filter(task => task.createdBy === user.uid);
        setTasksArray(tasksValue);
    }, []);

    const myTasksAction = () => {
        setType(0);
        const tasksValue = tasks.filter(task => task.createdBy === user.uid);
        setTasksArray(tasksValue);
    };

    const otherTasksAction = () => {
        setType(1);
        setTasksArray(tasks);
    };

    const renderMyTasks = () => {
        return (
            <Fragment>
                <Title>Benim İşlerim</Title>
                <Divider height={10}/>
                <FlatList data={tasksArray} renderItem={({item}) => <TaskCard task={item} />} keyExtractor={(item, index) => index.toString()} />
            </Fragment>
        );
    };

    const renderOtherTasks = () => {
        return (
            <Fragment>
                <Title>Diğer İşler</Title>
                <Divider height={10}/>
                <FlatList data={tasksArray} renderItem={({item}) => <TaskCard task={item} />} keyExtractor={(item, index) => index.toString()} />
            </Fragment>
        );
    };

    return (
        <Container>
            <TopBar isBack={true} />

            <Container space>
                <DoubleButton firstText="BENİM İŞLERİM" firstColor='orange' firstAction={() => myTasksAction()} secondText="DİĞER İŞLER" secondColor='purple' secondAction={() => otherTasksAction()}/>
                <Divider height={30}/>

                {type === 0 ? renderMyTasks() : renderOtherTasks()}
            </Container>
        </Container>
    );
};

// TaskList.propTypes = {
//     type: PropTypes.string.isRequired,
// };

export default TaskList;
