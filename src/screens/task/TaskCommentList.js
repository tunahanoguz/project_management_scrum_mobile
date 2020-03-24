import React, {useEffect} from 'react';
import {FlatList} from "react-native";
import {useDispatch, useSelector} from 'react-redux';
import {
    TopBar,
    Button,
    Loading,
    CommentCard,
} from 'components';
import {
    Container,
    DirectionContainer,
    Divider,
    Text,
    Title
} from "../../styles";
import {getAllTaskComments} from "../../actions/taskActions";

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

    const renderComments = () => {
        if (loading){
            return (
                <DirectionContainer
                    flex={1}
                    justifyCenter
                    alignCenter
                >
                    <Loading/>
                </DirectionContainer>
            );
        } else {
            if (error.length !== 0){
                return (
                    <DirectionContainer
                        flex={1}
                        justifyCenter
                        alignCenter
                    >
                        <Text medium>{error}</Text>
                    </DirectionContainer>
                );
            } else {
                return (
                    <FlatList
                        data={comments}
                        renderItem={({item}) => !item.parentCommentID && (
                            <CommentCard
                                comment={item}
                                itemID={taskID}
                                type='task'
                            />
                        )}
                    />
                );
            }
        }
    };

    return (
        <Container>
            <TopBar isBack={true}/>

            <Container space>
                <Title>Yorumlar</Title>

                <Divider height={20}/>

                <Container flex={0.8}>
                    {renderComments()}
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
