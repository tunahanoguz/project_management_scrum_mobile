import React, {Component} from 'react';
// import {View, Text,} from 'react-native';
import TopBar from "../../components/TopBar";
import {connect} from "react-redux";
import {deleteTeam, getAllTeams} from "../../actions/teamActions";
import {getAllUsers} from "../../actions/authActions";
import {Container} from "../../styles";
import List from "../../components/list/List";
import Button from "../../components/buttons/Button";
import ListActionModal from "../../components/modals/ListActionModal";

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

    toggleModal = () => {
        this.setState(state => ({isModalOpen: !state.isModalOpen}));
    };

    editTeamAction = () => {
        const {navigation} = this.props;
        const {selectedItemID} = this.state;
        navigation.navigate('EditTeam', {teamID: selectedItemID});
    };

    deleteTeamAction = () => {
        const {user, deleteTeam} = this.props;
        const {selectedItemID} = this.state;
        deleteTeam(user.uid, selectedItemID);
        this.toggleModal();
    };

    componentDidMount() {
        this.props.getAllTeams(this.props.user.uid);
        this.props.getAllUsers();
    }

    teamList = (loading, error, teams) => (
        <List orderColor='orangered' isFunctioned={true} modalFunc={this.setIsOpenModal} data={teams} type='team' loading={loading} error={error}/>
    );

    goToCreateTeam = () => {
        this.props.navigation.navigate('CreateTeam');
    };

    render() {
        const {isModalOpen} = this.state;
        const {loading, error, teams} = this.props;
        return (
            <Container>
                <TopBar isBack={false} title="Takımlar"/>

                <Container space>
                    <Container flex={0.8}>
                        {this.teamList(loading, error, teams)}
                    </Container>
                    <Container flex={0.2} verticalMiddle>
                        <Button color='purple' text="🤙 Takım Oluştur" action={this.goToCreateTeam}/>
                    </Container>
                </Container>

                <ListActionModal isOpen={isModalOpen} toggleFunc={this.setIsOpenModal} editText="Takımı Düzenle"
                                 editAction={this.editTeamAction} deleteText="Takımı Sil"
                                 deleteAction={this.deleteTeamAction}/>
            </Container>
        );
    }
}

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
        deleteTeam: (userID, teamID) => dispatch(deleteTeam(userID, teamID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamList);