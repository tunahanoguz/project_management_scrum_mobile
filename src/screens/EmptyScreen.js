import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

class EmptyScreen extends Component {
    render(){
        return (
            <Text>Hey!</Text>
        );
    }
}

const styles = StyleSheet.create({});

// const mapStateToProps = state => {
//     return {};
// };
//
// const mapDispatchToProps = dispatch => {
//     return {};
// };

export default EmptyScreen;