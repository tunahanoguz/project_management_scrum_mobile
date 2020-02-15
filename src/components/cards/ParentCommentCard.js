import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import ProfilePicture from "../ProfilePicture";
import {profiles} from "../../constants";
import Icon from "react-native-vector-icons/Feather";
import {colors, fonts} from "../../styles";
import {connect} from "react-redux";
import {getUserById} from "../../actions/authActions";

class ParentCommentCard extends Component {
    // componentDidMount(){
    //     this.props.getUserById();
    // }

    render(){
        const {comment, userID} = this.props.comment;
        const {photoURL} = this.props.foundUser;

        return (
            <View style={styles.commentContainer}>
                <View style={styles.commentInnerContainer}>
                    <View style={styles.profileContainer}>
                        <ProfilePicture size={48} picture={profiles[0].profilePhoto}/>
                    </View>

                    <View style={styles.parentCommentBubbleContainer}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.commentAuthorText}>Julia Tyler</Text>
                            <TouchableOpacity style={styles.replyButton}>
                                <Icon name='corner-up-right' size={12} color='white'/>
                                <Text style={styles.replyButtonText}>Cevapla</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.commentText}>Lorem ipsum is placeholder text commonly used in the
                            graphic,
                            print,
                            and publishing...</Text>
                    </View>
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
    commentContainer: {
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    commentInnerContainer: {
        flexDirection: 'row',
        width: '100%',
    },
    profileContainer: {
        flex: 0.16,
        marginRight: 14,
        alignItems: 'center',
    },
    parentCommentBubbleContainer: {
        backgroundColor: colors.purple,
        flex: 0.84,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 15,
    },
    commentAuthorText: {
        ...fonts.mediumText,
        fontSize: 14,
        color: 'white',
    },
    commentText: {
        ...fonts.normalText,
        color: 'white',
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
});

ParentCommentCard.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ParentCommentCard);