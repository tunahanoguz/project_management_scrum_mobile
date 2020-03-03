import React, {Component} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from "../styles";

class Loading extends Component {
    render(){
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lightGray,
        marginTop: 10,
        padding: 30,
        borderRadius: 15,
    },
});

export default Loading;