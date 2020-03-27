import firestore from '@react-native-firebase/firestore';

const getMessages = (setMessageArray, sprintPlanningMeetingID) => {
    const dailyScrumMeetingMessageRef = firestore().collection('sprintPlanningMeetingMessage');
    const dailyScrumMeetingMessageQuery = dailyScrumMeetingMessageRef.where('sprintPlanningMeetingID', '==', sprintPlanningMeetingID).orderBy('createdAt', 'DESC');
    dailyScrumMeetingMessageQuery.onSnapshot({
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

const createMessage = (message, userName, userPhotoURL, sprintPlanningMeetingID) => {
    const nowDate = new Date();
    const dailyScrumMeetingMessageRef = firestore().collection('sprintPlanningMeetingMessage');
    dailyScrumMeetingMessageRef.add({
        text: message.text,
        createdAt: nowDate,
        user: {
            _id: message.user._id,
            name: userName,
            avatar: userPhotoURL,
        },
        sprintPlanningMeetingID,
    });
};

export {
    getMessages,
    createMessage,
};
