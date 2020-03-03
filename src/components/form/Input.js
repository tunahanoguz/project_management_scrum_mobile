import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Feather";
import {colors, fonts} from "../../styles";

class Input extends Component {

    errorMessageContainer = (errorMessage) => {
        if (errorMessage === "") {
            return null;
        } else {
            return <Text style={styles.errorMessage}>{errorMessage}</Text>;
        }
    };

    handleChangeText = (isValid, text) => {
        isValid(text)
    };

    render() {
        const {name, placeholder, value, iconName, iconColor, setStateFunc, isValid, secureTextEntry, isEmail, errorMessage} = this.props;
        return (
            <Fragment>
                <View style={styles.inputContainer}>
                    <Icon name={iconName} size={18} color={iconColor}/>
                    <TextInput
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={text => setStateFunc(name, text)}
                        onEndEditing={e => this.handleChangeText(isValid, e.nativeEvent.text)}
                        style={styles.input}
                        secureTextEntry={secureTextEntry}
                        keyboardType={isEmail ? 'email-address' : 'default'}
                        autoCapitalize={isEmail ? 'none' : 'words'}
                        autoCompleteType='off'
                    />
                </View>
                {this.errorMessageContainer(errorMessage)}
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginBottom: 20
    },
    input: {
        flex: 1,
        width: '100%',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        includeFontPadding: false,
        color: 'rgba(0, 0, 0, 0.4)',
        marginLeft: 5,
        paddingBottom: 6,
    },
    inputIcon: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    errorMessage: {
        ...fonts.mediumText,
        color: colors.red,
        marginBottom: 20,
    },
});

Input.defaultProps = {
    secureTextEntry: false,
    isEmail: false,
    iconColor: 'rgba(100, 100, 100, 1)',
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    iconColor: PropTypes.string,
    setStateFunc: PropTypes.func.isRequired,
    isValid: PropTypes.func,
    secureTextEntry: PropTypes.bool,
    isEmail: PropTypes.bool,
    errorMessage: PropTypes.string.isRequired,
};

export default Input;