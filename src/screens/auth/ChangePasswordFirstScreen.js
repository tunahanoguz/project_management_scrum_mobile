import React, {Component} from 'react';
import {View, Image, Text, StyleSheet, Alert} from 'react-native';
import firebase from 'firebase/app';
import 'firebase/auth';
import TopBar from "../../components/TopBar";
import BlockButton from "../../components/buttons/BlockButton";
import {fonts, sizes, Title} from "../../styles";
import Divider from "../../components/Divider";
import {withNavigation} from 'react-navigation';
import changePasswordImage from '../../../assets/images/change-password.png';
import Button from "../../components/buttons/Button";

class ChangePasswordFirstScreen extends Component {

    sendChangePasswordEmail = () => {
        return new Promise((resolve, reject) => {
            let auth = firebase.auth();
            const email = auth.currentUser.email;

            return auth.sendPasswordResetEmail(email)
                .then(() => resolve(true))
                .catch(() => reject(false));
        });
    };

    sendEmail = () => {
        this.sendChangePasswordEmail().then(() => this.props.navigation.navigate("ChangePasswordSecondScreen")).catch(() => Alert("Hata!", "Email gönderilemedi."));
    };

    render() {
        return (
            <View style={styles.container}>
                <TopBar isBack={true}/>

                <View style={styles.innerContainer}>
                    <Title>Şifreyi Değiştir</Title>

                    {/*<Divider height={20}/>*/}

                    <Image source={changePasswordImage} style={{width: sizes.deviceWidth, height: '50%', alignSelf: 'center',}} resizeMethod='resize' />

                    <Divider height={20}/>

                    <Button action={this.sendEmail} color='purple' text="📮 ONAY MAİLİ GÖNDER" />

                    {/*<BlockButton color="green" icon="mail" text="Onay maili gönder"*/}
                    {/*             pressFunc={this.sendEmail}/>*/}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
});

export default withNavigation(ChangePasswordFirstScreen);