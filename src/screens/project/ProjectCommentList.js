import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
    TopBar,
    Button,
    CommentCard,
    Loading,
} from 'components';
import {
    Container,
    DirectionContainer,
    Divider,
    Text,
    Title
} from "../../styles";
import {getAllProjectComments} from "../../actions/projectActions";

const ProjectCommentList = ({navigation}) => {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.projectReducer.loading);
    const error = useSelector(state => state.projectReducer.commentError);
    const comments = useSelector(state => state.projectReducer.comments);

    const projectID = navigation.getParam('projectID', "");

    useEffect(() => {
        dispatch(getAllProjectComments(projectID));
    }, []);

    const goToCreateComment = () => {
        navigation.navigate('CreateProjectComment', {projectID});
    };

    const renderComments = () => {
        if (loading){
            return <DirectionContainer flex={1} justifyCenter alignCenter><Loading /></DirectionContainer>;
        } else {
            if (error.length !== 0){
                return <DirectionContainer flex={1} justifyCenter alignCenter><Text medium>{error}</Text></DirectionContainer>;
            } else {
                return (
                    <FlatList
                        data={comments}
                        renderItem={({item}) => !item.parentCommentID && (
                            <CommentCard
                                comment={item}
                                itemID={projectID}
                                type='project'
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
                        action={goToCreateComment}
                    />
                </Container>

            </Container>
        </Container>
    );
};

export default ProjectCommentList;
