import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet, Keyboard} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {connect} from 'react-redux';
import storage from "@react-native-firebase/storage";
import validate from "validate.js";
import {withNavigation} from 'react-navigation';
import uuid from "uuid";
import {
    TopBar,
    Container,
    InnerContainer,
    RoundedButton,
} from 'components';
import {createProjectFile} from "../../actions/projectActions";
import {colors, fonts} from "../../styles";
import {fileValidations} from "../../validations";
import Input from "../../components/form/Input";

class ProjectFileUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fileName: "",
            fileNameError: "",
            fileUri: "",
        };

        this.projectID = this.props.navigation.getParam('projectID', "");
        this.uploadFile = this.uploadFile.bind(this);
    }

    setValue = (stateName, value) => {
        this.setState({[stateName]: value});
    };

    validateFileName = (value) => {
        const error = validate({fileName: this.state.fileName === "" ? null : value}, fileValidations.fileNameValidation);
        if (error) {
            this.setState({fileNameError: error.fileName});
        } else {
            this.setState({fileNameError: ""});
        }

        return error;
    };

    handleSubmit = (fileName, fileURL, props) => {
        Keyboard.dismiss();
        const projectID = this.props.navigation.getParam('projectID', "");

        if (fileURL !== ""){
            this.uploadFile(fileName, fileURL, props, projectID)
                .then(() => this.props.navigation.navigate('ProjectFileList', {projectID}));
        }
    };

    async openFilePicker() {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles,],
            });

            const {uri, type, name, size} = res;
            this.setState({fileUri: uri, fileName: name});
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err;
            }
        }
    };

    async uploadFile(fileName, fileURL, props, projectID) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', fileURL, true);
            xhr.send(null);
        });

        const ref = storage()
            .ref('projectFiles')
            .child(uuid.v4());
        let putFile = ref.put(blob);

        putFile.then(function (snapshot) {
            const {size, contentType} = snapshot.metadata;
            ref.getDownloadURL().then(downloadURL => {
                const file = {
                    fileName,
                    contentType,
                    size,
                    downloadURL,
                    projectID,
                };

                props.createProjectFile(true, null, file);
            });
        })
        .catch(error => {
            this.props.createProjectFile(false, null, null);
        });

        blob.close();
    };

    render() {
        const buttonStyle = [styles.buttonContainer, this.state.fileUri !== "" ? {backgroundColor: colors.darkGreen} : null];
        const textStyle = [fonts.mediumText, this.state.fileUri !== "" ? {color: 'white'} : null];
        const {fileName, fileNameError, fileUri} = this.state;
        return (
            <Container>
                <TopBar isBack={true}/>

                <InnerContainer>
                    <Input iconName='file' value={fileName} placeholder="Dosya adı" isValid={this.validateFileName} errorMessage={fileNameError === undefined ? "" : fileNameError} name='fileName' setStateFunc={this.setValue}/>

                    <TouchableOpacity
                        onPress={() => this.openFilePicker()}
                        style={buttonStyle}
                    >
                        <Text style={textStyle}>Bir dosya seçin</Text>
                    </TouchableOpacity>

                    <RoundedButton
                        color='green'
                        icon='upload'
                        pressFunc={() => this.handleSubmit(fileName, fileUri, this.props)}
                    />
                </InnerContainer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
    },
});

const mapDispatchToProps = dispatch => {
    return {
        createProjectFile: (state, projectID, file) => dispatch(createProjectFile(state, projectID, file)),
    };
};

export default connect(null, mapDispatchToProps)(withNavigation(ProjectFileUpload));
