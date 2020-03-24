import React, {Component} from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Icon from "react-native-vector-icons/Feather";
import RNFetchBlob from 'rn-fetch-blob'
import uuid from "rn-fetch-blob/utils/uuid";
import {colors, fonts} from "../../styles";
import {deleteProjectFile} from "../../actions/projectActions";

class ProjectFileCard extends Component {
    downloadFile = (fileURL, type) => {
        const { dirs } = RNFetchBlob.fs;
        return RNFetchBlob
            .config({
                fileCache : true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: dirs.DownloadDir + "/" + uuid().v4 + "." + type,
                },
            })
            .fetch('GET', fileURL, {})
            .then(res => console.log(res))
            .catch(() => console.log("Başarısız"));
    };

    deleteFile = (projectID, id) => {
        this.props.deleteProjectFile(projectID, id);
    };

    render(){
        const {projectID, file} = this.props;
        const {id, fileName, size, downloadURL, contentType} = file;
        const type = contentType.split('/')[1];
        return (
            <View style={styles.fileContainer}>
                <View style={styles.fileDetailContainer}>
                    <View style={styles.fileDetailLeftContainer}>
                        <Icon name='file' size={24} color='white' />
                    </View>

                    <View>
                        <Text style={fonts.mediumText}>{fileName}</Text>
                        <Text style={fonts.normalText}>{size / 1000000} MB</Text>
                    </View>
                </View>

                <View style={styles.fileDetailContainer}>
                    <TouchableOpacity onPress={() => this.downloadFile(downloadURL, type)} style={{marginRight: 4,}}>
                        <Icon name='download' size={20} color='rgba(0, 0, 0, 0.6)' />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.deleteFile(projectID, id)}>
                        <Icon name='trash-2' size={20} color='rgba(0, 0, 0, 0.6)' />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    fileDetailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    fileDetailLeftContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.orange,
        marginRight: 10,
        padding: 12,
        borderRadius: 15,
    },
});

ProjectFileCard.propTypes = {
    file: PropTypes.object.isRequired,
    projectID: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
    return {
        loading: state.projectReducer.loading,
        error: state.projectReducer.error,
        files: state.projectReducer.files,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteProjectFile: (projectID, projectFileID) => dispatch(deleteProjectFile(projectID, projectFileID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFileCard);
