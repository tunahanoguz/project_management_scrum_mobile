import firestore from '@react-native-firebase/firestore';

const getMessages = (setMessageArray, dailyScrumMeetingID) => {
    const dailyScrumMeetingMessageRef = firestore().collection('dailyScrumMeetingMessage');
    const dailyScrumMeetingMessageQuery = dailyScrumMeetingMessageRef.where('dailyScrumMeetingID', '==', dailyScrumMeetingID).orderBy('createdAt', 'DESC');
    dailyScrumMeetingMessageRef.onSnapshot({
        error: (e) => console.log(e),
        next: (querySnapshot) => {
            const messages = [];
            querySnapshot.forEach(doc => {
                const message = {
                    _id: doc.id,
                    ...doc.data(),
                };

                messages.push(message);
            });

            setMessageArray(messages);
        },
    });
};

const createMessage = (message, userName, userPhotoURL, dailyScrumMeetingID) => {
    const nowDate = new Date();
    const dailyScrumMeetingMessageRef = firestore().collection('dailyScrumMeetingMessage');
    dailyScrumMeetingMessageRef.add({
        text: message.text,
        createdAt: nowDate,
        user: {
            _id: message.user._id,
            name: userName,
            avatar: userPhotoURL,
        },
        dailyScrumMeetingID,
    });
};

export {
    getMessages,
    createMessage,
};
