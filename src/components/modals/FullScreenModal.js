import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Animated} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import RoundedButton from "../buttons/RoundedButton";
import PropTypes from 'prop-types';
import Divider from "../Divider";

class FullScreenModal extends Component {
    containerStyle = {
        ...styles.container,
        bottom: this.props.bottom,
    };

    render(){
        return (
            <Animated.View style={this.containerStyle}>
                <TouchableOpacity onPress={() => this.props.toggleFunc('isPriorityModalOpen', !this.props.bottom)}>
                    <Icon name='x' size={36} style={{textAlign: 'right'}}/>
                </TouchableOpacity>
                <Divider height={10} />
                {this.props.children}
                <RoundedButton color='purple' icon='check' pressFunc={() => this.props.modalFunc()}/>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '200%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#F2F2F2',
        paddingVertical: 60,
        paddingHorizontal: 30,
    },
});

FullScreenModal.propTypes = {
    bottom: PropTypes.number.isRequired,
    toggleFunc: PropTypes.func.isRequired,
    modalFunc: PropTypes.func.isRequired,
};

export default FullScreenModal;