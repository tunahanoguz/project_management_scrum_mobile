import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

class RowContainer extends Component {

    style = {
        ...styles.container,
        ...this.props.style
    };

    render(){
        return (
            <View style={this.style}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});

InnerContainer.propTypes = {
    style: PropTypes.object.isRequired
};

export default RowContainer;