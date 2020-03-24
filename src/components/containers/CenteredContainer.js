import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';

class CenteredContainer extends Component {
    render(){
        return (
            <View style={styles.container}>
                {this.props.children}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CenteredContainer;
