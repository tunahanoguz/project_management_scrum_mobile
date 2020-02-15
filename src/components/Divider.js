import React, {Component} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';

class Divider extends Component {
    render(){
        return (
            <View style={{height: this.props.height}} />
        );
    }
}

Divider.propTypes = {
    height: PropTypes.number,
};

export default Divider;