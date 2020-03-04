import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {profilePhotoColors} from "../styles";
import Icon from "react-native-vector-icons/Feather";
import styled from 'styled-components';

class ProfilePicture extends Component {
    render() {
        const {picture, size} = this.props;
        if (picture === null || picture === "") {
            return (
                <ProfilePicturePresenter size={size}>
                    <Icon name='user' size={24} color='white'/>
                </ProfilePicturePresenter>
            );
        } else {
            return <StyledProfilePicture size={size} source={{uri: picture}}/>;
        }
    }
}

const ProfilePicturePresenter = styled.View`
    width: ${({size}) => size ? size : 50}px;
    height: ${({size}) => size ? size : 50}px;
    justify-content: center;
    align-items: center;
    background-color: ${profilePhotoColors[0]};
    border-radius: ${({radius}) => radius ? radius : 100}px;
`;

const StyledProfilePicture = styled.Image`
    width: ${({size}) => size ? size : 50}px;
    height: ${({size}) => size ? size : 50}px;
    border-radius: ${({radius}) => radius ? radius : 100}px;
`;

ProfilePicture.defaultProps = {
    iconColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 100,
};

ProfilePicture.propTypes = {
    picture: PropTypes.any.isRequired,
    size: PropTypes.number.isRequired,
    iconColor: PropTypes.string,
    borderRadius: PropTypes.number,
};

export default ProfilePicture;
