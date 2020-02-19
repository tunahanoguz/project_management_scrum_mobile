import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Container from "../../components/Container";
import TopBar from "../../components/TopBar";
import {colors, fonts} from "../../styles";
import ProjectFileCard from "../../components/cards/ProjectFileCard";
import AbsoluteButton from "../../components/buttons/AbsoluteButton";
import {getAllProjectFiles} from "../../actions/projectActions";
import {connect} from "react-redux";
import {ActivityIndicator} from "react-native-paper";

class ProjectFileList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const projectID = this.props.navigation.getParam('projectID', "");
        this.props.getAllProjectFiles(projectID);
    }

    goToUploadProjectFile = () => {
        const projectID = this.props.navigation.getParam('projectID', "");
        this.props.navigation.navigate('ProjectFileUpload', {projectID});
    };

    listOfFiles = () => {
        const {loading, error, files} = this.props;
        const projectID = this.props.navigation.getParam('projectID', "");
        if (loading){
            return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}><ActivityIndicator size='large'/></View>;
        } else if (error !== null){
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}><Text style={fonts.mediumText}>{error}</Text></View>
            );
        } else {
            return (
                <FlatList data={files} renderItem={({item}) => <ProjectFileCard file={item} projectID={projectID}/>} />
            );
        }
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
        deleteProjectFileSuccess: state.projectReducer.deleteProjectFileSuccess,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllProjectFiles: (projectID) => dispatch(getAllProjectFiles(projectID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFileList);