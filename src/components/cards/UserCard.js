import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types'
import {withNavigation} from 'react-navigation';
import ProfilePicture from "../ProfilePicture";
import {fonts, sizes} from "../../styles";

class UserCard extends Component {

    goToUserProfile = (user) => {
        this.props.navigation.navigate('UserProfile', {user: user});
    };

    render() {
        const {user, style} = this.props;
        const {fullName, photoURL, role} = user;
        return (
            <TouchableOpacity style={{...styles.container, ...style}} onPress={() => this.goToUserProfile(user)}>
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
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F5FA',
    },
    innerContainer: {
        justifyContent: 'center',
        marginLeft: 20,
    },
});

UserCard.propTypes = {
    user: PropTypes.object.isRequired,
    role: PropTypes.string.isRequired,
    style: PropTypes.object,
};

export default withNavigation(UserCard);