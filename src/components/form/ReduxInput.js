import React, {Component, Fragment} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Feather";
import {errorMessages} from "../../errorMessages";

class ReduxInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMessage: [],
        };
    }

    setErrorMessage = constantErrorMessage => {
        this.setState({errorMessage: constantErrorMessage});
    };

    errorMessageContainer = () => {
        if (this.state.errorMessage.length > 0) {
            return <Text style={styles.errorText}>{this.state.errorMessage}</Text>;
        } else {
            return null;
        }
    };

    handleChangeText = (text) => {
        this.errorControl(text)
    };

    render() {
        return (
            <Fragment>
                <View style={styles.inputContainer}>
                    <Icon name={this.props.iconName} size={24} color={this.props.iconColor}/>
                    <TextInput
                        placeholder={this.props.placeholder}
                        defaultValue={this.props.value}
                        onChangeText={text => this.handleChangeText(text)}
                        style={styles.input}
                        secureTextEntry={this.props.secureTextEntry}
                        ref={this.props.ref}
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
        width: '100%',
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        includeFontPadding: false,
        color: 'rgba(0, 0, 0, 0.4)',
        marginLeft: 5,
        // backgroundColor: 'blue',
        paddingBottom: 6,
    },
    inputIcon: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
    },
    errorText: {
        marginBottom: 20,
        color: 'red'
    },
});

Input.defaultProps = {
    secureTextEntry: false,
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
    ref: PropTypes.string,
};

export default ReduxInput;