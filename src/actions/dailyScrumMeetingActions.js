import firestore from '@react-native-firebase/firestore';
import {
    GET_DAILY_SCRUM_MEETING_START,
    GET_DAILY_SCRUM_MEETING_SUCCESS,
    GET_DAILY_SCRUM_MEETING_FAILURE,
    CREATE_DAILY_SCRUM_MEETING_START,
    CREATE_DAILY_SCRUM_MEETING_SUCCESS,
    CREATE_DAILY_SCRUM_MEETING_FAILURE,
    DELETE_DAILY_SCRUM_MEETING_START,
    DELETE_DAILY_SCRUM_MEETING_SUCCESS,
    DELETE_DAILY_SCRUM_MEETING_FAILURE,
    CREATE_DAILY_SCRUM_MEETING_MESSAGE_START,
    CREATE_DAILY_SCRUM_MEETING_MESSAGE_SUCCESS,
    CREATE_DAILY_SCRUM_MEETING_MESSAGE_FAILURE,
    GET_ALL_DAILY_SCRUM_MEETING_MESSAGES_START,
    GET_ALL_DAILY_SCRUM_MEETING_MESSAGES_SUCCESS,
    GET_ALL_DAILY_SCRUM_MEETING_MESSAGES_FAILURE
} from "./types";

export const getDailyScrumMeeting = () => dispatch => {
    dispatch({type: GET_DAILY_SCRUM_MEETING_START});

    const dailyScrumMeetingRef = firestore().collection('dailyScrumMeeting');
    dailyScrumMeetingRef.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_DAILY_SCRUM_MEETING_FAILURE, error: "Hiç günlük scrum toplantısı yok."});
            } else {
                const dailyScrumMeetings = [];
                snapshot.forEach(doc => {
                    const dailyScrumMeeting = {
                        id: doc.id,
                        ...doc.data(),
                    };

                    dailyScrumMeetings.push(dailyScrumMeeting);
                });

                dispatch({type: GET_DAILY_SCRUM_MEETING_SUCCESS, dailyScrumMeetings});
            }
        })
        .catch(() => dispatch({type: GET_DAILY_SCRUM_MEETING_FAILURE, error: "Günlük scrum toplantısı getirilemedi."}));
};

export const createDailyScrumMeeting = (status, sprintID) => dispatch => {
    dispatch({type: CREATE_DAILY_SCRUM_MEETING_START});

    const dailyScrumMeetingRef = firestore().collection('dailyScrumMeeting');
    const nowDate = new Date();
    dailyScrumMeetingRef.add({
        status,
        sprintID,
        createdAt: nowDate,
        finishedAt: null,
    })
        .then(() => dispatch({type: CREATE_DAILY_SCRUM_MEETING_SUCCESS}))
        .catch(() => dispatch({type: CREATE_DAILY_SCRUM_MEETING_FAILURE, error: "Günlük Scrum Toplantısı oluşturulamadı."}));
};

export const deleteDailyScrumMeeting = (dailyScrumMeetingID) => dispatch => {
    dispatch({type: DELETE_DAILY_SCRUM_MEETING_START});

    const sprintRef = firestore().collection('dailyScrumMeeting');
    const sprintDoc = sprintRef.doc(dailyScrumMeetingID);
    sprintDoc.delete()
        .then(() => dispatch({type: DELETE_DAILY_SCRUM_MEETING_SUCCESS}))
        .catch(() => dispatch({type: DELETE_DAILY_SCRUM_MEETING_FAILURE, error: "Günlük Scrum Toplantısı silinemedi."}));
};

export const createDailyScrumMeetingMessages = (body, dailyScrumMeetingID) => dispatch => {
    dispatch({type: CREATE_DAILY_SCRUM_MEETING_MESSAGE_START});

    const dailyScrumMeetingMessageRef = firestore().collection('dailyScrumMeetingMessage');
    const nowDate = new Date();
    dailyScrumMeetingMessageRef.add({
        body,
        createdAt: nowDate,
        finishedAt: null,
        dailyScrumMeetingID,
    })
        .then(() => dispatch({type: CREATE_DAILY_SCRUM_MEETING_MESSAGE_SUCCESS}))
        .catch(() => dispatch({type: CREATE_DAILY_SCRUM_MEETING_MESSAGE_FAILURE, error: "Günlük Scrum Toplantısı oluşturulamadı."}));
};

export const getDailyScrumMeetingMessage = (dailyScrumMeetingID) => dispatch => {
    dispatch({type: GET_ALL_DAILY_SCRUM_MEETING_MESSAGES_START});

    const dailyScrumMeetingMessageRef = firestore().collection('dailyScrumMeetingMessage');
    const dailyScrumMeetingMessageQuery = dailyScrumMeetingMessageRef.where('dailyScrumMeetingID', '==', dailyScrumMeetingID);
    dailyScrumMeetingMessageQuery.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_DAILY_SCRUM_MEETING_FAILURE, error: "Bu günlük scrum toplantısına ait hiç mesaj yok."});
            } else {
                const dailyScrumMeetingMessages = [];
                snapshot.forEach(doc => {
                    const dailyScrumMeetingMessage = {
                        id: doc.id,
                        ...doc.data(),
                    };

                    dailyScrumMeetingMessages.push(dailyScrumMeetingMessage);
                });

                dispatch({type: GET_ALL_DAILY_SCRUM_MEETING_MESSAGES_SUCCESS, dailyScrumMeetingMessages});
            }
        })
        .catch(() => dispatch({type: GET_ALL_DAILY_SCRUM_MEETING_MESSAGES_FAILURE, error: "Bu günlük scrum toplantısına gönderilen mesajlar getirilemedi."}));
};