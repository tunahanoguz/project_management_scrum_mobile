import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet,} from 'react-native';
import TopBar from "../../components/TopBar";
import {Container, fonts, Title} from "../../styles";
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

    async changeProfilePicture(photoURL) {
        const {navigation, changeProfilePhoto} = this.props;

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
        await ref.put(blob);

        blob.close();

        await ref.getDownloadURL()
            .then(downloadURL => changeProfilePhoto(downloadURL));

        navigation.navigate('MyProfile');
    };

    setImage = (value) => {
        this.setState({imageURL: value});
    };

    profilePictureSource = () => {
        const photoURL = this.props.user.photoURL;
        const {imageURL} = this.state;

        if (imageURL.length !== 0) {
            return imageURL;
        } else {
            return photoURL !== null ? photoURL : "";
        }
    };

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

    render() {
        return (
            <Container>
                <TopBar isBack={true}/>

                <Container space>
                    <Title>Profili Düzenle</Title>
                    <Divider height={10} />
                    {this.changeProfilePhotoContainer()}
                </Container>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeProfilePhoto: (photoURL) => dispatch(changeProfilePhoto(photoURL)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);