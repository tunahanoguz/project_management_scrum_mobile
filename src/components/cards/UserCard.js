import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types'
import {withNavigation} from 'react-navigation';
import ProfilePicture from "../ProfilePicture";
import {fonts} from "../../styles";

class UserCard extends Component {

    goToUserProfile = (user) => {
        this.props.navigation.navigate('UserProfile', {user: user});
    };

    render() {
        const {fullName, photoURL, role} = this.props.user;
        return (
            <TouchableOpacity style={{...styles.container, ...this.props.style}} onPress={() => this.goToUserProfile(this.props.user)}>
                <ProfilePicture picture={photoURL} size={54}/>
                <View style={styles.innerContainer}>
                    <Text style={fonts.cardTitle}>{fullName}</Text>
                    <Text style={fonts.normalText}>{role}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
    },
    innerContainer: {
        justifyContent: 'center',
        marginLeft: 10,
    },
});

UserCard.propTypes = {
    user: PropTypes.object.isRequired,
    role: PropTypes.string.isRequired,
    style: PropTypes.object,
};

export default withNavigation(UserCard);