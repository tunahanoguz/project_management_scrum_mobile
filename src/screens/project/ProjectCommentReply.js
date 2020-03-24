import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import TopBar from "../../components/TopBar";
import {Container, Divider, InnerContainer, Title} from "../../styles";
import CommentCard from "../../components/cards/CommentCard";
import Button from "../../components/buttons/Button";
import {createProjectComment} from "../../actions/projectActions";

const ProjectCommentReply = ({navigation}) => {
    const commentParam = navigation.getParam('comment', {});
    const projectID = navigation.getParam('projectID', "");

    const {id} = commentParam;

    const [commentBody, setCommentBody] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);

    const sendReply = () => {
        dispatch(createProjectComment(commentBody, id, projectID, user.uid));
        navigation.navigate('ProjectCommentDetail', {comment: commentParam, projectID});
    };

    return (
        <Container>
            <TopBar isBack={true} />

            <Container space>
                <Title>Yorumu Cevapla</Title>

                <Divider height={10} />

                <CommentCard comment={commentParam} itemID={projectID} type='project' />

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

export default ProjectCommentReply;
