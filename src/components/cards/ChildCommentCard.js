import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Feather";
import {connect} from "react-redux";
import ProfilePicture from "../ProfilePicture";
import {fonts} from "../../styles";
import {getUserById} from "../../actions/authActions";

class ChildCommentCard extends Component {
    render(){
        const {comment} = this.props.comment;
        const {photoURL, fullName} = this.props.foundUser;

        return (
            <View style={styles.childCommentContainer}>
                <View style={styles.childCommentInnerContainer}>
                    <View style={styles.childCommentBubbleContainer}>
                        <View style={styles.childCommentIconContainer}>
                            <Icon name='corner-down-right' size={20}/>
                        </View>
                        <View style={{flex: 0.9,}}>
                            <View style={styles.rowContainer}>
                                <Text style={styles.commentAuthorText}>{fullName}</Text>
                            </View>
                            <Text style={styles.childCommentText}>{comment}</Text>
                        </View>
                    </View>
                    <View style={{flex: 0.16,}}><ProfilePicture size={45} picture={photoURL ? photoURL : ""}/></View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    childCommentBubbleContainer: {
        flex: 0.84,
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 15,
        marginRight: 14,
    },
    commentAuthorText: {
        ...fonts.mediumText,
        fontSize: 12,
    },
    commentText: {
        ...fonts.normalText,
        fontSize: 12,
    },
    replyButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingVertical: 2,
        paddingHorizontal: 6,
        marginLeft: 6,
        borderRadius: 5,
    },
    replyButtonText: {
        ...fonts.mediumText,
        fontSize: 12,
        color: 'white',
        marginLeft: 4,
    },
    childCommentContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingLeft: 15,
    },
    childCommentInnerContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    childCommentIconContainer: {
        flex: 0.1,
        justifyContent: 'center',
        marginRight: 10,
    },
    childCommentText: {
        ...fonts.normalText,
        fontSize: 12,
    },
});

ChildCommentCard.propTypes = {
    comment: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        foundUser: state.authReducer.foundUser,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserById: () => dispatch(getUserById()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChildCommentCard);
