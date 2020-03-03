import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import TopBar from "../../components/TopBar";
import {Container, Divider, Title} from "../../styles";
import {getAllTaskComments} from "../../actions/taskActions";
import Button from "../../components/buttons/Button";
import {getUserById} from "../../actions/authActions";
import CommentCard from "../../components/cards/CommentCard";

const TaskCommentList = ({navigation}) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.taskReducer.loading);
    const error = useSelector(state => state.taskReducer.error);
    const comments = useSelector(state => state.taskReducer.comments);

    const taskID = navigation.getParam('taskID', "");

    useEffect(() => {
        dispatch(getAllTaskComments(taskID));
    }, []);

    useEffect(() => {
        dispatch(getUserById(comments[0].userID));
    }, [comments]);

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
                    <FlatList data={comments} renderItem={({item}) => !item.parentCommentID ? <CommentCard comment={item} itemID={taskID} type='task'/> : null}/>
                </Container>

                <Container flex={0.2} alignCenter>
                    <Button color='purple' text="💬 YENİ YORUM GÖNDER" action={goToCommentList}/>
                </Container>

            </Container>
        </Container>
    );
};

export default TaskCommentList;
