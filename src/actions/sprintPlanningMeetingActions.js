import firestore from "@react-native-firebase/firestore";
import {
    CREATE_DAILY_SCRUM_MEETING_FAILURE,
    CREATE_DAILY_SCRUM_MEETING_START,
    CREATE_DAILY_SCRUM_MEETING_SUCCESS,
    CREATE_SPRINT_PLANNING_MEETING_FAILURE,
    CREATE_SPRINT_PLANNING_MEETING_START,
    CREATE_SPRINT_PLANNING_MEETING_SUCCESS,
    DELETE_DAILY_SCRUM_MEETING_FAILURE,
    DELETE_DAILY_SCRUM_MEETING_START,
    DELETE_DAILY_SCRUM_MEETING_SUCCESS,
    DELETE_SPRINT_PLANNING_MEETING_FAILURE,
    DELETE_SPRINT_PLANNING_MEETING_START,
    DELETE_SPRINT_PLANNING_MEETING_SUCCESS,
    GET_ALL_SPRINT_PLANNING_MEETINGS_FAILURE,
    GET_ALL_SPRINT_PLANNING_MEETINGS_START,
    GET_ALL_SPRINT_PLANNING_MEETINGS_SUCCESS,
} from "./types/sprintPlanningMeetingTypes";

export const getSprintPlanningMeetings = () => dispatch => {
    dispatch({type: GET_ALL_SPRINT_PLANNING_MEETINGS_START});

    const dailyScrumMeetingRef = firestore().collection('sprintPlanningMeeting');
    dailyScrumMeetingRef.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_ALL_SPRINT_PLANNING_MEETINGS_FAILURE, error: "Hiç sprint planlama toplantısı yok."});
            } else {
                const sprintPlanningMeetings = [];
                snapshot.forEach(doc => {
                    const sprintPlanningMeeting = {
                        id: doc.id,
                        ...doc.data(),
                    };

                    sprintPlanningMeetings.push(sprintPlanningMeeting);
                });

                dispatch({type: GET_ALL_SPRINT_PLANNING_MEETINGS_SUCCESS, sprintPlanningMeetings});
            }
        })
        .catch(() => dispatch({type: GET_ALL_SPRINT_PLANNING_MEETINGS_FAILURE, error: "Sprint planlama toplantısı getirilemedi."}));
};

export const createSprintPlanningMeeting = () => dispatch => {
    dispatch({type: CREATE_SPRINT_PLANNING_MEETING_START});

    const sprintPlanningMeetingRef = firestore().collection('sprintPlanningMeeting');
    const nowDate = new Date();
    sprintPlanningMeetingRef.add({
        status: true,
        createdAt: nowDate,
        finishedAt: null,
    })
        .then(() => dispatch({type: CREATE_SPRINT_PLANNING_MEETING_SUCCESS}))
        .catch(() => dispatch({type: CREATE_SPRINT_PLANNING_MEETING_FAILURE, error: "Günlük Scrum Toplantısı oluşturulamadı."}));
};

export const deleteSprintPlanningMeeting = (sprintPlanningMeeting) => dispatch => {
    dispatch({type: DELETE_SPRINT_PLANNING_MEETING_START});

    const sprintPlanningMeetingRef = firestore().collection('dailyScrumMeeting');
    const sprintPlanningMeetingDoc = sprintPlanningMeetingRef.doc(sprintPlanningMeeting);
    sprintPlanningMeetingDoc.delete()
        .then(() => dispatch({type: DELETE_SPRINT_PLANNING_MEETING_SUCCESS}))
        .catch(() => dispatch({type: DELETE_SPRINT_PLANNING_MEETING_FAILURE, error: "Günlük Scrum Toplantısı silinemedi."}));
};
