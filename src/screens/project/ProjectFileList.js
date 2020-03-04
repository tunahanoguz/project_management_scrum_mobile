import React, {Component} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Container from "../../components/Container";
import TopBar from "../../components/TopBar";
import {colors, fonts} from "../../styles";
import ProjectFileCard from "../../components/cards/ProjectFileCard";
import AbsoluteButton from "../../components/buttons/AbsoluteButton";
import {deleteProjectFile, getAllProjectFiles} from "../../actions/projectActions";
import {connect} from "react-redux";
import {ActivityIndicator} from "react-native-paper";
import List from "../../components/list/List";
import ListActionModal from "../../components/modals/ListActionModal";

class ProjectFileList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            selectedItemID: "",
        };
    }

    componentDidMount() {
        const projectID = this.props.navigation.getParam('projectID', "");
        this.props.getAllProjectFiles(projectID);
    }

    setIsOpenModal = (itemID) => {
        this.setState(state => ({isModalOpen: !state.isModalOpen, selectedItemID: itemID}));
    };

    goToUploadProjectFile = () => {
        const projectID = this.props.navigation.getParam('projectID', "");
        this.props.navigation.navigate('ProjectFileUpload', {projectID});
    };

    editFile = () => {
        // this.props.deleteProjectFile(this.state.selectedItemID);
        alert("asdasdasd");
    };

    deleteFile = () => {
        this.props.deleteProjectFile(this.state.selectedItemID);
    };

    listOfFiles = () => {
        const {loading, error, files} = this.props;
        return (
            <List
                loading={loading}
                error={error}
                data={files}
                type='file'
                isFunctioned={true}
                orderColor='orangered'
                modalFunc={this.setIsOpenModal}
            />
        );
    };

    render(){
        return (
            <Container>
                <TopBar isBack={true} />

                {this.listOfFiles()}

                <AbsoluteButton
                    icon='plus'
                    backgroundColor={colors.purple}
                    pressFunc={() => this.goToUploadProjectFile()}
                    style={{bottom: 10, left: 10,}}
                />

                <ListActionModal
                    isOpen={this.state.isModalOpen}
                    toggleFunc={this.setIsOpenModal}
                    editText="Dosyayı Düzenle"
                    editAction={this.editFile}
                    deleteText="Dosyayı Sil"
                    deleteAction={this.deleteFile}
                />
            </Container>
        );
    }
}

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
        deleteProjectFile: (projectFileID) => dispatch(deleteProjectFile(projectFileID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFileList);
