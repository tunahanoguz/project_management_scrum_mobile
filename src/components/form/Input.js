import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Feather";
import {colors, fonts} from "../../styles";

class Input extends Component {

    errorMessageContainer = () => {
        if (this.props.errorMessage === "") {
            return null;
        } else {
            return <Text style={styles.errorMessage}>{this.props.errorMessage}</Text>;
        }
    };

    handleChangeText = (text) => {
        this.props.isValid(text)
    };

    render() {
        return (
            <Fragment>
                <View style={styles.inputContainer}>
                    <Icon name={this.props.iconName} size={18} color={this.props.iconColor}/>
                    <TextInput
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        value={this.props.value}
                        onChangeText={text => this.props.setStateFunc(this.props.name, text)}
                        onEndEditing={e => this.handleChangeText(e.nativeEvent.text)}
                        style={styles.input}
                        secureTextEntry={this.props.secureTextEntry}
                        keyboardType={this.props.isEmail ? 'email-address' : 'default'}
                        autoCapitalize={this.props.isEmail ? 'none' : 'words'}
                        autoCompleteType='off'
                    />
                </View>
                {this.errorMessageContainer()}
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