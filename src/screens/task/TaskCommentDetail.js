import React, {useEffect} from 'react';
import {FlatList} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {
    TopBar,
    CommentCard,
} from 'components';
import {
    Container,
    Divider,
    Text,
    Title
} from "../../styles";
import {getTaskReplyComments} from "../../actions/taskActions";

const TaskCommentDetail = ({navigation}) => {
    const commentParam = navigation.getParam('comment', {});
    const taskID = navigation.getParam('itemID', "");
    const {id} = commentParam;

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

                {replyComments !== [] ? (
                        <FlatList
                            data={replyComments}
                            renderItem={({item}) => (
                                <CommentCard
                                    comment={item}
                                    itemID={taskID}
                                    type='project'
                                />
                            )}/>) :
                    <Text medium>Hiç cevap yok.</Text>}
            </Container>
        </Container>
    );
};

export default TaskCommentDetail;
