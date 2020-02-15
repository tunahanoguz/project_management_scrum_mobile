import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import ProfilePicture from "../ProfilePicture";
import {profiles} from "../../constants";
import Icon from "react-native-vector-icons/Feather";
import {colors, fonts} from "../../styles";
import {connect} from "react-redux";
import {getUserById} from "../../actions/authActions";

class ChildCommentCard extends Component {
    // componentDidMount(){
    //     this.props.getUserById();
    // }

    render(){
        const {comment, userID} = this.props.comment;
        const {photoURL} = this.props.foundUser;

        return (
            <View style={styles.childCommentContainer}>
                <View style={styles.childCommentInnerContainer}>
                    <View style={styles.childCommentBubbleContainer}>
                        <View style={styles.childCommentIconContainer}>
                            <Icon name='corner-down-right' size={20} color='white'/>
                        </View>
                        <View style={{flex: 0.9,}}>
                            <View style={styles.rowContainer}>
                                <Text style={styles.commentAuthorText}>Julia Tyler</Text>
                                <TouchableOpacity style={styles.replyButton}>
                                    <Icon name='corner-up-right' size={12} color='white'/>
                                    <Text style={styles.replyButtonText}>Cevapla</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.childCommentText}>Lorem ipsum is placeholder text commonly used in the
                                graphic, print, and publishing industries for previewing layouts and visual mockups.</Text>
                        </View>
                    </View>
                    <View style={{flex: 0.16,}}><ProfilePicture size={45} picture={profiles[1].profilePhoto}/></View>
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
        backgroundColor: colors.purple,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 15,
        marginRight: 14,
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
    childCommentContainer: {
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 30,
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
        color: 'white',
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