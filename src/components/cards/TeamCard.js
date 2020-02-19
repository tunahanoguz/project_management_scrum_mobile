import React, {Component, Fragment} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {colors, fonts} from "../../styles";
import Divider from "../Divider";
import {withNavigation} from 'react-navigation';
import Icon from "react-native-vector-icons/Feather";

class TeamCard extends Component {

    goToTeamDetail = () => {
        const {id, members} = this.props.team;
        this.props.navigation.navigate('TeamDetail', {teamID: id, members: members});
    };

    render(){
        const {id, name, members} = this.props.team;
        return (
            <View style={{...styles.container, ...this.props.style}}>
                <TouchableOpacity style={styles.rowContainer} onPress={() => this.goToTeamDetail()}>
                    <View style={styles.projectOrder}>
                        <Text style={styles.projectOrderText}>{this.props.order + 1}</Text>
                    </View>
                    <View>
                        <Text style={fonts.cardTitle}>{name}</Text>
                        <Text style={fonts.normalText}>{members?.length} Üye</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.openActionModal(id)}>
                    <Icon name='more-vertical' size={24} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    rowContainer: {
        flexDirection: 'row',
    },
    projectOrder: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#FFEAC5',
        marginRight: 20,
        borderRadius: 15,
    },
    projectOrderText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 26,
        includeFontPadding: false,
    },
});

TeamCard.propTypes = {
    team: PropTypes.object.isRequired,
    order: PropTypes.number.isRequired,
    style: PropTypes.object.isRequired,
    openActionModal: PropTypes.func.isRequired,
};

export default withNavigation(TeamCard);