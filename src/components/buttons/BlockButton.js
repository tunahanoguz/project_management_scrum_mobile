import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Feather";
import {gradients} from "../../styles";

class BlockButton extends Component {
    gradient = (color) => {
        if (color === "green"){
            return gradients.greenGradient;
        } else if (color === "gray"){
            return gradients.grayGradient;
        } else if (color === "orange"){
            return gradients.orangeGradient;
        } else {
            return gradients.purpleGradient;
        }
    };

    sideStyle = (side) => {
        if (side === "left"){
            return {
                ...styles.buttonContainer,
                marginRight: 10,
            };
        } else if (side === "right"){
            return {
                ...styles.buttonContainer,
                marginLeft: 10,
            };
        } else {
            return null;
        }
    };

    render() {
        const {color, side, icon, iconColor, iconSize, text, textColor, pressFunc} = this.props;
        return (
            <TouchableOpacity onPress={() => pressFunc()} style={this.sideStyle(side)}>
                <LinearGradient
                    colors={this.gradient(color)}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    style={styles.buttonInnerContainer}
                >
                    <Icon
                        name={icon}
                        size={iconSize ? iconSize : 24}
                        color={iconColor}
                        style={styles.buttonIcon}/>
                    <Text style={{color: textColor, ...styles.buttonText}}>{text}</Text>
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
