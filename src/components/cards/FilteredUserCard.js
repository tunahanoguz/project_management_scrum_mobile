import React, {Component, Fragment} from 'react';
import {FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import ProfilePicture from "../ProfilePicture";
import Divider from "../Divider";
import {fonts} from "../../styles";
import Icon from "react-native-vector-icons/Feather";
import RoundedButton from "../buttons/RoundedButton";
import {roles} from "../../constants";

class FilteredUserCard extends Component {
    constructor() {
        super();

        this.state = {
            isOpen: false,
            selectedRole: null
        };
    }

    setSelectedRole = (index) => {
        this.setState({selectedRole: index});
        this.props.setStateFunc('selectedRole', index);
    };

    roleItem = (item, index) => {
        return (
            <TouchableOpacity key={index} onPress={() => this.setSelectedRole(index)}>
                <Text style={this.state.selectedRole === index ? fonts.mediumText : fonts.normalText}>{item.name}</Text>
                <Divider height={10}/>
            </TouchableOpacity>
        );
    };

    actionFunc = () => {
        this.props.action(this.props.user);
        this.setState({selectedRole: null, isOpen: false});
    };

    roleSelectionContainer = () => {
        return (
            <Fragment>
                <Divider height={10}/>
                <Text style={fonts.mediumText}>Bir rol seçiniz.</Text>
                <Divider height={10}/>

                <FlatList data={roles} renderItem={({item, index}) => this.roleItem(item, index)} keyExtractor={(item) => item.id.toString()} listKey={(item, index) => item.id.toString()}/>
                <RoundedButton color='purple' icon='check' pressFunc={() => this.actionFunc()} />
            </Fragment>
        );
    };

    pressFunc = () => {
        this.setState(state => ({isOpen: !state.isOpen}));
    };

    render(){
        const {fullName, photoURL} = this.props.user;
        return (
            <TouchableOpacity style={styles.cardStyle} onPress={() => this.pressFunc()}>
                <ProfilePicture picture={photoURL} size={60} />
                <Divider height={10}/>
                <Text style={fonts.mediumText}>{fullName}</Text>
                <Divider height={10}/>
                <Icon name='plus' size={24}/>
                {this.state.isOpen ? this.roleSelectionContainer() : null}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: 20,
        marginHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 10,
    },
});

FilteredUserCard.propTypes = {
    user: PropTypes.object.isRequired,
    action: PropTypes.func.isRequired,
    setStateFunc: PropTypes.func.isRequired,
};

export default FilteredUserCard;