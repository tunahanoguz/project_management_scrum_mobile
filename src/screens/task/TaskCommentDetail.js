import React, {useState, useEffect} from 'react';
import {FlatList} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import TopBar from "../../components/TopBar";
import {Container, Divider, Text, Title} from "../../styles";
import CommentCard from "../../components/cards/CommentCard";
import {getTaskReplyComments} from "../../actions/taskActions";

const TaskCommentDetail = ({navigation}) => {
    const commentParam = navigation.getParam('comment', {});
    const taskID = navigation.getParam('taskID', "");
    const {id, comment, createdAt} = commentParam;

    const dispatch = useDispatch();
    const replyComments = useSelector(state => state.taskReducer.replyComments);

    useEffect(() => {
        dispatch(getTaskReplyComments(id));
    }, []);

    return (
        <Container>
            <TopBar isBack={true}/>

            <Container space>
                <Title>Yorum</Title>

                <Divider height={10}/>

                <CommentCard
                    comment={commentParam}
                    itemID={taskID}
                    type='task'
                />

                <Divider height={10}/>

                <Title>Cevaplar</Title>

                <Divider height={10}/>

                <FlatList
                    data={replyComments}
                    renderItem={({item}) => <CommentCard comment={item} itemID={taskID} type='task'/>}
                />
            </Container>
        </Container>
    );
};

export default TaskCommentDetail;
