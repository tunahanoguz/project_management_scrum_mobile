import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

class InnerContainer extends Component {

    style = {
        ...styles.container,
        padding: this.props.padding,
        // ...this.props.paddingTop ? {paddingTop: this.props.paddingTop} : null,
        // ...this.props.paddingRight ? {paddingRight: this.props.paddingRight} : null,
        // ...this.props.paddingBottom ? {paddingBottom: this.props.paddingBottom} : null,
        // ...this.props.paddingLeft ? {paddingLeft: this.props.paddingLeft} : null,
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
        flex: 1,
        justifyContent: 'flex-start',
    },
});

InnerContainer.defaultProps = {
    padding: 30,
};

InnerContainer.propTypes = {
    padding: PropTypes.number,
    paddingTop: PropTypes.number,
    paddingRight: PropTypes.number,
    paddingBottom: PropTypes.number,
    paddingLeft: PropTypes.number,
};

export default InnerContainer;