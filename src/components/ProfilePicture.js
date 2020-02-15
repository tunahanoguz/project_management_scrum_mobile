import React, {Component} from 'react';
import {View, Image} from 'react-native';
import PropTypes from 'prop-types';
import {colors} from "../styles";
import Icon from "react-native-vector-icons/Feather";

class ProfilePicture extends Component {
    imageStyle = {
        width: this.props.size,
        height: this.props.size,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: this.props.borderRadius,
        backgroundColor: colors.lightGray,
    };

    render() {
        const {picture, iconColor} = this.props;
        if (picture === null || picture === "") {
            return <View style={this.imageStyle}><Icon name='user' size={24} color={iconColor}/></View>;
        } else {
            return <Image source={{uri: picture}} style={this.imageStyle}/>;
        }
    }
}

ProfilePicture.defaultProps = {
    iconColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 100,
};

ProfilePicture.propTypes = {
    picture: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    iconColor: PropTypes.string,
    borderRadius: PropTypes.number,
};

export default ProfilePicture;