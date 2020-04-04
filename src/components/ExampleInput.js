import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Feather";
import {colors, fonts} from "../styles";

class ExampleInput extends Component {
    renderErrorMessage = (errorMessage) => {
        if (errorMessage !== ""){
            return <Text style={styles.errorMessage}>{errorMessage}</Text>;
        } else {
            return null;
        }
    };

    render() {
        const {
            name,
            placeholder,
            value,
            iconName,
            iconColor,
            handleChange,
            setFieldTouched,
            secureTextEntry,
            isEmail,
            errorMessage,
            isMultiline,
        } = this.props;

        return (
            <Fragment>
                <View style={styles.inputContainer}>
                    <Icon name={iconName} size={18} color={iconColor}/>
                    <TextInput
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChangeText={handleChange(name)}
                        onBlur={() => setFieldTouched(name)}
                        style={styles.input}
                        secureTextEntry={secureTextEntry}
                        keyboardType={isEmail ? 'email-address' : 'default'}
                        autoCapitalize={isEmail ? 'none' : 'words'}
                        autoCompleteType='off'
                        multiline={isMultiline}
                    />
                </View>
                {this.renderErrorMessage(errorMessage)}
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

ExampleInput.defaultProps = {
    secureTextEntry: false,
    isEmail: false,
    iconColor: 'rgba(100, 100, 100, 1)',
};

ExampleInput.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    iconName: PropTypes.string.isRequired,
    iconColor: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    setFieldTouched: PropTypes.func.isRequired,
    secureTextEntry: PropTypes.bool,
    isEmail: PropTypes.bool,
    isMultiline: PropTypes.bool,
};

export default ExampleInput;
