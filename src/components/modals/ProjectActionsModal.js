import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Animated} from 'react-native';
import PropTypes from 'prop-types';
import {colors, fonts, sizes} from "../../styles";
import Divider from "../Divider";
import Icon from "react-native-vector-icons/Feather";
import {deleteProject} from "../../actions/projectActions";
import {connect} from "react-redux";

class ProjectActionsModal extends Component {
    deleteProject = (teamIDs, selectedProjectID) => {
        this.props.toggleFunc();
        this.props.deleteProject(teamIDs, selectedProjectID);
    };

    renderContainer = (teamIDs, selectedProjectID) => {
        if (this.props.isOpen){
            return (
                <Animated.View style={styles.container}>
                    <TouchableOpacity onPress={() => this.props.toggleFunc()} style={{flex: 1, justifyContent: 'flex-end', transform: [{translateY: this.props.animatedValue}],}} activeOpacity={1}>
                        <Animated.View style={{
                            height: sizes.deviceHeight / 6,
                            justifyContent: 'center',
                            bottom: 0,
                            backgroundColor: colors.darkGreen,
                            paddingHorizontal: 30,
                            transform: [{translateY: this.props.animatedValue}],
                        }}>
                            <View style={{position: 'absolute', backgroundColor: 'rgba(255, 255, 255, 0.08)', width: 60, height: 60, borderRadius: 100, right: -20, bottom: -20}} />
                            <View style={{position: 'absolute', backgroundColor: 'rgba(255, 255, 255, 0.03)', width: 80, height: 80, borderRadius: 100, left: -20,}} />
                            <View style={{
                                width: '30%',
                                height: 4,
                                alignSelf: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                                borderRadius: 100,
                            }}/>
                            <Divider height={20}/>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                                <TouchableOpacity style={{alignItems: 'center',}}>
                                    <Icon name='edit' size={24} color='white'/>
                                    <Divider height={10}/>
                                    <Text style={[fonts.mediumText, {color: 'white'}]}>Projeyi düzenle</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{alignItems: 'center',}} onPress={() => this.deleteProject(teamIDs, selectedProjectID)}>
                                    <Icon name='trash-2' size={24} color='white'/>
                                    <Divider height={10}/>
                                    <Text style={[fonts.mediumText, {color: 'white'}]}>Projeyi kaldır</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>
            );
        } else {
            return null;
        }
    };

    render(){
        const {teamIDs, selectedProjectID} = this.props;
        return (this.renderContainer(teamIDs, selectedProjectID));
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: sizes.deviceWidth,
        height: sizes.deviceHeight - 54,
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
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