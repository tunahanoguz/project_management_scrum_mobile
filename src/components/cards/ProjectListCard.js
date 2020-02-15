import React, {Component} from 'react';
import {View, Modal, Text, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Feather";
import {withNavigation} from 'react-navigation';
import {colors, fonts} from "../../styles";

class ProjectListCard extends Component {
    projectName = "e-commerce application design project";

    goToProjectDetail = () => {
        this.props.navigation.navigate('ProjectDetail', {project: this.props.project});
    };

    summaryProjectName = (projectName) => {
        const projectNameLength = projectName?.length;

        if (projectNameLength > 14){
            return projectName.substring(0, 14) + "...";
        } else {
            return projectName;
        }
    };

    render(){
        const {name, startDate} = this.props.project;
        return (
            <View style={styles.projectCard}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',}} onPress={() => this.goToProjectDetail()}>
                    <View style={styles.projectOrder}>
                        <Text style={styles.projectOrderText}>{this.props.order + 1}</Text>
                    </View>

                    <View>
                        <Text style={fonts.cardTitle}>{this.summaryProjectName(name)}</Text>
                        <View style={styles.projectDetail}>
                            <Text style={fonts.normalText}>{startDate !== null ? "Başladı" : "Başlamadı"}</Text>
                            <View style={{width: 5, height: 5, borderRadius: 100, backgroundColor: colors.gray, marginHorizontal: 8,}}/>
                            <Text style={fonts.normalText}>37 Görev</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.action()}>
                    <Icon name='more-vertical' size={24} />
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    projectCard: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 30,
    },
    projectOrder: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        backgroundColor: '#FFEAC5',
        marginRight: 20,
        borderRadius: 15,
    },
    projectOrderText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 26,
        includeFontPadding: false,
    },
    projectDetail: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

ProjectListCard.propTypes = {
    project: PropTypes.object.isRequired,
    order: PropTypes.number.isRequired,
    action: PropTypes.func.isRequired,
};

export default withNavigation(ProjectListCard);