import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import {
    TopBar,
    CommentCard,
    Button,
} from 'components';
import {
    Container,
    Divider,
    InnerContainer,
    Title
} from "../../styles";
import {createTaskComment} from "../../actions/taskActions";

const TaskCommentReply = ({navigation}) => {
    const commentParam = navigation.getParam('comment', {});
    const taskID = navigation.getParam('taskID', "");

    const {id} = commentParam;

    const [commentBody, setCommentBody] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);

    const sendReply = () => {
        dispatch(createTaskComment(commentBody, id, taskID, user.uid));
        navigation.navigate('TaskCommentDetail', {comment: commentParam, taskID});
    };

    return (
        <Container>
            <TopBar isBack={true} />

            <Container space>
                <Title>Yorumu Cevapla</Title>

                <Divider height={10} />

                <CommentCard comment={commentParam} />

                <Divider height={30} />

                <InnerContainer>
                    <TextInput
                        placeholder="Cevabınızı buraya giriniz"
                        value={commentBody}
                        onChangeText={text => setCommentBody(text)}
                        multiline={true}
                    />
                </InnerContainer>

                <Divider height={30}/>

                <Button
                    color='purple'
                    text="💬 CEVABI GÖNDER"
                    action={sendReply}
                />
            </Container>
        </Container>
    );
};

export default TaskCommentReply;
