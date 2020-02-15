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

export default EmptyScreen;