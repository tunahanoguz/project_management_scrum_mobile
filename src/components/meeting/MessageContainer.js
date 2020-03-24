import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import firestore from '@react-native-firebase/firestore';
import moment from "moment";
import "moment/locale/tr";
import {
    DirectionContainer,
    Divider,
    Text,
} from "../../styles";

const MessageContainer = (props) => {
    const {
        message: {
            body,
            userID,
            createdAt,
        },
    } = props;

    const [author, setAuthor] = useState({});

    useEffect(() => {
        getAuthor();
    }, []);

    const getAuthor = () => {
        const userRef = firestore().collection('users');
        const userQuery = userRef.doc(userID);
        userQuery.get()
            .then(doc => setAuthor(doc.data()))
            .catch(() => console.log("Error!"));
    };

    const renderDate = () => {
        moment.locale('tr-TR');
        return moment(createdAt.toDate()).startOf('hour').fromNow();
    };

    return (
        <View style={styles.container}>
            <DirectionContainer row>
                <Text medium color='white'>{author.fullName}</Text>
                <Divider width={10}/>
                <Text normal color='white'>{renderDate()}</Text>
            </DirectionContainer>
            <Text normal color='white'>{body}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        marginBottom: 10,
        padding: 15,
        backgroundColor: 'teal',
        borderRadius: 15,
    },
});

MessageContainer.propTypes = {
    message: PropTypes.object.isRequired,
};

export default MessageContainer;
