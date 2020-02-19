import React, {Component} from 'react';
import {View, TouchableOpacity, FlatList, Text, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import Container from "../../components/Container";
import TopBar from "../../components/TopBar";
import {colors, fonts} from "../../styles";
import ParentCommentCard from "../../components/cards/ParentCommentCard";
import ChildCommentCard from "../../components/cards/ChildCommentCard";
import AbsoluteButton from "../../components/buttons/AbsoluteButton";
import {getAllChildComments, getAllProjectComments, getAllProjectParentComments} from "../../actions/projectActions";
import {connect} from "react-redux";
import {ActivityIndicator} from "react-native-paper";

class ProjectCommentList extends Component {
    projectID = this.props.navigation.getParam('projectID', "");

    componentDidMount(){
        this.props.getAllProjectParentComments(this.projectID);
    }

    goToSendComment = () => {
        this.props.navigation.navigate('ProjectSendComment', {projectID: this.projectID});
    };

    renderComments = () => {
        let {loading, error, comments} = this.props;
        if (loading){
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}><ActivityIndicator size='large'/></View>
            );
        } else if (comments !== []) {
            return (
                <FlatList data={comments} renderItem={({item}) => <ParentCommentCard comment={item} />} />
            );
        } else {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}><Text style={fonts.mediumText}>{error}</Text></View>
            );
        }
    };

    render() {
        return (
            <Container>
                <TopBar isBack={true}/>

                {this.renderComments()}

                <AbsoluteButton icon='plus' backgroundColor={colors.purple} pressFunc={this.goToSendComment} style={{bottom: 10, left: 10,}}/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
    return {
        loading: state.projectReducer.loading,
        error: state.projectReducer.error,
        comments: state.projectReducer.comments,
        childComments: state.projectReducer.childComments,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllProjectParentComments: (projectID) => dispatch(getAllProjectParentComments(projectID)),
        getAllChildComments: (parentCommentID) => dispatch(getAllChildComments(parentCommentID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ProjectCommentList));