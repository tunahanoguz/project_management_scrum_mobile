import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Feather";
import RNFetchBlob from 'rn-fetch-blob'
import {colors, fonts} from "../../styles";
import uuid from "rn-fetch-blob/utils/uuid";

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

    render(){
        const {fileName, size, downloadURL, contentType} = this.props.file;
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

                <TouchableOpacity onPress={() => this.downloadFile(downloadURL, type)}>
                    <Icon name='download' size={20} color='rgba(0, 0, 0, 0.6)' />
                </TouchableOpacity>
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
};

export default ProjectFileCard;