import firestore from "@react-native-firebase/firestore";
import {
    CREATE_NOTIFICATION_FAILURE,
    CREATE_NOTIFICATION_START,
    CREATE_NOTIFICATION_SUCCESS,
    GET_ALL_NOTIFICATIONS_START,
    GET_ALL_NOTIFICATIONS_SUCCESS,
    GET_ALL_NOTIFICATIONS_FAILURE,
    SEND_NOTIFICATION_START,
    SEND_NOTIFICATION_SUCCESS,
    SEND_NOTIFICATION_FAILURE,
} from "./types/notificationTypes";

export const createNotification = (userIDs, type, description) => dispatch => {
    dispatch({type: CREATE_NOTIFICATION_START});

    const nowDate = new Date();
    const notificationRef = firestore().collection('notifications');

    notificationRef.add({
        type,
        date: nowDate,
        description,
        userIDs
    })
        .then(() => dispatch({type: CREATE_NOTIFICATION_SUCCESS}))
        .catch(() => dispatch({type: CREATE_NOTIFICATION_FAILURE, error: "Bildirim oluşturulamadı."}));
};

export const getAllNotifications = (userID) => dispatch => {
    dispatch({type: GET_ALL_NOTIFICATIONS_START});

    const notificationRef = firestore().collection('notifications');
    const notificationQuery = notificationRef.where('userIDs', 'array-contains', userID);
    notificationQuery.get()
        .then(snapshot => {
            if (snapshot.empty){
                dispatch({type: GET_ALL_NOTIFICATIONS_FAILURE, error: "Hiç bildirim yok."});
            } else {
                const notifications = [];

                snapshot.forEach(doc => {
                    const {type, description, date} = doc.data();
                    const notification = {
                        id: doc.id,
                        type,
                        description,
                        date
                    };

                    notifications.push(notification);
                });

                dispatch({type: GET_ALL_NOTIFICATIONS_SUCCESS, notifications});
            }
        })
        .catch(err => {
            console.log(err);
            dispatch({type: GET_ALL_NOTIFICATIONS_FAILURE, error: "Bildirimler getirilemedi."});
        });
};

export const sendNotifications = (userIDs, title, body) => dispatch => {
    dispatch({type: SEND_NOTIFICATION_START});

    console.log("userIDs" + userIDs);

    const userRef = firestore().collection('users');
    const userQuery = userRef.where('id', 'in', userIDs);
    userQuery.get()
        .then(snapshot => {
            const tokens = [];

            snapshot.forEach(doc => {
                const user = doc.data();
                const token = user.fcmToken;

                if (token)
                    tokens.push(token);
            });

            return tokens;
        })
        .then(tokens => {
            const data = {
                title,
                body,
                tokens,
            };

            fetch('http://192.168.1.34:3000/notifications/send-multiple-notification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(() => dispatch({type: SEND_NOTIFICATION_SUCCESS}))
                .catch(() => dispatch({type: SEND_NOTIFICATION_FAILURE, error: "Bildirim gönderilemedi."}));
        })
        .catch(() => dispatch({type: SEND_NOTIFICATION_FAILURE, error: "Kullanıcılar bulunamadı."}));
};
