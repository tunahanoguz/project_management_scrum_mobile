import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {colors, fonts, sizes} from "../../styles";
import {ActivityIndicator} from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import Divider from "../Divider";

class ActionModal extends Component {
    mainContainer = (container) => {
        return (
            <TouchableOpacity style={styles.mainContainer}>
                {container}
            </TouchableOpacity>
        );
    };

    message = () => {
        const {state, successMessage, errorMessage} = this.props;
        if (state === 0) {
            return this.mainContainer(
                <View style={styles.messageContainer}>
                    <ActivityIndicator size='large'/>
                </View>);
        } else if (state === 1) {
            return this.mainContainer(
                <View style={styles.messageContainer}>
                    <Icon name='check' color={colors.darkGreen} size={64}/>
                    <Divider height={10} />
                    <Text style={fonts.mediumText}>{successMessage}</Text>
                </View>
            );
        } else if (state === 2) {
            return this.mainContainer(
                <View style={styles.messageContainer}>
                    <Icon name='check' color={colors.darkGreen} size={64}/>
                    <Divider height={10} />
                    <Text style={fonts.mediumText}>{errorMessage}</Text>
                </View>
            );
        } else {
            return null;
        }
    };

    render() {
        return (
            this.message()
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: sizes.deviceWidth,
        height: sizes.deviceHeight,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    messageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
});

ActionModal.propTypes = {
    state: PropTypes.number.isRequired,
    successMessage: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
};

export default ActionModal;