import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import 'firebase/auth';
import Icon from "react-native-vector-icons/Feather";
import TopBar from "../../components/TopBar";
import {colors, fonts} from "../../styles";
import {withNavigation} from 'react-navigation';
import BlockButton from "../../components/buttons/BlockButton";
import Divider from "../../components/Divider";

class ChangePasswordSecondScreen extends Component {
    constructor(props) {
        super(props);
    }

    goToHome = () => {
        this.props.navigation.navigate("Home");
    };

    render() {
        return (
            <View style={styles.container}>
                <TopBar isBack={true}/>

                <View style={styles.innerContainer}>
                    <Icon name='check' size={100} color={colors.green} style={styles.checkIcon} />
                    <Text style={styles.successTitle}>Şifre değiştirme maili gönderildi!</Text>
                    <Text style={styles.informationText}>Şifre değişikliğinizi size gönderdiğimiz mail üzerinden gerçekleştirebilirsiniz.</Text>
                    <Divider height={15} />
                    <BlockButton color="purple" icon="thumbs-up" text="Tamam!"
                                 pressFunc={this.goToHome}/>
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
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    checkIcon: {
        textAlign: 'center',
    },
    successTitle: {
        ...fonts.title,
        textAlign: 'center',
    },
    informationText: {
        ...fonts.normalText,
        textAlign: 'center',
    },
});

export default withNavigation(ChangePasswordSecondScreen);