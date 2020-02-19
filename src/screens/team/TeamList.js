import React, {Component} from 'react';
import {View, TouchableOpacity, Text, FlatList, StyleSheet,} from 'react-native';
import TopBar from "../../components/TopBar";
import TeamCard from "../../components/cards/TeamCard";
import Icon from "react-native-vector-icons/Feather";
import {connect} from "react-redux";
import {getAllTeams} from "../../actions/teamActions";
import {getAllUsers} from "../../actions/authActions";
import {ActivityIndicator} from "react-native-paper";
import {colors} from "../../styles";
import ListActionsModal from "../../components/modals/ListActionsModal";

class TeamList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            selectedItemID: "",
        };
    }

    setIsOpenModal = (itemID) => {
        this.setState(state => ({isModalOpen: !state.isModalOpen, selectedItemID: itemID}));
    };

    componentDidMount(){
        this.props.getAllTeams(this.props.user.uid);
        this.props.getAllUsers();
    }

    teamList = (teams) => (
        <FlatList data={teams} renderItem={({item, index}) => {
            let style = {};
            if (index === 0){
                style = {marginTop: 15};
            }

            return (<TeamCard team={item} order={index} style={style} openActionModal={this.setIsOpenModal}/>);
        }}
                  keyExtractor={(item, index) => index.toString()}/>
    );

    goToCreateTeam = () => {
        this.props.navigation.navigate('CreateTeam');
    };

    renderTeamList = () => {
        const {loading, error, teams} = this.props;
        if (loading){
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}><ActivityIndicator size='large'/></View>
            );
        } else if (teams !== []) {
            return this.teamList(teams);
        } else {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}><Text>{error}</Text></View>
            );
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <TopBar isBack={false} title="Takımlar"/>

                {this.renderTeamList()}

                <TouchableOpacity style={{width: 50, height: 50, backgroundColor: colors.purple, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 10, bottom: 10, borderRadius: 100}} activeOpacity={0.6} onPress={() => this.goToCreateTeam()}>
                    <Icon name='plus' size={24} color='white' />
                </TouchableOpacity>

                <ListActionsModal isOpen={this.state.isModalOpen} action={this.setIsOpenModal} selectedItemID={this.state.selectedItemID} name='Süper takım' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
});

const mapStateToProps = state => {
    return {
        teams: state.teamReducer.teams,
        loading: state.teamReducer.loading,
        error: state.teamReducer.error,
        user: state.authReducer.user,
        users: state.authReducer.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllTeams: (userID) => dispatch(getAllTeams(userID)),
        getAllUsers: () => dispatch(getAllUsers()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);