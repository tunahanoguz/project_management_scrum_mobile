import React, {Component, Fragment} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import TopBar from "../../components/TopBar";
import {Container, container, fonts, InnerContainer, Text, Title} from "../../styles";
import Divider from "../../components/Divider";
import UserCard from "../../components/cards/UserCard";
import Icon from "react-native-vector-icons/Feather";
import {getSingleTeam, getTeamMembers} from "../../actions/teamActions";
import {connect} from "react-redux";
import {ActivityIndicator} from "react-native-paper";
import DoubleButton from "../../components/buttons/DoubleButton";
import {getProjectsForTeam} from "../../actions/projectActions";

class TeamDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            membersArray: [],
        };
    }

    componentDidMount() {
        const {getSingleTeam, getTeamMembers, getProjectsForTeam, navigation} = this.props;
        const teamID = navigation.getParam("teamID", "");
        const members = navigation.getParam("members", "");
        getSingleTeam(teamID);
        getTeamMembers(members);
        getProjectsForTeam(teamID);
    }

    // setMembersArray = (members) => {
    //     if (members.length !== 0)
    //         this.setState({memberArray: members});
    // };

    members = () => {
        // Get members from redux
        let teamMembers = this.props.teamMembers;
        teamMembers = teamMembers.slice(0, 5);

        // Get member roles
        const members = this.props.navigation.getParam("members", "");
        let memberRoles = [];
        members.map(member => memberRoles.push(member.role));

        // Create new members array with member roles
        let newMembers = [];
        teamMembers.map((tm) => {
            members.map(member => {
                if (tm.id === member.id){
                    const newMember = {
                        id: tm.id,
                        fullName: tm.fullName,
                        role: member.role,
                        photoURL: tm.photoURL,
                    };

                    newMembers.push(newMember);
                }
            });
        });

        // Render member list
        if (teamMembers.length === 0) {
            return <Text style={fonts.mediumText}>Henüz hiç üye yok.</Text>;
        } else {
            return (
                <Fragment>
                    <FlatList data={newMembers}
                              renderItem={({item, index}) => <UserCard user={item} role={members[index]?.role}/>}
                              keyExtractor={(item, index) => index.toString()}/>

                    <Divider height={20} />

                    <TouchableOpacity style={styles.moreContainer} onPress={() => this.goToTeamMemberList(newMembers)}>
                        <Icon name='arrow-down' size={24} color='rgba(0, 0, 0, 0.4)'/>
                    </TouchableOpacity>

                    <Divider height={10} />
                </Fragment>
            );
        }
    };

    goToTeamMemberList = (members) => {
        this.props.navigation.navigate('TeamMembers', {members});
    };

    goToTeamProjects = (teamID) => {
        this.props.navigation.navigate('TeamProjectsList', {teamID});
    };

    render() {
        const {newMembers} = this.state;
        const {loading, team, projects} = this.props;
        const {id, name, description, members} = team;
        return (
            <Container>
                <TopBar isBack={true}/>

                <InnerContainer space nonRadius>
                    <Title>{name}</Title>
                    <Divider height={10} />
                    <Text medium>{description}</Text>
                </InnerContainer>

                <Container space>
                    <DoubleButton firstText={members ? `🤝 ${members.length} ÜYE` : 0 + " ÜYE"} secondText={`💼 ${projects?.length} Proje`} firstColor='purple' secondColor='orange' firstAction={() => this.goToTeamMemberList(newMembers)} secondAction={() => this.goToTeamProjects(id)}/>

                    <Divider height={30} />

                    <InnerContainer>
                        {loading ? <View style={container.centerContainer}><ActivityIndicator/></View> : this.members()}
                    </InnerContainer>
                </Container>

                {/*<View style={styles.secondContainer}>*/}
                {/*    <View style={styles.titleContainer}>*/}
                {/*        <Text style={{...fonts.title, color: 'white'}}>{name}</Text>*/}
                {/*        <Text style={{...fonts.normalText, color: 'white'}}>{description}</Text>*/}

                {/*        <Divider height={10}/>*/}

                {/*        <View style={styles.numbersContainer}>*/}
                {/*            <TouchableOpacity style={styles.numberContainer} onPress={() => this.goToTeamMemberList()}>*/}
                {/*                <View style={styles.iconContainer}>*/}
                {/*                    <Icon name='users' size={18} color='white'/>*/}
                {/*                </View>*/}
                {/*                <View style={styles.numberRightContainer}>*/}
                {/*                    <Text style={styles.numberText}>{members ? members.length : 0}</Text>*/}
                {/*                    <Text style={styles.numberCategoryText}>Üye</Text>*/}
                {/*                </View>*/}
                {/*            </TouchableOpacity>*/}

                {/*            <View style={styles.divider}/>*/}
                {/*            <View style={styles.numberContainer}>*/}
                {/*                <View style={styles.iconContainer}>*/}
                {/*                    <Icon name='briefcase' size={18} color='white'/>*/}
                {/*                </View>*/}
                {/*                <View style={styles.numberRightContainer}>*/}
                {/*                    <Text style={styles.numberText}>23</Text>*/}
                {/*                    <Text style={styles.numberCategoryText}>Proje</Text>*/}
                {/*                </View>*/}
                {/*            </View>*/}
                {/*        </View>*/}
                {/*    </View>*/}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#060518',
    },
    secondContainer: {
        flex: 1,
        backgroundColor: '#3f38dd',
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
    },
    titleContainer: {
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    thirdContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 30,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
    },
    membersContainer: {
        flexDirection: 'row',
    },
    numbersContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    },
    numberContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: 'rgba(0, 0 , 0, 0.2)',
        padding: 8,
        borderRadius: 8,
        marginRight: 15,
    },
    numberRightContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    numberText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 28,
        color: 'white',
        includeFontPadding: false,
    },
    numberCategoryText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        color: 'white',
    },
    divider: {
        width: 3,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        marginHorizontal: 30,
        borderRadius: 100,
    },
    moreContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        paddingVertical: 5,
        borderRadius: 15,
    },
});

const mapStateToProps = state => {
    return {
        team: state.teamReducer.team,
        teamMembers: state.teamReducer.teamMembers,
        loading: state.teamReducer.loading,
        error: state.teamReducer.error,
        projects: state.projectReducer.projects,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSingleTeam: (teamID) => dispatch(getSingleTeam(teamID)),
        getTeamMembers: (teamID) => dispatch(getTeamMembers(teamID)),
        getProjectsForTeam: (teamID) => dispatch(getProjectsForTeam(teamID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetail);