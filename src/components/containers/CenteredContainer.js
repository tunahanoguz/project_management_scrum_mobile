import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

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

// const mapStateToProps = state => {
//     return {};
// };
//
// const mapDispatchToProps = dispatch => {
//     return {};
// };

export default CenteredContainer;