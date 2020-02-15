import React, {Component} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {colors, fonts} from "../../styles";

class ProjectNoteCard extends Component {
    render(){
        return (
            <TouchableOpacity style={styles.cardContainer}>
                <Text style={fonts.mediumText}>{this.props.note.note}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 15,
        borderRadius: 15,
    },
});

ProjectNoteCard.propTypes = {
    note: PropTypes.object.isRequired,
};

export default ProjectNoteCard;