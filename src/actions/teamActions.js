import firestore from '@react-native-firebase/firestore';
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
    GET_TEAM_USERS_ID_START,
    GET_TEAM_USERS_ID_SUCCESS,
    GET_TEAM_USERS_ID_FAILURE,
    GET_TEAM_DESCRIPTION_REQUEST,
    GET_TEAM_DESCRIPTION_SUCCESS,
    GET_TEAM_DESCRIPTION_FAILURE,
    EDIT_TEAM_DESCRIPTION_REQUEST,
    EDIT_TEAM_DESCRIPTION_SUCCESS,
    EDIT_TEAM_DESCRIPTION_FAILURE,
} from "./types/teamTypes";
import {createNotification, sendNotifications} from "./notificationActions";
import {
    EDIT_PROJECT_DESCRIPTION_FAILURE,
    EDIT_PROJECT_DESCRIPTION_REQUEST,
    EDIT_PROJECT_DESCRIPTION_SUCCESS,
    GET_PROJECT_DESCRIPTION_FAILURE,
    GET_PROJECT_DESCRIPTION_REQUEST,
    GET_PROJECT_DESCRIPTION_SUCCESS
} from "./types/projectTypes";
import {getProjectDescription, getSingleProject} from "./projectActions";

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
                const members = teamData.members;
                const isMemberOkay = members.filter(member => member.id === userID);


                if (isMemberOkay.length !== 0) {
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

    firestore().collection('teams').get()
        .then(snapshot => {
            if (snapshot.empty) {
                dispatch({type: GET_TEAMS_FOR_HOME_FAILURE, error: "Hiç takımınız yok."})
            }

            let teams = [];
            snapshot.forEach(doc => {
                const docID = doc.id;
                const teamData = doc.data();
                const members = teamData.members;
                const isMemberOkay = members.filter(member => member.id === userID);

                if (isMemberOkay.length !== 0) {
                    const team = {id: docID, ...teamData};
                    teams.push(team);
                }
            });

            const newTeams = teams.slice(0, 3);

            dispatch({type: GET_TEAMS_FOR_HOME_SUCCESS, teams: newTeams});
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

    console.log(members);

    let users = [];
    let userIDs = [];
    members?.map(member => userIDs.push(member.id));

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

export const getTeamDescription = (teamID) => dispatch => {
    dispatch({type: GET_TEAM_DESCRIPTION_REQUEST});

    const teamRef = firestore().collection('teams');
    teamRef.doc(teamID).get()
        .then(doc => {
            const data = doc.data();
            const teamDescription = data.description;
            dispatch({type: GET_TEAM_DESCRIPTION_SUCCESS, teamDescription});
        })
        .catch(() => dispatch({type: GET_TEAM_DESCRIPTION_FAILURE, error: 'Proje notları getirilemedi.'}));
};

export const editTeamDescription = (teamID, description) => dispatch => {
    dispatch({type: EDIT_TEAM_DESCRIPTION_REQUEST});

    const teamRef = firestore().collection('teams');
    teamRef.doc(teamID).update({
        description,
    })
        .then(() => {
            dispatch({type: EDIT_TEAM_DESCRIPTION_SUCCESS});
            dispatch(getSingleTeam(teamID));
            dispatch(getTeamDescription(teamID));
        })
        .catch(() => dispatch({type: EDIT_TEAM_DESCRIPTION_FAILURE}));
};
