import firestore from '@react-native-firebase/firestore';
import {
    CREATE_DAILY_SCRUM_MEETING_FAILURE,
    CREATE_DAILY_SCRUM_MEETING_MESSAGE_FAILURE,
    CREATE_DAILY_SCRUM_MEETING_MESSAGE_START,
    CREATE_DAILY_SCRUM_MEETING_MESSAGE_SUCCESS,
    CREATE_DAILY_SCRUM_MEETING_START,
    CREATE_DAILY_SCRUM_MEETING_SUCCESS,
    DELETE_DAILY_SCRUM_MEETING_FAILURE,
    DELETE_DAILY_SCRUM_MEETING_START,
    DELETE_DAILY_SCRUM_MEETING_SUCCESS,
    FINISH_DAILY_SCRUM_MEETING_FAILURE,
    FINISH_DAILY_SCRUM_MEETING_START,
    FINISH_DAILY_SCRUM_MEETING_SUCCESS,
    GET_ALL_DAILY_SCRUM_MEETING_MESSAGES_FAILURE,
    GET_ALL_DAILY_SCRUM_MEETING_MESSAGES_START,
    GET_ALL_DAILY_SCRUM_MEETING_MESSAGES_SUCCESS,
    GET_DAILY_SCRUM_MEETING_FAILURE,
    GET_DAILY_SCRUM_MEETING_START,
    GET_DAILY_SCRUM_MEETING_SUCCESS,
    START_DAILY_SCRUM_MEETING_FAILURE,
    START_DAILY_SCRUM_MEETING_START,
    START_DAILY_SCRUM_MEETING_SUCCESS
} from "./types/dailyScrumMeeting";

export const getDailyScrumMeeting = (sprintID) => dispatch => {
    dispatch({type: GET_DAILY_SCRUM_MEETING_START});

    const dailyScrumMeetingRef = firestore().collection('dailyScrumMeeting');
    const dailyScrumMeetingQuery = dailyScrumMeetingRef.where('sprintID', '==', sprintID);
    dailyScrumMeetingQuery.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_DAILY_SCRUM_MEETING_FAILURE, error: "Hiç günlük scrum toplantısı yok."});
            } else {
                let dailyScrumMeeting = {};
                snapshot.forEach(doc => {
                    const meeting = {
                        id: doc.id,
                        ...doc.data(),
                    };

                    dailyScrumMeeting = meeting;
                });

                dispatch({type: GET_DAILY_SCRUM_MEETING_SUCCESS, dailyScrumMeeting: dailyScrumMeeting});
            }
        })
        .catch(() => dispatch({type: GET_DAILY_SCRUM_MEETING_FAILURE, error: "Günlük scrum toplantısı getirilemedi."}));
};

export const createDailyScrumMeeting = (sprintID) => dispatch => {
    dispatch({type: CREATE_DAILY_SCRUM_MEETING_START});

    const dailyScrumMeetingRef = firestore().collection('dailyScrumMeeting');
    const nowDate = new Date();
    dailyScrumMeetingRef.add({
        status: 1,
        sprintID,
        createdAt: nowDate,
        lastStartedAt: nowDate,
        finishedAt: null,
    })
        .then(() => dispatch({type: CREATE_DAILY_SCRUM_MEETING_SUCCESS}))
        .catch(() => dispatch({type: CREATE_DAILY_SCRUM_MEETING_FAILURE, error: "Günlük Scrum Toplantısı oluşturulamadı."}));
};

export const startDailyScrumMeeting = (dailyScrumMeetingID) => dispatch => {
    dispatch({type: START_DAILY_SCRUM_MEETING_START});

    const nowDate = new Date();
    const dailyScrumMeetingRef = firestore().collection('dailyScrumMeeting');
    const dailyScrumMeetingDoc = dailyScrumMeetingRef.doc(dailyScrumMeetingID);
    dailyScrumMeetingDoc.update({
        status: 1,
        lastStartedAt: nowDate,
    })
        .then(() => dispatch({type: START_DAILY_SCRUM_MEETING_SUCCESS}))
        .catch(() => dispatch({type: START_DAILY_SCRUM_MEETING_FAILURE, error: "Günlük Scrum Toplantısı başlatılamadı."}));
};

