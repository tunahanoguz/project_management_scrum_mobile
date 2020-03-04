import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import TopBar from "../../components/TopBar";
import {Container, Divider, Title} from "../../styles";
import {getAllTaskComments} from "../../actions/taskActions";
import Button from "../../components/buttons/Button";
import List from "../../components/list/List";

const TaskCommentList = ({navigation}) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.taskReducer.loading);
    const error = useSelector(state => state.taskReducer.error);
    const comments = useSelector(state => state.taskReducer.comments);

    const taskID = navigation.getParam('taskID', "");

    useEffect(() => {
        dispatch(getAllTaskComments(taskID));
    }, []);

    const goToCommentList = () => {
        navigation.navigate('CreateTaskComment', {taskID});
    };

    return (
        <Container>
            <TopBar isBack={true}/>

            <Container space>
                <Title>Yorumlar</Title>

                <Divider height={20}/>

                <Container flex={0.8}>
                    <List
                        loading={loading}
                        error={error}
                        data={comments}
                        type='comment'
                        orderColor='orange'
                        isFunctioned={false}
                        modalFunc={() => alert("asdasdasd")}
                    />
                </Container>

                <Container flex={0.2} verticalMiddle>
                    <Button
                        color='purple'
                        text="💬 YENİ YORUM GÖNDER"
                        action={goToCommentList}
                    />
                </Container>

            </Container>
        </Container>
    );
};

export default TaskCommentList;
