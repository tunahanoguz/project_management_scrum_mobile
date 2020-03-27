import firestore from "@react-native-firebase/firestore";
import {
    CREATE_SPRINT_PLANNING_MEETING_FAILURE,
    CREATE_SPRINT_PLANNING_MEETING_START,
    CREATE_SPRINT_PLANNING_MEETING_SUCCESS,
    DELETE_SPRINT_PLANNING_MEETING_FAILURE,
    DELETE_SPRINT_PLANNING_MEETING_START,
    DELETE_SPRINT_PLANNING_MEETING_SUCCESS,
    FINISH_SPRINT_PLANNING_MEETING_FAILURE,
    FINISH_SPRINT_PLANNING_MEETING_START,
    FINISH_SPRINT_PLANNING_MEETING_SUCCESS,
    GET_SPRINT_PLANNING_MEETING_FAILURE,
    GET_SPRINT_PLANNING_MEETING_START,
    GET_SPRINT_PLANNING_MEETING_SUCCESS,
    START_SPRINT_PLANNING_MEETING_FAILURE,
    START_SPRINT_PLANNING_MEETING_START,
    START_SPRINT_PLANNING_MEETING_SUCCESS,
} from "./types/sprintPlanningMeetingTypes";

export const getSprintPlanningMeeting = (sprintID) => dispatch => {
    dispatch({type: GET_SPRINT_PLANNING_MEETING_START});

    const sprintPlanningMeetingRef = firestore().collection('sprintPlanningMeeting');
    const sprintPlanningMeetingQuery = sprintPlanningMeetingRef.where('sprintID', '==', sprintID);
    sprintPlanningMeetingQuery.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_SPRINT_PLANNING_MEETING_FAILURE, error: "Hiç sprint planlama toplantısı yok."});
            } else {
                let sprintPlanningMeeting = {};
                snapshot.forEach(doc => {
                    const sprintPlanningMeetingObj = {
                        id: doc.id,
                        ...doc.data(),
                    };

                    sprintPlanningMeeting = sprintPlanningMeetingObj;
                });

                dispatch({type: GET_SPRINT_PLANNING_MEETING_SUCCESS, sprintPlanningMeeting});
            }
        })
        .catch(() => dispatch({type: GET_SPRINT_PLANNING_MEETING_FAILURE, error: "Sprint planlama toplantısı getirilemedi."}));
};

export const createSprintPlanningMeeting = (sprintID) => dispatch => {
    dispatch({type: CREATE_SPRINT_PLANNING_MEETING_START});

    const nowDate = new Date();
    const sprintPlanningMeetingRef = firestore().collection('sprintPlanningMeeting');
    sprintPlanningMeetingRef.add({
        status: 1,
        sprintID,
        createdAt: nowDate,
        finishedAt: null,
    })
        .then(() => dispatch({type: CREATE_SPRINT_PLANNING_MEETING_SUCCESS}))
        .catch(() => dispatch({type: CREATE_SPRINT_PLANNING_MEETING_FAILURE, error: "Sprint Planlama Toplantısı oluşturulamadı."}));
};

export const startSprintPlanningMeeting = (sprintPlanningMeetingID) => dispatch => {
    dispatch({type: START_SPRINT_PLANNING_MEETING_START});

    const nowDate = new Date();
    const sprintPlanningMeetingRef = firestore().collection('sprintPlanningMeeting');
    const sprintPlanningMeetingDoc = sprintPlanningMeetingRef.doc(sprintPlanningMeetingID);
    sprintPlanningMeetingDoc.update({
        status: 1,
        lastStartedAt: nowDate,
        finishedAt: null,
    })
        .then(() => dispatch({type: START_SPRINT_PLANNING_MEETING_SUCCESS}))
        .catch(() => dispatch({type: START_SPRINT_PLANNING_MEETING_FAILURE, error: "Sprint Planlama Toplantısı başlatılamadı."}));
};

export const finishSprintPlanningMeeting = (sprintPlanningMeetingID) => dispatch => {
    dispatch({type: FINISH_SPRINT_PLANNING_MEETING_START});

    const nowDate = new Date();
    const sprintPlanningMeetingRef = firestore().collection('sprintPlanningMeeting');
    const sprintPlanninMeetingDoc = sprintPlanningMeetingRef.doc(sprintPlanningMeetingID);
    sprintPlanninMeetingDoc.update({
        status: 0,
        finishedAt: nowDate,
    })
        .then(() => dispatch({type: FINISH_SPRINT_PLANNING_MEETING_SUCCESS}))
        .catch(() => dispatch({type: FINISH_SPRINT_PLANNING_MEETING_FAILURE, error: "Sprint Planlama Toplantısı bitirilemedi."}));
};

export const deleteSprintPlanningMeeting = (sprintPlanningMeetingID) => dispatch => {
    dispatch({type: DELETE_SPRINT_PLANNING_MEETING_START});

    const sprintPlanningMeetingRef = firestore().collection('sprintPlanningMeeting');
    const sprintPlanningMeetingDoc = sprintPlanningMeetingRef.doc(sprintPlanningMeetingID);
    sprintPlanningMeetingDoc.delete()
        .then(() => dispatch({type: DELETE_SPRINT_PLANNING_MEETING_SUCCESS}))
        .catch(() => dispatch({type: DELETE_SPRINT_PLANNING_MEETING_FAILURE, error: "Sprint Planlama Toplantısı silinemedi."}));
};
