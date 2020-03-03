import React, {Component, Fragment} from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {colors, fonts, sizes} from "../../styles";
import Divider from "../Divider";
import Icon from "react-native-vector-icons/Feather";

class MessageModal extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.status === 1) {
    //         setTimeout(() => {
    //             props.setOpenState();
    //         }, 3000);
    //     }
    //
    //     return null;
    // }

    renderMessage = (status) => {
        if (status === 0) {
            return (
                <Fragment>
                    <ActivityIndicator size='large'/>
                    <Divider height={30}/>
                    <Text style={fonts.mediumText}>Yükleniyor.</Text>
                </Fragment>
            );
        } else if (status === 1) {
            return (
                <Fragment>
                    <Icon name='check' size={54} color={colors.darkGreen}/>
                    <Divider height={10}/>
                    <Text style={fonts.mediumText}>Başarılı!</Text>
                </Fragment>
            );
        } else if (status === 2) {
            return (
                <Fragment>
                    <Icon name='x' size={36} color={colors.lowPriorityDark}/>
                    <Divider height={30}/>
                    <Text style={fonts.mediumText}>Başarısız!</Text>
                </Fragment>
            );
        } else {
            return null;
        }
    };

    outerContainerStyle = (isOpen) => {
        if (isOpen) {
            return {
                bottom: 0,
                left: 0,
            };
        } else {
            return {
                bottom: -sizes.deviceHeight,
                left: -sizes.deviceWidth,
            };
        }
    };

    render() {
        const {isOpen, status} = this.props;
        console.log(status);
        if (isOpen) {
            return (
                <View style={[styles.outerContainer, this.outerContainerStyle(isOpen)]}>
                    <View style={styles.innerContainer}>
                        {this.renderMessage(status)}
                    </View>
                </View>
            );
        } else {
            return null;
        }
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        width: sizes.deviceWidth,
        height: sizes.deviceHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: -sizes.deviceHeight,
        left: -sizes.deviceWidth,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    innerContainer: {
        width: sizes.deviceWidth / 2.5,
        height: sizes.deviceWidth / 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: sizes.statusBarHeight + 56,
        backgroundColor: 'white',
        borderRadius: 15,
    },
});

MessageModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    setOpenState: PropTypes.func.isRequired,
    status: PropTypes.any.isRequired,
};

export default MessageModal;