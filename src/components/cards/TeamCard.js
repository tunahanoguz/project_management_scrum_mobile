import React, {Component, Fragment} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {colors, fonts} from "../../styles";
import Divider from "../Divider";
import {withNavigation} from 'react-navigation';

class TeamCard extends Component {

    goToTeamDetail = () => {
        const {id, members} = this.props.team;
        this.props.navigation.navigate('TeamDetail', {teamID: id, members: members});
    };

    render(){
        const {name, description} = this.props.team;
        return (
            <TouchableOpacity style={{...styles.container, ...this.props.style}} onPress={() => this.goToTeamDetail()}>
                <Text style={fonts.cardTitle}>{name}</Text>

                {description ? <Fragment><Divider height={10} /><Text style={fonts.normalText}>{description}</Text></Fragment> : null}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: colors.lightGray,
        padding: 15,
        borderRadius: 15,
        marginBottom: 15,
        marginHorizontal: 30,
    },
});

TeamCard.propTypes = {
    team: PropTypes.object.isRequired,
    style: PropTypes.object.isRequired,
};

export default withNavigation(TeamCard);