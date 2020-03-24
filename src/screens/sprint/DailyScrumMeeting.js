import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import { GiftedChat } from 'react-native-gifted-chat'
import {TopBar} from 'components';
import {Container} from "../../styles";
import {createMessage, getMessages} from "./dailyScrumMeetingFunctions";

const DailyScrumMeeting = ({navigation}) => {
    const [messageArray, setMessageArray] = useState([]);
    const dailyScrumMeetingID = navigation.getParam('dailyScrumMeetingID', "");

    const user = useSelector(state => state.authReducer.user);

    useEffect(() => {
        getMessages(setMessageArray, dailyScrumMeetingID);
    }, []);

    const onSend = (msgs) => {
        const {displayName, photoURL} = user;
        createMessage(msgs[0], displayName, photoURL, dailyScrumMeetingID);
    };

    return (
        <Container>
            <TopBar isBack={true}/>

            <GiftedChat
                messages={messageArray}
                onSend={messages => onSend(messages)}
                user={{
                    _id: user.uid,
                }}
                placeholder="Bir mesaj yazın..."
                onPressAvatar={user => navigation.navigate('UserProfile', {userID: user._id})}
            />
        </Container>
    );
};

export default DailyScrumMeeting;
