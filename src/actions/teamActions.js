import {
    GET_SINGLE_TEAM_SUCCESS,
    GET_SINGLE_TEAM_FAILURE,
    GET_ALL_TEAMS_START,
    GET_ALL_TEAMS_SUCCESS,
    GET_ALL_TEAMS_FAILURE,
    GET_ALL_CREATED_TEAMS_START,
    GET_ALL_CREATED_TEAMS_SUCCESS,
    GET_ALL_CREATED_TEAMS_FAILURE,
    CREATE_TEAM_SUCCESS,
    CREATE_TEAM_FAILURE,
    GET_TEAM_MEMBERS_SUCCESS,
    GET_TEAM_MEMBERS_FAILURE,
    GET_TEAM_MEMBERS_START,
    DELETE_TEAM_START,
    DELETE_TEAM_FAILURE,
    GET_TEAMS_FOR_HOME_START,
    GET_TEAMS_FOR_HOME_SUCCESS,
    GET_TEAMS_FOR_HOME_FAILURE,
    GET_TEAM_USERS_ID_START, GET_TEAM_USERS_ID_SUCCESS, GET_TEAM_USERS_ID_FAILURE,
} from "./types";
import firestore from '@react-native-firebase/firestore';
import {createNotification, sendNotifications} from "./notificationActions";

export const getSingleTeam = teamID => dispatch => {
    const teamsRef = firestore().collection('teams');
    teamsRef.doc(teamID).get()
        .then(doc => {
            const team = {id: doc.id, ...doc.data()};
            dispatch({type: GET_SINGLE_TEAM_SUCCESS, team: team})
        })
        .catch(() => dispatch({type: GET_SINGLE_TEAM_FAILURE, error: "Takım getirilemedi."}));
};

export const getAllTeams = (userID) => dispatch => {
    dispatch({type: GET_ALL_TEAMS_START, loading: true});

    let teams = [];
    let teamIDs = [];
    firestore().collection('teams').get()
        .then(snapshot => {
            if (snapshot.empty) {
                dispatch({type: GET_ALL_TEAMS_FAILURE, error: "Hiç takımınız yok."})
            }

            snapshot.forEach(doc => {
                const docID = {id: doc.id};
                const teamData = doc.data();

                if (teamData.members[0].id === userID) {
                    const team = Object.assign(docID, teamData);
                    teams.push(team);
                    teamIDs.push(team.id);
                }
            });

            dispatch({type: GET_ALL_TEAMS_SUCCESS, teams: teams, teamIDs: teamIDs});
        })
        .catch(() => dispatch({type: GET_ALL_TEAMS_FAILURE, error: "Takımlar getirilemedi."}));
};

export const getTeamsForHomeScreen = (userID) => dispatch => {
    dispatch({type: GET_TEAMS_FOR_HOME_START, loading: true});

    firestore().collection('teams').limit(3).get()
        .then(snapshot => {
            if (snapshot.empty) {
                dispatch({type: GET_TEAMS_FOR_HOME_FAILURE, error: "Hiç takımınız yok."})
            }

            let teams = [];
            snapshot.forEach(doc => {
                const docID = doc.id;
                const teamData = doc.data();

                if (teamData.members[0].id === userID) {
                    const team = {id: docID, ...teamData};
                    teams.push(team);
                }
            });

            dispatch({type: GET_TEAMS_FOR_HOME_SUCCESS, teams});
        })
        .catch(() => dispatch({type: GET_TEAMS_FOR_HOME_FAILURE, error: "Takımlar getirilemedi."}));
};

export const getAllCreatedTeams = (userID) => dispatch => {
    dispatch({type: GET_ALL_CREATED_TEAMS_START, loading: true});
    let createdTeams = [];

    firestore().collection('teams').where('createdBy', '==', userID).get()
        .then(snapshot => {
            if (snapshot.empty) {
                dispatch({type: GET_ALL_CREATED_TEAMS_FAILURE, error: "Hiç takımınız yok."})
            }

            snapshot.forEach(doc => {
                const docID = {id: doc.id};
                const teamData = doc.data();
                const team = Object.assign(docID, teamData);

                createdTeams.push(team);
            });

            dispatch({type: GET_ALL_CREATED_TEAMS_SUCCESS, createdTeams: createdTeams});
        })
        .catch(() => dispatch({type: GET_ALL_CREATED_TEAMS_FAILURE, error: "Takımlar getirilemedi."}));
};

export const createTeam = (teamName, teamDescription, members, userID) => dispatch => {
    firestore().collection('teams').add({
        name: teamName,
        description: teamDescription,
        createdAt: new Date(),
        createdBy: userID,
        members: members
    })
        .then(() => {
            const userIDs = [];
            members.map(member => {
                userIDs.push(member.id);
            });

            dispatch(getAllTeams(userID));
            dispatch(createNotification(userIDs, "team", "İçerisinde bulunduğunuz bir takım oluşturuldu."));
            dispatch(sendNotifications(userIDs, "Takım Oluşturuldu!", "İçerisinde bulunduğunuz bir takım oluşturuldu."));
        })
        .catch(() => dispatch({type: CREATE_TEAM_FAILURE, error: "Takım oluşturulamadı."}));
};

// export const createTeamMembers = (teamID, members) => dispatch => {
//     const teamMembersRef = firestore().collection('teamMembers');
//     members.map(member => {
//         teamMembersRef.add({
//             userID: member.id,
//             role: member.role,
//             teamID: teamID,
//         });
//     });
// };

export const getTeamMembers = (members) => dispatch => {
    dispatch({type: GET_TEAM_MEMBERS_START});

    let users = [];
    let userIDs = [];
    members.map(member => userIDs.push(member.id));

    const userRef = firestore().collection('users');
    const userQuery = userRef.where('id', 'in', userIDs);
    userQuery.get()
        .then(snapshot => {
            snapshot.forEach(doc => users.push(doc.data()));
        })
        .then(() => dispatch({type: GET_TEAM_MEMBERS_SUCCESS, teamMembers: users}))
        .catch(() => dispatch({type: GET_TEAM_MEMBERS_FAILURE, error: "Takım üyeleri getirilemedi."}));
};

export const deleteTeam = (userID, teamID) => dispatch => {
    dispatch({type: DELETE_TEAM_START});

    const teamRef = firestore().collection('teams');
    teamRef.doc(teamID).delete()
        .then(() => dispatch(getAllTeams(userID)))
        .catch(() => dispatch({type: DELETE_TEAM_FAILURE, error: "Takım silinirken bir hata oluştu."}));
};

export const getTeamUserIDs = (teamID) => dispatch => {
    dispatch({type: GET_TEAM_USERS_ID_START});

    const teamRef = firestore().collection('teams');
    const teamQuery = teamRef.doc(teamID);
    teamQuery.get()
        .then(doc => {
            const {members} = doc.data();
            const userIDs = [];

            if (members.length !== 0){
                members.map(member => userIDs.push(member.id));
            }

            dispatch({type: GET_TEAM_USERS_ID_SUCCESS, userIDs});
        })
        .catch(() => dispatch({type: GET_TEAM_USERS_ID_FAILURE, error: ""}));
};
