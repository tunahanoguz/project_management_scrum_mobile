import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Feather";

class MyTaskCard extends Component {
    render(){
        const {id, title} = this.props.task;
        return (
            <TouchableOpacity key={id} style={styles.taskContainer}>
                <View style={styles.taskInnerContainer}>
                    <View style={styles.taskDot}/>
                    <Text style={styles.taskText}>{title}</Text>
                </View>

                <View style={styles.dateContainer}>
                    <Icon name='calendar' size={16} style={styles.dateIcon}/>
                    <Text style={styles.dateText}>1 Ocak 2019 13:15</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    taskContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        marginBottom: 20,
        marginHorizontal: 30,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    taskInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    taskDot: {
        width: 6,
        height: 6,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        marginRight: 10,
        borderRadius: 100,
    },
    taskText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        marginBottom: -2
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    dateIcon: {
        marginRight: 4,
    },
    dateText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        marginTop: -1,
    },
});

MyTaskCard.propTypes = {
    task: PropTypes.object.isRequired,
};

export default MyTaskCard;