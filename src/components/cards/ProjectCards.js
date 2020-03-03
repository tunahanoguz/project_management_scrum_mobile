import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Dimensions, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import Divider from "../Divider";
import {fonts} from "../../styles";

class ProjectCard extends Component {
    goToProjectDetail = (project) => {
        this.props.navigation.navigate("ProjectDetail", {project});
    };

    render(){
        const {project, color} = this.props;
        return (
            <View style={{...styles.cardContainer, backgroundColor: color}}>
                <Icon name='briefcase' size={32} color='white' />
                <Divider height={10} />
                <Text style={styles.projectNameTitle}>{project.name}</Text>
                <View style={{height: 3, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 100,}}/>
                <Divider height={10} />
                <TouchableOpacity onPress={() => this.goToProjectDetail(project)}>
                    <Text style={styles.textButton}>İNCELE</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        width: Dimensions.get('window').width * 0.38,
        flexDirection: 'column',
        justifyContent: 'center',
        // backgroundColor: '#3f38dd',
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginRight: 20,
        borderRadius: 15
    },
    projectNameTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        includeFontPadding: false,
        color: 'white',
        marginBottom: 10,
    },
    cardButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardButton: {
        alignSelf: 'baseline',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        marginRight: 8,
        padding: 10,
        borderRadius: 100,
    },
    textButton: {
        ...fonts.mediumText,
        alignSelf: 'flex-end',
        color: 'white',
    },
});

ProjectCard.propTypes = {
    project: PropTypes.object.isRequired,
    color: PropTypes.string.isRequired,
};

export default withNavigation(ProjectCard);