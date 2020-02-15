import React, {Component} from 'react';
import {StyleSheet, View, Text, Alert, Keyboard, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import {withNavigation} from 'react-navigation';
import {register} from "../../actions/authActions";
import Input from "../../components/form/Input";
import {fonts} from "../../styles";
import RoundedButton from "../../components/buttons/RoundedButton";
import validate from "validate.js";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: "",
            email: "",
            password: "",
            fullNameError: "",
            emailError: "",
            passwordError: "",
        };
    }

    componentDidUpdate(){
        const {authState} = this.props;
        if (authState === true){
            this.props.navigation.navigate('Home');
        }
    }

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

    validateFullName = (value) => {
        const error = validate({fullName: this.state.fullName === "" ? null : value}, this.fullNameValidation);
        if (error) {
            this.setState({fullNameError: error.fullName});
        } else {
            this.setState({fullNameError: ""});
        }

        return error;
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

    setStateFunc = (stateName, value) => {
        this.setState({[stateName]: value});
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        const {fullName, email, password} = this.state;
        const fullNameError = this.validateFullName(fullName);
        const emailError = this.validateEmail(email);
        const passwordError = this.validatePassword(password);

        if (fullNameError === undefined && emailError === undefined && passwordError === undefined) {
            this.props.register(fullName, email, password);
        }
    };

    goToLogin = () => {
        this.props.navigation.navigate('Login');
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={fonts.title}>Kayıt Ol</Text>

                <Input iconName='type' value={this.state.fullName} placeholder="Ad Soyad" name='fullName'
                       setStateFunc={this.setStateFunc} isValid={this.validateFullName}
                       errorMessage={this.state.fullNameError}/>
                <Input iconName='mail' value={this.state.email} placeholder="Email" name='email'
                       setStateFunc={this.setStateFunc} isValid={this.validateEmail}
                       errorMessage={this.state.emailError}/>
                <Input iconName='key' value={this.state.password} placeholder="Password" name='password'
                       setStateFunc={this.setStateFunc} isValid={this.validatePassword} secureTextEntry={true}
                       errorMessage={this.state.passwordError}/>

                <RoundedButton color='green' icon='arrow-right' pressFunc={this.handleSubmit}/>

                <TouchableOpacity onPress={() => this.goToLogin()}
                                  style={styles.loginButton}>
                    <Text style={{...fonts.mediumText, color: 'rgba(0, 0, 0, 0.4)'}}>HESABINIZ VAR MI? GİRİŞ YAPIN.</Text>
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
        padding: 30
    },
    loginButton: {
        alignSelf: 'center',
        marginTop: 10,
    },
});

const mapStateToProps = state => {
    return {
        authState: state.authReducer.authState,
        error: state.authReducer.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        register: (fullName, email, password) => dispatch(register(fullName, email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Register));