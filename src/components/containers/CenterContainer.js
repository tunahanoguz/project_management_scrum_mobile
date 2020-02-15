import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

class CenterContainer extends Component {
    containerStyle = {
        ...styles.container,
        ...this.props.padding ? {padding: 30} : null,
    };

    render(){
        return (
            <View style={this.containerStyle}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});

CenterContainer.propTypes = {
    padding: PropTypes.bool.isRequired,
};

export default CenterContainer;