export const finishDailyScrumMeeting = (dailyScrumMeetingID) => dispatch => {
    dispatch({type: FINISH_DAILY_SCRUM_MEETING_START});

    const nowDate = new Date();
    const dailyScrumMeetingRef = firestore().collection('dailyScrumMeeting');
    const dailyScrumMeetingDoc = dailyScrumMeetingRef.doc(dailyScrumMeetingID);
    dailyScrumMeetingDoc.update({
        status: 1,
        finishedAt: nowDate,
    })
        .then(() => dispatch({type: FINISH_DAILY_SCRUM_MEETING_SUCCESS}))
        .catch(() => dispatch({type: FINISH_DAILY_SCRUM_MEETING_FAILURE, error: "Günlük Scrum Toplantısı bitirilemedi."}));
};

export const deleteDailyScrumMeeting = (dailyScrumMeetingID) => dispatch => {
    dispatch({type: DELETE_DAILY_SCRUM_MEETING_START});

    const sprintRef = firestore().collection('dailyScrumMeeting');
    const sprintDoc = sprintRef.doc(dailyScrumMeetingID);
    sprintDoc.delete()
        .then(() => dispatch({type: DELETE_DAILY_SCRUM_MEETING_SUCCESS}))
        .catch(() => dispatch({type: DELETE_DAILY_SCRUM_MEETING_FAILURE, error: "Günlük Scrum Toplantısı silinemedi."}));
};

export const createDailyScrumMeetingMessage = (body, userID, dailyScrumMeetingID) => dispatch => {
    dispatch({type: CREATE_DAILY_SCRUM_MEETING_MESSAGE_START});

    const dailyScrumMeetingMessageRef = firestore().collection('dailyScrumMeetingMessage');
    const nowDate = new Date();
    dailyScrumMeetingMessageRef.add({
        body,
        userID,
        createdAt: nowDate,
        dailyScrumMeetingID,
    })
        .then(() => dispatch({type: CREATE_DAILY_SCRUM_MEETING_MESSAGE_SUCCESS}))
        .catch(() => dispatch({type: CREATE_DAILY_SCRUM_MEETING_MESSAGE_FAILURE, error: "Günlük Scrum Toplantısı oluşturulamadı."}));
};

export const getDailyScrumMeetingMessages = (dailyScrumMeetingID) => dispatch => {
    dispatch({type: GET_ALL_DAILY_SCRUM_MEETING_MESSAGES_START});

    const userRef = firestore().collection('users');
    const dailyScrumMeetingMessageRef = firestore().collection('dailyScrumMeetingMessage');
    const dailyScrumMeetingMessageQuery = dailyScrumMeetingMessageRef.where('dailyScrumMeetingID', '==', dailyScrumMeetingID).orderBy('createdAt', 'DESC');
    dailyScrumMeetingMessageQuery.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_DAILY_SCRUM_MEETING_FAILURE, error: "Bu günlük scrum toplantısına ait hiç mesaj yok."});
            } else {
                const messages = [];
                snapshot.forEach(doc => {
                    const message = {
                        id: doc.id,
                        ...doc.data()
                    };

                    userRef.doc(message.userID).get()
                        .then(doc => {
                            const user = doc.data();
                            const dailyScrumMeetingMessage = {
                                _id: message.id,
                                text: message.body,
                                createdAt: message.createdAt.toDate(),
                                user: {
                                    _id: doc.id,
                                    name: user.fullName,
                                    avatar: user.photoURL,
                                },
                            };

                            messages.push(dailyScrumMeetingMessage);
                            dispatch({type: GET_ALL_DAILY_SCRUM_MEETING_MESSAGES_SUCCESS, messages});
                        })
                        .catch(err => err);
                });
            }
        })
        .catch((err) => {
            console.log(err);
            dispatch({type: GET_ALL_DAILY_SCRUM_MEETING_MESSAGES_FAILURE, error: "Bu günlük scrum toplantısına gönderilen mesajlar getirilemedi."});
        });
};
