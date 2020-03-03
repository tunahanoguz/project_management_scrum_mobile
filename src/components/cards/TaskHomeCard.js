import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Feather";
import {colors} from "../../styles";

class TaskHomeCard extends Component {

    priorityValues = (priority) => {
        if (priority === 1) {
            return [colors.highPriorityDark, colors.highPriorityLight, 'arrow-up'];
        } else if (priority === 2) {
            return [colors.mediumPriorityDark, colors.mediumPriorityLight, 'arrow-right'];
        } else {
            return [colors.lowPriorityDark, colors.lowPriorityLight, 'arrow-down'];
        }
    };

    goToTaskDetail = (task) => {
        props.navigation.navigate('TaskDetail', {task});
    };

    title = (title) => {
        const titleLength = title.length;
        if (titleLength > 28) {
            return title.substring(0, 30) + "...";
        } else {
            return title;
        }
    };

    render() {
        const {id, title, priority, estimatedFinishDate} = this.props.task;
        const colors = this.priorityValues(priority);
        return (
            <TouchableOpacity style={styles.taskContainer} onPress={() => this.goToTaskDetail(id)}>
                <View style={styles.taskPriorityContainer}>
                    <Icon name={colors[2]} size={20} color='rgba(255, 255, 255, 0.8)'/>
                </View>
                <View>
                    <View style={styles.taskTitleContainer}>
                        <Text style={styles.taskTitle}>{this.title(title)}</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Icon name='calendar' size={16} style={styles.dateIcon}/>
                        <Text style={styles.dateText}>{estimatedFinishDate}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        paddingVertical: 10,
        borderRadius: 5,
    },
    taskPriorityContainer: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors[0],
        marginRight: 10,
        borderRadius: 20,
    },
    taskTitleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 2
    },
    dateContainer: {
        flexDirection: 'row',
        marginTop: 4,
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

TaskHomeCard.propTypes = {
    task: PropTypes.object.isRequired,
};

export default TaskHomeCard;