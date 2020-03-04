import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import LinearGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Feather";
import {gradients} from "../../styles";

class RoundedButton extends Component {
    gradient = (color) => {
        if (color === "green") {
            return gradients.greenGradient;
        } else if (color === 'purple') {
            return gradients.purpleGradient;
        } else if (color === 'dark') {
            return gradients.darkGradient;
        } else {
            return gradients.grayGradient
        }
    };

    render() {
        const {size, color, icon, iconSize, disabled, pressFunc} = this.props;
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => pressFunc()}
                    disabled={disabled}
                >
                    <LinearGradient
                        colors={this.gradient(color)}
                        style={[styles.buttonLinearGradient, {width: size, height: size}]}
                    >
                        <Icon
                            name={icon}
                            size={iconSize ? iconSize : 24}
                            color="white"
                        />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonLinearGradient: {
        paddingVertical: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

RoundedButton.defaultProps = {
    size: 50,
};

RoundedButton.propTypes = {
    size: PropTypes.number,
    color: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    iconSize: PropTypes.number,
    disabled: PropTypes.bool,
    pressFunc: PropTypes.func.isRequired,
};

export default RoundedButton;
