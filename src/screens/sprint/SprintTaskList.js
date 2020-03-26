import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getSprintTasks} from "../../actions/sprintActions";
import {Container} from "../../styles";
import {List, TopBar} from "../../components";

const SprintTaskList = ({navigation}) => {
    const sprintID = navigation.getParam('sprintID');

    const dispatch = useDispatch();
    const loading = useSelector(state => state.sprintReducer.loading);
    const error = useSelector(state => state.sprintReducer.error);
    const tasks = useSelector(state => state.sprintReducer.tasks);

    useEffect(() => {
        dispatch(getSprintTasks(sprintID));
    }, []);

    return (
        <Container>
            <TopBar isBack={true}/>

            <Container space flex={0.95}>
                <List
                    loading={loading}
                    error={error}
                    data={tasks}
                    type='task'
                    orderColor='orangered'
                    isFunctioned={false}
                />
            </Container>
        </Container>
    );
};

export default SprintTaskList;
