import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import PropTypes from 'prop-types';
import {fonts, sizes} from "../../styles";
import Button from "../buttons/Button";
import {createDailyScrumMeetingMessage} from "../../actions/dailyScrumMeetingActions";

const MessageInput = ({value, setValue, dailyScrumMeetingID}) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);

    const sendMessage = () => {
        dispatch(createDailyScrumMeetingMessage(value, user.uid, dailyScrumMeetingID));
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Bir mesaj yazın"
                placeholderTextColor='black'
                value={value}
                onChangeText={text => setValue(text)}
                style={[styles.input, fonts.normalText]}
                multiline={true}
            />

            <Button
                action={sendMessage}
                color='green'
                text="👍"
                style={styles.button}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: sizes.deviceWidth,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        paddingVertical: 10,
        paddingHorizontal: 30,
        backgroundColor: 'white',
    },
    input: {
        flex: 0.8,
        // width: sizes.deviceWidth * 0.6,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
    },
    button: {
        flex: 0.2,
    },
});

MessageInput.propTypes = {
    value: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    dailyScrumMeetingID: PropTypes.string.isRequired,
};

export default MessageInput;
