import React, {useEffect} from 'react';
import {FlatList} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import TopBar from "../../components/TopBar";
import {Container, Divider, Text, Title} from "../../styles";
import CommentCard from "../../components/cards/CommentCard";
import {getProjectReplyComments} from "../../actions/projectActions";

const ProjectCommentDetail = ({navigation}) => {
    const commentParam = navigation.getParam('comment', {});
    const projectID = navigation.getParam('itemID', "");
    const {id} = commentParam;

    const dispatch = useDispatch();
    const replyComments = useSelector(state => state.projectReducer.replyComments);

    useEffect(() => {
        dispatch(getProjectReplyComments(id));
    }, []);

    return (
        <Container>
            <TopBar isBack={true}/>

            <Container space>
                <Title>Yorum</Title>

                <Divider height={10}/>

                <CommentCard comment={commentParam} itemID={projectID} type='project'/>

                <Divider height={10}/>

                <Title>Cevaplar</Title>

                <Divider height={10}/>

                {replyComments !== [] ? (
                    <FlatList
                        data={replyComments}
                        renderItem={({item}) => (
                            <CommentCard
                                comment={item}
                                itemID={projectID}
                                type='project'
                            />
                        )}/>) :
                    <Text medium>Hiç cevap yok.</Text>}
            </Container>
        </Container>
    );
};

export default ProjectCommentDetail;
