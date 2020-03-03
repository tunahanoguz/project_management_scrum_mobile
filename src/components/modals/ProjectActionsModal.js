import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import {connect} from "react-redux";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Feather";
import {colors, Divider, fonts, sizes} from "../../styles";
import {deleteProject} from "../../actions/projectActions";

class ProjectActionsModal extends Component {
    deleteProject = (toggleFunc, teamIDs, selectedProjectID, deleteProject) => {
        toggleFunc();
        deleteProject(teamIDs, selectedProjectID);
    };

    renderContainer = ({isOpen, animatedValue, toggleFunc, teamIDs, selectedProjectID, deleteProject}) => {
        if (isOpen){
            return (
                <Animated.View style={styles.container}>
                    <TouchableOpacity onPress={() => toggleFunc()} style={{flex: 1, justifyContent: 'center', transform: [{translateY: animatedValue}],}} activeOpacity={1}>
                        <Animated.View style={{
                            height: sizes.deviceWidth / 3,
                            justifyContent: 'center',
                            transform: [{translateY: animatedValue}],
                        }}>
                            <ModalButtonContainer>
                                <ModalButton onPress={() => console.log("asdasdasd")}>
                                    <Icon name='edit' size={24} color='white'/>
                                    <Divider height={10} />
                                    <Text style={[fonts.mediumText, {color: 'white'}]}>Projeyi düzenle</Text>
                                </ModalButton>

                                <Divider width={30} />

                                <ModalButton onPress={() => this.deleteProject(toggleFunc, teamIDs, selectedProjectID, deleteProject)}>
                                    <Icon name='trash-2' size={24} color='white'/>
                                    <Divider height={10} />
                                    <Text style={[fonts.mediumText, {color: 'white'}]}>Projeyi kaldır</Text>
                                </ModalButton>
                            </ModalButtonContainer>
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>
            );
        } else {
            return null;
        }
    };

    render(){
        return (this.renderContainer(this.props));
    }
}

const ModalButtonContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ModalButton = styled.TouchableOpacity`
    width: ${sizes.deviceWidth / 3}px;
    height: ${sizes.deviceWidth / 3}px;
    justify-content: center;
    align-items: center;
    background-color: teal;
    border-width: 1px;
    border-style: dashed;
    border-color: teal;
    border-radius: 15px;
`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: sizes.deviceWidth,
        height: sizes.deviceHeight - 54,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
});

ProjectActionsModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    animatedValue: PropTypes.object.isRequired,
    toggleFunc: PropTypes.func.isRequired,
    selectedProjectID: PropTypes.string,
    teamIDs: PropTypes.array.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        deleteProject: (teamIDs, projectID) => dispatch(deleteProject(teamIDs, projectID)),
    };
};

export default connect(null, mapDispatchToProps)(ProjectActionsModal);