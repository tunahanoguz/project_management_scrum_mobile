import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {colors, fonts, sizes} from "../../styles";
import {ActivityIndicator} from "react-native-paper";
import Icon from "react-native-vector-icons/Feather";
import Divider from "../Divider";

class FlashMessageModal extends Component {
    renderContainer = (message) => {
        return (
            <View style={styles.container}>
                {message}
            </View>
        );
    };

    renderMessage = () => {
        const {state, message} = this.props;
        if (state === 0) {
            return this.renderContainer(<ActivityIndicator size='large'/>);
        } else if (state === 1) {
            return this.renderContainer(
                <View style={styles.innerContainer}>
                    <Icon name='check' size={64} color={colors.green}/>
                    <Text style={fonts.mediumText}>{message}</Text>
                    <Divider height={15} />
                    <TouchableOpacity style={{padding: 10, borderWidth: 2, borderColor: colors.green, borderRadius: 15,}} onPress={() => this.closeModal(state)}><Text style={[fonts.mediumText, {color: colors.green}]}>Tamam</Text></TouchableOpacity>
                </View>
            );
        } else if (state === 2) {
            return this.renderContainer(<Text>{message}</Text>);
        } else {
            return null;
        }
    };

    render() {
        return (
            this.renderMessage()
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: sizes.deviceWidth,
        height: sizes.deviceHeight,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 15,
    },
});

FlashMessageModal.propTypes = {
    state: PropTypes.number.isRequired,
    message: PropTypes.string.isRequired,
};

export default FlashMessageModal;