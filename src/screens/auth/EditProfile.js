import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet,} from 'react-native';
import TopBar from "../../components/TopBar";
import {fonts} from "../../styles";
import FileInput from "../../components/form/FileInput";
import ProfilePicture from "../../components/ProfilePicture";
import Divider from "../../components/Divider";
import Middle from "../../components/Middle";
import {changeProfilePhoto, changeUserFullName} from "../../actions/authActions";
import {connect} from "react-redux";
import RoundedButton from "../../components/buttons/RoundedButton";
import BlockButton from "../../components/buttons/BlockButton";
import validate from "validate.js";
import Input from "../../components/form/Input";
import storage from "@react-native-firebase/storage";
import uuid from "uuid";

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fullName: this.props.user.displayName !== undefined ? this.props.user.displayName : "",
            fullNameError: "",
            imageURL: "",
            changeFullName: false,
            changeProfilePhoto: false,
        };
    }

    setStateFunc = (stateName, value) => {
        this.setState({[stateName]: value});
    };

    fullNameValidation = {
        fullName: {
            presence: {
                message: '^Lütfen adınızı ve soyadınızı giriniz.'
            },
            length: {
                minimum: 1,
                message: '^Lütfen adınızı ve soyadınızı giriniz.'
            }
        }
    };

    validateFullName = (value) => {
        const error = validate({fullName: this.state.fullName === "" ? null : value}, this.fullNameValidation);
        if (error) {
            this.setState({fullNameError: error.fullName});
        } else {
            this.setState({fullNameError: ""});
        }

        return error;
    };

    handleSubmit = () => {
        const {fullName} = this.state;
        const fullNameError = this.validateFullName(fullName);

        if (fullNameError === undefined) {
            this.props.changeUserFullName(fullName);
            this.props.navigation.navigate('MyProfile');
        }
    };

    async changeProfilePicture(photoURL) {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
                resolve(xhr.response);
            };
            xhr.onerror = function(e) {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', photoURL, true);
            xhr.send(null);
        });

        const ref = storage()
            .ref()
            .child(uuid.v4());
        const snapshot = await ref.put(blob);

        blob.close();

        await ref.getDownloadURL()
            .then(downloadURL => this.props.changeProfilePhoto(downloadURL));

        this.props.navigation.navigate('MyProfile');
    };

    setImage = (value) => {
        this.setState({imageURL: value});
    };

    profilePictureSource = () => {
        const photoURL = this.props.user.photoURL;
        if (this.state.imageURL.length !== 0) {
            return this.state.imageURL;
        } else {
            return photoURL !== null ? photoURL : "";
        }
    };

    updateUserFullName = () => {
        this.props.updateUserFullName(this.state.fullName);
        this.props.navigation.navigate('MyProfile');
    };

    screenContainer = () => {
        const {changeFullName, changeProfilePhoto} = this.state;
        if (changeFullName) {
            return this.changeFullNameContainer();
        } else if (changeProfilePhoto) {
            return this.changeProfilePhotoContainer();
        } else {
            return this.buttonsContainer();
        }
    };

    buttonsContainer = () => (
        <Fragment>
            <BlockButton color='green' text="Adınızı değiştirin" icon='type' iconSize={16}
                         pressFunc={this.toggleChangeFullNameContainer}/>
            <Divider height={20}/>
            <BlockButton color='purple' text="Profil fotoğrafınızı değiştirin" icon='image' iconSize={16}
                         pressFunc={this.toggleChangeProfilePhotoContainer}/>
        </Fragment>
    );

    changeFullNameContainer = () => (
        <Fragment>
            <Input iconName='type' value={this.state.fullName} placeholder="Ad Soyad" name='fullName'
                   setStateFunc={this.setStateFunc} isValid={this.validateFullName}
                   errorMessage={this.state.fullNameError}/>
            <RoundedButton color='green' icon='arrow-right' pressFunc={this.handleSubmit}/>
        </Fragment>
    );

    changeProfilePhotoContainer = () => (
        <Fragment>
            <Middle>
                <ProfilePicture picture={this.profilePictureSource()} size={80}/>
            </Middle>
            <Divider height={20} />
            <FileInput iconName='image' text="Bir profil resmi seçin" setImage={this.setImage}/>
            <RoundedButton color='purple' icon='arrow-right' pressFunc={() => this.changeProfilePicture(this.state.imageURL)}/>
        </Fragment>
    );

    toggleChangeFullNameContainer = () => {
        this.setState(state => ({changeFullName: !state.changeFullName}));
    };

    toggleChangeProfilePhotoContainer = () => {
        this.setState(state => ({changeProfilePhoto: !state.changeProfilePhoto}));
    };

    render() {
        return (
            <View style={styles.container}>
                <TopBar isBack={true}/>

                <View style={styles.innerContainer}>
                    <Text style={fonts.title}>Profili Düzenle</Text>
                    {this.screenContainer()}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    innerContainer: {
        flexDirection: 'column',
        paddingTop: 20,
        paddingHorizontal: 30,
    }
});

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeProfilePhoto: (photoURL) => dispatch(changeProfilePhoto(photoURL)),
        changeUserFullName: (fullName) => dispatch(changeUserFullName(fullName)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);