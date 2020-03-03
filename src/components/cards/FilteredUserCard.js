import React, {Component, Fragment} from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import ProfilePicture from "../ProfilePicture";
import Divider from "../Divider";
import {fonts, sizes} from "../../styles";
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
                <View style={{flexDirection: 'row',}}>
                    {this.state.selectedRole === index ? <Icon name='arrow-right' size={16} style={{marginRight: 4,}} /> : null}
                    <Text style={this.state.selectedRole === index ? fonts.mediumText : fonts.normalText}>{item.name}</Text>
                </View>
                <Divider height={8}/>
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

                <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 20,}}>
                    <FlatList data={roles} renderItem={({item, index}) => this.roleItem(item, index)} keyExtractor={(item) => item.id.toString()} listKey={(item, index) => item.id.toString()}/>
                    <RoundedButton color='purple' icon='check' pressFunc={() => this.actionFunc()} />
                </View>
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
                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                    <ProfilePicture picture={photoURL} size={60} />
                    <Text style={[fonts.mediumText, {fontSize: 16, marginLeft: 10,}]}>{fullName}</Text>
                </View>
                {this.state.isOpen ? this.roleSelectionContainer() : null}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        width: sizes.deviceWidth - 60,
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
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