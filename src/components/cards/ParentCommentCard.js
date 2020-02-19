import React, {Component} from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import ProfilePicture from "../ProfilePicture";
import Icon from "react-native-vector-icons/Feather";
import {colors, fonts} from "../../styles";
import {connect} from "react-redux";
import {getUserById} from "../../actions/authActions";
import ChildCommentCard from "./ChildCommentCard";
import firestore from '@react-native-firebase/firestore';

class ParentCommentCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            childComments: [],
        };
    }
    componentDidMount() {
        const {id, userID} = this.props.comment;
        this.props.getUserById(userID);
        this.getChildComments();
    }

    getChildComments = () => {
        const id = this.props.comment.id;
        const projectCommentsRef = firestore().collection('projectComments');
        let comments = [];
        projectCommentsRef.where('parentCommentID', '==', id).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    const comment = {
                        id: doc.id,
                        ...doc.data(),
                    };

                    comments.push(comment);
                });

                this.setState({childComments: comments});
            })
            .catch(err => console.log(err));
    };

    childComments = () => {
        return (
            <FlatList data={this.state.childComments} renderItem={({item}) => <ChildCommentCard comment={item} />} keyExtractor={(item, index) => index.toString()} />
        );
    };

    render(){
        const {comment} = this.props.comment;
        const {photoURL, fullName} = this.props.foundUser;

        return (
            <View style={styles.commentContainer}>
                <View style={styles.commentInnerContainer}>
                    <View style={styles.profileContainer}>
                        <ProfilePicture size={48} picture={photoURL ? photoURL : ""}/>
                    </View>

                    <View style={styles.parentCommentBubbleContainer}>
                        <View style={styles.rowContainer}>
                            <Text style={styles.commentAuthorText}>{fullName}</Text>
                            <TouchableOpacity style={styles.replyButton}>
                                <Icon name='corner-up-right' size={12} color='white'/>
                                <Text style={styles.replyButtonText}>Cevapla</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.commentText}>{comment}</Text>
                    </View>
                </View>

                {this.childComments()}
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
        getUserById: (userID) => dispatch(getUserById(userID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ParentCommentCard);