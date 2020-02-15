import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Feather";
import {gradients} from "../../styles";

class BlockButton extends Component {
    gradient = () => {
        if (this.props.color === "green"){
            return gradients.greenGradient;
        } else if (this.props.color === "gray"){
            return gradients.grayGradient;
        } else {
            return gradients.purpleGradient;
        }
    };

    sideStyle = () => {
        if (this.props.side === "left"){
            return {
                ...styles.buttonContainer,
                marginRight: 10,
            };
        } else if (this.props.side === "right"){
            return {
                ...styles.buttonContainer,
                marginLeft: 10,
            };
        } else {
            return null;
        }
    };

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.pressFunc()} style={this.sideStyle()}>
                <LinearGradient colors={this.gradient()} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.buttonInnerContainer}>
                    <Icon name={this.props.icon} size={this.props.iconSize ? this.props.iconSize : 24} color={this.props.iconColor} style={styles.buttonIcon}/>
                    <Text style={{color: this.props.textColor, ...styles.buttonText}}>{this.props.text}</Text>
                </LinearGradient>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
    },
    buttonInnerContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 14,
        borderRadius: 15,
    },
    buttonIcon: {
        marginRight: 4,
    },
    buttonText: {
        fontFamily: 'Poppins-Medium',
        includeFontPadding: false,
    },
});

BlockButton.defaultProps = {
    textColor: 'white',
    iconColor: 'white',
};

BlockButton.propTypes = {
    color: PropTypes.string.isRequired,
    side: PropTypes.string,
    icon: PropTypes.string.isRequired,
    iconColor: PropTypes.string.isRequired,
    iconSize: PropTypes.number,
    text: PropTypes.string.isRequired,
    textColor: PropTypes.string,
    pressFunc: PropTypes.func.isRequired,
};

export default BlockButton;