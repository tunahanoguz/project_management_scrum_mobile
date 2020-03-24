import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Feather";
import {profiles} from "../../constants";

class AllTaskCard extends Component {
    cardColor = () => {
        const light= {
            backgroundColor: 'rgba(0, 0, 0, 0.05)'
        };

        const dark = {
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
        };

        return (this.props.isMyTask ? dark : light);
    };

    isMyCard = (id) => {
        if (this.props.isMyTask){
            return (
                <View style={{...styles.dateContainer, marginTop: 10, justifyContent: 'flex-end'}}>
                    <Icon name='calendar' size={16} style={styles.dateIcon}/>
                    <Text style={styles.dateText}>1 Ocak 2019 13:15</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.taskInnerBottomContainer}>
                    <View style={styles.taskProfileContainer}>
                        <Image source={{uri: profiles[id].profilePhoto}} style={styles.taskProfilePhoto}/>
                        <Text style={styles.taskProfileName}>{profiles[id].fullName}</Text>
                    </View>

                    <View style={styles.dateContainer}>
                        <Icon name='calendar' size={16} style={styles.dateIcon}/>
                        <Text style={styles.dateText}>1 Ocak 2019 13:15</Text>
                    </View>
                </View>
            );
        }
    };

    render(){
        const {id, title} = this.props.task;
        return (
            <TouchableOpacity key={id} style={{...styles.taskContainer, ...this.cardColor()}}>
                <View style={styles.taskInnerTopContainer}>
                    <View style={styles.taskDot}/>
                    <Text style={styles.taskText}>{title}</Text>
                </View>

                {this.isMyCard(id)}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    taskContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 20,
        marginHorizontal: 30,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
    },
    taskInnerTopContainer: {
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
    taskInnerBottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    taskProfileContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    taskProfileName: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        marginBottom: -2,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskProfilePhoto: {
        width: 18,
        height: 18,
        marginRight: 4,
        borderRadius: 100,
    },
    dateIcon: {
        marginRight: 4,
    },
    dateText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        marginBottom: -2,
    },
});

AllTaskCard.propTypes = {
    task: PropTypes.object.isRequired,
    isMyTask: PropTypes.bool.isRequired,
};

export default AllTaskCard;
