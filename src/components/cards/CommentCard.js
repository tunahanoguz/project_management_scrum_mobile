import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import styled from "styled-components";
import PropTypes from 'prop-types';
import moment from "moment";
import 'moment/locale/tr';
import {useDispatch, useSelector} from "react-redux";
import ProfilePicture from "../ProfilePicture";
import {DirectionContainer, DotDivider, Text} from "../../styles";
import {getUserById} from "../../actions/authActions";

const CommentCard = ({navigation, comment, itemID, type}) => {
    const dispatch = useDispatch();
    const foundUser = useSelector(state => state.authReducer.foundUser);

    useEffect(() => {
        dispatch(getUserById(comment.userID));
    }, []);

    const renderDate = (date) => {
        moment.locale('tr-TR');
        return moment(date?.toDate()).startOf('hour').fromNow();
    };

    const goToCommentDetail = () => {
        if (comment.parentCommentID === null){
            if (type === 'project') {
                navigation.navigate('ProjectCommentDetail', {comment, itemID});
            } else if (type === 'task') {
                navigation.navigate('TaskCommentDetail', {comment, itemID});
            } else if (type === 'sprint') {
                navigation.navigate('SprintCommentDetail', {comment, itemID});
            }
        }
    };

    const goToReplyComment = () => {
        if (comment.parentCommentID === null){
            if (type === 'project') {
                navigation.navigate('ProjectCommentReply', {comment, projectID: itemID});
            } else if (type === 'task') {
                navigation.navigate('TaskCommentReply', {comment, taskID: itemID});
            } else if (type === 'sprint') {
                navigation.navigate('SprintCommentReply', {comment, itemID});
            }
        }
    };

    return (
        <CommentContainer>
            <CommentLeftContainer>
                <ProfilePicture size={50} picture={foundUser.photoURL ? foundUser.photoURL : ""} />
            </CommentLeftContainer>

            <CommentRightContainer>
                <TouchableOpacity onPress={() => goToCommentDetail()}>
                    <DirectionContainer row alignCenter>
                        <Text medium>{foundUser.fullName}</Text>
                        <DotDivider size={6} />
                        <Text>{renderDate(comment.createdAt)}</Text>
                    </DirectionContainer>

                    <Text>{comment.comment}</Text>
                </TouchableOpacity>

                {!comment.parentCommentID && (
                    <ReplyButton onPress={() => goToReplyComment()}>
                        <Text medium>Cevapla</Text>
                    </ReplyButton>
                )}

            </CommentRightContainer>
        </CommentContainer>
    );
};

const CommentContainer = styled.View`
    width: 100%;
    flex-direction: row;
    margin-bottom: 20px;
`;

const CommentLeftContainer = styled.View`
    flex: 0.2;
`;

const CommentRightContainer = styled.View`
    flex: 0.8;
`;

const ReplyButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: flex-end;
`;

CommentCard.propTypes = {
    comment: PropTypes.object.isRequired,
    itemID: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
};

export default withNavigation(CommentCard);
