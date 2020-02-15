import React, {Component} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import ProfilePicture from "../ProfilePicture";
import Divider from "../Divider";
import {colors, fonts} from "../../styles";
import Icon from "react-native-vector-icons/Feather";

class AddedUserCard extends Component {
    render() {
        const {photoURL, fullName, role} = this.props.user;
        return (
            <TouchableOpacity style={styles.cardStyle} onPress={() => this.props.action(this.props.user)}>
                <ProfilePicture picture={photoURL} size={60} iconColor='white' />
                <Divider height={10}/>
                <Text style={styles.text}>{fullName}</Text>
                <Divider height={10}/>
                <Text style={styles.text}>{role}</Text>
                <Divider height={10}/>
                <Icon name='x' size={24} color='white'/>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#21bf73',
        marginBottom: 20,
        marginHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 10,
    },
    text: {
        ...fonts.mediumText,
        color: 'white',
    }
});

AddedUserCard.propTypes = {
    user: PropTypes.object.isRequired,
    action: PropTypes.func.isRequired,
};

export default AddedUserCard;