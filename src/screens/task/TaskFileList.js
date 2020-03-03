import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllTaskFiles} from "../../actions/taskActions";
import List from "../../components/list/List";
import TopBar from "../../components/TopBar";
import {Container} from "../../styles";

const TaskFileList = ({navigation}) => {
    const taskID = navigation.getParam('taskID', "");

    const dispatch = useDispatch();
    const loading = useSelector(state => state.taskReducer.loading);
    const error = useSelector(state => state.taskReducer.error);
    const files = useSelector(state => state.taskReducer.files);

    useEffect(() => {
        dispatch(getAllTaskFiles(taskID));
    }, []);

    const fileList = () => {
        return (
            <List loading={loading} error={error} data={files} orderColor='orange' isFunctioned={true} modalFunc={() => alert("asdasdasd")} type='file' />
        );
    };

    return (
        <Container>
            <TopBar isBack={true} />

            <Container space>
                {fileList()}
            </Container>
        </Container>
    );
};

export default TaskFileList;
