import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Feather";
import moment from "moment";
import {withNavigation} from 'react-navigation';
import {fonts} from "../../styles";

class TaskCard extends Component {
    goToTaskDetail = () => {
        const {navigation, task} = this.props;
        navigation.navigate('TaskDetail', {task});
    };

    renderDate = (date) => {
        moment.locale('tr-TR');
        return moment(date).format('LLL');
    };

    renderDateContainer = (estimatedFinishDate) => {
        return (
            <View style={styles.dateContainer}>
                <Icon name='calendar' size={16} style={styles.dateIcon}/>
                <Text style={styles.dateText}>{this.renderDate(estimatedFinishDate.toDate())}</Text>
            </View>
        );
    };

    render(){
        const {id, task, startDate, estimatedFinishDate} = this.props.task;
        return (
            <TouchableOpacity key={id} style={styles.taskContainer} onPress={() => this.goToTaskDetail()}>
                <View style={styles.taskInnerContainer}>
                    <Text style={styles.taskText}>{task}</Text>
                </View>

                {startDate !== null ? this.renderDateContainer(estimatedFinishDate) : <View style={styles.dateContainer}><Text style={fonts.mediumText}>Henüz başlamamış.</Text></View>}
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
        // marginHorizontal: 30,
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

TaskCard.propTypes = {
    task: PropTypes.object.isRequired,
};

export default withNavigation(TaskCard);
