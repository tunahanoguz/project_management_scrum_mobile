import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Container from "../../components/Container";
import TopBar from "../../components/TopBar";
import InnerContainer from "../../components/InnerContainer";
import {colors, fonts} from "../../styles";
import Icon from "react-native-vector-icons/Feather";
import {TextInput} from "react-native-paper";
import {sendProjectParentComment} from "../../actions/projectActions";
import {connect} from "react-redux";
import RoundedButton from "../../components/buttons/RoundedButton";
import Divider from "../../components/Divider";

class ProjectSendComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: "",
        };
    }

    sendComment = () => {
        const projectID = this.props.navigation.getParam('projectID', "");
        this.props.sendProjectParentComment(projectID, this.props.user.uid, this.state.comment, null);
        this.props.navigation.navigate('ProjectCommentList', {projectID});
    };

    render() {
        return (
            <Container>
                <TopBar isBack={true}/>

                <InnerContainer>
                    <Text style={fonts.title}>Yorum gönder</Text>
                    <View style={styles.commentInputContainer}>
                        <Icon name='message-circle' size={24}/>
                        <TextInput
                            placeholder="Yorumunuzu giriniz."
                            multiline={true}
                            onChangeText={text => this.setState({comment: text})}
                            style={styles.inputStyle}
                        />
                    </View>
                    <Divider height={20}/>
                    <RoundedButton color='green' icon='send' pressFunc={this.sendComment}/>
                </InnerContainer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    commentInputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 15,
        backgroundColor: colors.lightGray,
        borderRadius: 15,
    },
    inputStyle: {
        ...fonts.normalText,
        fontSize: 16,
        flex: 1,
        paddingTop: 0,
        borderBottomWidth: 0,
        textAlignVertical: 'top',
    },
});

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        sendProjectParentComment: (projectID, userID, comment, parentCommentID) => dispatch(sendProjectParentComment(projectID, userID, comment, parentCommentID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSendComment);