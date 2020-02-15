import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Keyboard} from 'react-native';
import {withNavigation} from 'react-navigation';
import {login} from "../../actions/authActions";
import {connect} from "react-redux";
import Input from "../../components/form/Input";
import validate from "validate.js";
import RoundedButton from "../../components/buttons/RoundedButton";
import {fonts} from "../../styles";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            emailError: "",
            passwordError: "",
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

    passwordValidation = {
        password: {
            presence: {
                message: '^Lütfen bir şifre giriniz.'
            },
            length: {
                minimum: 6,
                message: '^Lütfen en az 6 karakterden oluşan bir şifre giriniz.'
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

    validatePassword = (value) => {
        const error = validate({password: this.state.password === "" ? null : value}, this.passwordValidation);
        if (error) {
            this.setState({passwordError: error.password});
        } else {
            this.setState({passwordError: ""});
        }

        return error;
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        const {email, password} = this.state;
        const emailError = this.validateEmail(email);
        const passwordError = this.validatePassword(password);

        if (emailError === undefined && passwordError === undefined) {
            this.props.login(email, password);
            this.props.navigation.navigate('Home');
        }
    };

    goToRegister = () => {
        this.props.navigation.navigate('Register');
    };

    goToForgotPassword = () => {
        this.props.navigation.navigate('ForgotPassword');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={fonts.title}>Giriş Yap</Text>

                <Input iconName='mail' value={this.state.email} placeholder="Email" name='email'
                       setStateFunc={this.setStateFunc} isValid={this.validateEmail}
                       errorMessage={this.state.emailError} isEmail={true}/>
                <Input iconName='key' value={this.state.password} placeholder="Password" name='password'
                       setStateFunc={this.setStateFunc} isValid={this.validatePassword} secureTextEntry={true}
                       errorMessage={this.state.passwordError}/>

                <RoundedButton color='green' icon='arrow-right' pressFunc={this.handleSubmit}/>

                <TouchableOpacity onPress={() => this.goToRegister()}
                                  style={styles.registerButton}>
                    <Text style={{...fonts.mediumText, color: 'rgba(0, 0, 0, 0.4)'}}>HESABINIZ YOK MU? KAYIT OLUN.</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.goToForgotPassword()}
                                  style={styles.registerButton}>
                    <Text style={{...fonts.mediumText, color: 'rgba(0, 0, 0, 0.4)'}}>ŞİFREMİ UNUTTUM</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 30,
        backgroundColor: 'white',
    },
    registerButton: {
        alignSelf: 'center',
        marginTop: 10,
    },
});

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) => dispatch(login(email, password)),
    };
};

export default connect(null, mapDispatchToProps)(withNavigation(Login));