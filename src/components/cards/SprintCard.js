import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import Icon from "react-native-vector-icons/Feather";
import {colors, fonts} from "../../styles";

class SprintCard extends Component {

    sprintName = (name) => {
        const projectNameLength = name?.length;

        if (projectNameLength > 14){
            return name.substring(0, 14) + "...";
        } else {
            return name;
        }
    };

    render(){
        const {navigation, sprint, order, action} = this.props;
        const {name} = sprint;
        return (
            <View style={styles.sprintContainer}>
                <TouchableOpacity style={styles.leftSprintContainer} onPress={() => navigation.navigate('SprintDetail', {sprint})}>
                    <View style={styles.sprintSequenceContainer}>
                        <Text style={styles.sprintSequenceText}>{order + 1}</Text>
                    </View>
                    <Text style={fonts.cardTitle}>{this.sprintName(name)}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => action(sprint)}>
                    <Icon name='more-vertical' size={24} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sprintContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
    },
    leftSprintContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sprintSequenceContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#FFEAC5',
        marginRight: 20,
        borderRadius: 15,
    },
    sprintSequenceText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 26,
        includeFontPadding: false,
    },
});

SprintCard.propTypes = {
    sprint: PropTypes.object.isRequired,
    order: PropTypes.number.isRequired,
    action: PropTypes.func.isRequired,
};

// const mapStateToProps = state => {
//     return {};
// };
//
// const mapDispatchToProps = dispatch => {
//     return {};
// };

export default withNavigation(SprintCard);
