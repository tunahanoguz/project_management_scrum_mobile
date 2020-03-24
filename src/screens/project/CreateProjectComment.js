import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styled from 'styled-components';
import {
    TopBar,
    Button,
} from 'components';
import {Container, Divider, InnerContainer, Title} from "../../styles";
import {createProjectComment} from "../../actions/projectActions";

const CreateProjectComment = ({navigation}) => {
    const [comment, setComment] = useState("");
    const projectID = navigation.getParam('projectID', "");

    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);

    const sendComment = () => {
        dispatch(createProjectComment(comment, null, projectID, user.uid));
        navigation.navigate('ProjectCommentList', {projectID});
    };

    return (
        <Container>
            <TopBar isBack={true} />

            <Container space>
                <Title>Yorum Yap</Title>

                <Divider height={30}/>

                <InnerContainer>
                    <TextInput
                        placeholder="Yorumunuzu buraya giriniz"
                        value={comment}
                        onChangeText={text => setComment(text)}
                        multiline={true}
                    />
                </InnerContainer>

                <Divider height={30}/>

                <Button color='purple' text="💬 YORUMU GÖNDER" action={sendComment} />
            </Container>
        </Container>
    );
};

const TextInput = styled.TextInput`
    font-family: Poppins-Medium;
    font-size: 14px;
`;

export default CreateProjectComment;
