import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {colors} from "../../styles";
import Icon from "react-native-vector-icons/Feather";
import ImagePicker from "react-native-image-picker";
import storage from '@react-native-firebase/storage';
import RoundedButton from "../buttons/RoundedButton";
import {connect} from "react-redux";
import {getUser} from "../../actions/authActions";
import uuid from 'uuid';

class FileInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pictureURL: "",
            extension: "",
            fileName: "",
        };
    }

    options = {
        noData: true,
    };

    openImagePicker = () => {
        return ImagePicker.launchImageLibrary(this.options, response => {
            // this.setState({pictureURL: response.uri});
            this.props.setImage(response.uri);
            // const extension = response.fileName.split('.');
            // this.setState({extension: "." + extension[1]});
            // this.setState({fileName: response.fileName});
        });
    };

    // async uploadImage() {
    //     const blob = await new Promise((resolve, reject) => {
    //         const xhr = new XMLHttpRequest();
    //         xhr.onload = function() {
    //             resolve(xhr.response);
    //         };
    //         xhr.onerror = function(e) {
    //             console.log(e);
    //             reject(new TypeError('Network request failed'));
    //         };
    //         xhr.responseType = 'blob';
    //         xhr.open('GET', this.state.pictureURL, true);
    //         xhr.send(null);
    //     });
    //
    //     const ref = storage()
    //         .ref()
    //         .child(uuid.v4());
    //     const snapshot = await ref.put(blob);
    //
    //     blob.close();
    //
    //     return await snapshot.ref.getDownloadURL();
    // };

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.inputContainer} onPress={() => this.openImagePicker()}>
                    <Icon name={this.props.iconName} size={24} color='rgba(100, 100, 100, 1)' style={styles.inputIcon}/>
                    <Text style={styles.inputText}>{this.props.text}</Text>
                </TouchableOpacity>

                {/*<RoundedButton color='green' icon='upload' pressFunc={() => this.uploadImage()} />*/}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.lightGray,
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    inputIcon: {
        marginRight: 10,
    },
    inputText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 16,
        includeFontPadding: false,
        color: 'rgba(0, 0, 0, 0.4)'
    },
});

FileInput.propTypes = {
    iconName: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    // action: PropTypes.func.isRequired,
    setImage: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        getUser: () => dispatch(getUser()),
    };
};

export default connect(null, mapDispatchToProps)(FileInput);