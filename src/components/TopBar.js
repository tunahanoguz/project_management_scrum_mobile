import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, StatusBar} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import {withNavigation} from 'react-navigation';
import {container, sizes} from '../styles';
import {connect} from "react-redux";

class TopBar extends Component {
    constructor(props) {
        super(props);
    }

    goToBack = () => {
        this.props.navigation.goBack(this.props.navigation.state.key);
    };

    goToProfile = () => {
        this.props.navigation.navigate('MyProfile');
    };

    topBarLeft = () => {
        if (this.props.isBack){
            return (
                <TouchableOpacity onPress={() => this.goToBack()}>
                    <Icon name='arrow-left' size={24} color='white' />
                </TouchableOpacity>
            );
        } else {
            return (
                <Text style={styles.topBarTitle}>{this.props.title}</Text>
            );
        }
    };

    topBarRight = () => {
        const photo = this.props.user.photoURL;

        if (photo){
            return (
                <TouchableOpacity onPress={() => this.goToProfile()}>
                    <Image source={{uri: photo}} style={styles.profilePhoto} />
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity style={styles.profileView} onPress={() => this.goToProfile()}>
                    <Icon name='user' width={100} color='white' />
                </TouchableOpacity>
            );
        }
    };

    render(){
        return (
            <View style={styles.topBarContainer}>
                <StatusBar backgroundColor='transparent' translucent={true} />
                {this.topBarLeft()}
                {this.topBarRight()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    topBarContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#060518',
        paddingTop: 10 + sizes.statusBarHeight,
        paddingBottom: 10,
        paddingHorizontal: 30
    },
    topBarTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        color: 'white',
        includeFontPadding: false,
    },
    profilePhoto: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    profileView: {
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 100,
        ...container.centerContainer,
    },
});

TopBar.propTypes = {
    isBack: PropTypes.bool.isRequired,
    title: PropTypes.string,
};

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
    }
};

export default connect(mapStateToProps, null)(withNavigation(TopBar));