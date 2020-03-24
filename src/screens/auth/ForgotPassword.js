import React, {Component, Fragment} from 'react';
import {Text, Alert, StatusBar} from 'react-native';
import firebase from "firebase/app";
import 'firebase/auth';
import {
    CenterContainer,
    BlockButton,
    Input,
    Divider,
} from 'components';
import {fonts} from "../../styles";
import validate from "validate.js";

class ForgotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            emailError: "",
            secondStep: false,
        };
    }

    setStateFunc = (stateName, value) => {
        this.setState({[stateName]: value});
    };

    emailValidation = {
        email: {
            presence: {
                message: '^Lütfen bir email adresi giriniz.'
            },
            email: {
                message: '^Lütfen geçerli bir email adresi giriniz.'
            },
        },
    };

    validateEmail = (value) => {
        const error = validate({email: this.state.email === "" ? null : value}, this.emailValidation);
        if (error) {
            this.setState({emailError: error.email});
        } else {
            this.setState({emailError: ""});
        }

        return error;
    };

    handleSubmit = () => {
        const emailError = this.validateEmail(this.state.email);

        if (emailError === undefined) {
            this.sendEmail();
        }
    };

    sendChangePasswordEmail = () => {
        return new Promise((resolve, reject) => {
            let auth = firebase.auth();

            return auth.sendPasswordResetEmail(this.state.email)
                .then(() => resolve(true))
                .catch(() => reject(false));
        });
    };

    sendEmail = () => {
        this.sendChangePasswordEmail().then(() => this.setState({secondStep: true})).catch(() => Alert("Hata!", "Email gönderilemedi."));
    };

    goToLogin = () => {
        this.props.navigation.navigate('Login');
    };

    firstStep = () => (
        <Fragment>
            <Input
                iconName='mail'
                value={this.state.email}
                placeholder="Email"
                name='email'
                setStateFunc={this.setStateFunc}
                isValid={this.validateEmail}
                errorMessage={this.state.emailError}
            />

            <BlockButton
                color='green'
                text="Şifre değiştirme maili gönder"
                icon='mail'
                iconSize={16}
                pressFunc={this.handleSubmit}
            />
        </Fragment>
    );

    secondStep = () => (
        <Fragment>
            <Text style={fonts.normalText}>
                Şifrenizi değiştirebilmeniz için mail adresinize bir mail gönderdik. Bu
                mailde yer alan linke tıklayarak şifrenizi değiştirebilirsiniz.
            </Text>

            <Divider height={10} />

            <BlockButton
                color='purple'
                text="Anladım"
                icon='check'
                iconSize={16}
                pressFunc={this.goToLogin}
            />
        </Fragment>
    );

    render() {
        return (
            <CenterContainer padding={true}>
                <StatusBar
                    backgroundColor='transparent'
                    translucent={true}
                    barStyle='dark-content'
                />

                <Text style={fonts.title}>Şifremi Unuttum</Text>

                {this.state.secondStep ? this.secondStep() : this.firstStep()}
            </CenterContainer>
        );
    }
}

export default ForgotPassword;
