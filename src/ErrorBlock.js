import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Feather";
import {colors, fonts} from "./styles";
import Divider from "./components/Divider";

class ErrorBlock extends Component {
    render(){
        return (
            <View style={styles.container}>
                <Icon name='x' size={36} />
                <Divider height={20} />
                <Text style={fonts.mediumText}>{this.props.error}</Text>
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

ErrorBlock.propTypes = {
    error: PropTypes.string,
};

export default ErrorBlock;