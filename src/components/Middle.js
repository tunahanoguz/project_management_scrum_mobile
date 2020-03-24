import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

class Middle extends Component {
    render(){
        return (
            <View style={styles.middleContainer}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    middleContainer: {
        alignItems: 'center',
    },
});

export default Middle;
