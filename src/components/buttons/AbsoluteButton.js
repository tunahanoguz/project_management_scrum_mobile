import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Animated} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Feather";
import {colors} from "../../styles";

class AbsoluteButton extends Component {
    buttonStyle = {
        ...styles.button,
        ...this.props?.style,
        backgroundColor: this.props.backgroundColor,
    };

    render() {
        if (this.props.animated) {
            return (
                <TouchableOpacity style={this.buttonStyle} onPress={() => this.props.pressFunc()} activeOpacity={0.8}>
                    <Icon name={this.props.icon} size={20} color={this.props.iconColor}/>
                </TouchableOpacity>
            );
        } else {
            const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
            return (
                <AnimatedTouchableOpacity style={this.buttonStyle} onPress={() => this.props.pressFunc()} activeOpacity={0.8}>
                    <Icon name={this.props.icon} size={20} color={this.props.iconColor}/>
                </AnimatedTouchableOpacity>
            );
        }
    }
}

const styles = StyleSheet.create({
    button: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 100,
    },
});

AbsoluteButton.defaultProps = {
    iconColor: 'white',
};

AbsoluteButton.propTypes = {
    style: PropTypes.object,
    backgroundColor: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    iconColor: PropTypes.string,
    pressFunc: PropTypes.func.isRequired,
};

export default AbsoluteButton;