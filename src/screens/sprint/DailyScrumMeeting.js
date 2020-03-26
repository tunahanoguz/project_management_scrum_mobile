import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { GiftedChat } from 'react-native-gifted-chat'
import {TopBar} from 'components';
import {Container} from "../../styles";
import {createMessage, getMessages} from "./dailyScrumMeetingFunctions";
import {finishDailyScrumMeeting} from "../../actions/dailyScrumMeetingActions";

const DailyScrumMeeting = ({navigation}) => {
    const [messageArray, setMessageArray] = useState([]);
    const dailyScrumMeetingID = navigation.getParam('dailyScrumMeetingID', "");
    const createdBy = navigation.getParam('createdBy', "");

    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);

    useEffect(() => {
        getMessages(setMessageArray, dailyScrumMeetingID);
    }, []);

    const onSend = (msgs) => {
        const {displayName, photoURL} = user;
        createMessage(msgs[0], displayName, photoURL, dailyScrumMeetingID);
    };

    const topBarActionButtons = [
        {
            icon: 'pause',
            action: () => {
                dispatch(finishDailyScrumMeeting(dailyScrumMeetingID));
                navigation.pop();
            },
        }
    ];

    return (
        <Container>
            <TopBar
                isBack={true}
                actionButtons={createdBy === user.uid ? topBarActionButtons : null}
            />

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
