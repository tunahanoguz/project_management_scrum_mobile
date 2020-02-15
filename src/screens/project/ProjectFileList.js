import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Container from "../../components/Container";
import TopBar from "../../components/TopBar";
import Icon from "react-native-vector-icons/Feather";
import {colors, fonts} from "../../styles";
import ProjectFileCard from "../../components/cards/ProjectFileCard";
import AbsoluteButton from "../../components/buttons/AbsoluteButton";
import {getAllProjectFiles, getAllProjects} from "../../actions/projectActions";
import {connect} from "react-redux";

class ProjectFileList extends Component {
    componentDidMount() {
        const projectID = this.props.navigation.getParam('projectID', "");
        this.props.getAllProjectFiles(projectID);
    }

    goToUploadProjectFile = () => {
        const projectID = this.props.navigation.getParam('projectID', "");
        this.props.navigation.navigate('ProjectFileUpload', {projectID});
    };

    listOfFiles = () => {
        return (
            <FlatList data={this.props.files} renderItem={({item}) => <ProjectFileCard file={item}/>} />
        );
    };

    render(){
        return (
            <Container>
                <TopBar isBack={true} />

                {this.listOfFiles()}

                <AbsoluteButton icon='plus' backgroundColor={colors.purple} pressFunc={() => this.goToUploadProjectFile()} style={{bottom: 10, left: 10,}} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
    return {
        loading: state.projectReducer.loading,
        error: state.projectReducer.error,
        files: state.projectReducer.files,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllProjectFiles: (projectID) => dispatch(getAllProjectFiles(projectID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFileList);