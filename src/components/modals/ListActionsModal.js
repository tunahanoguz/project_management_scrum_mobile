import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Icon from "react-native-vector-icons/Feather";
import {colors, fonts, sizes} from "../../styles";
import {deleteTeam} from "../../actions/teamActions";
import {connect} from "react-redux";

class ListActionsModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            animatedValue: new Animated.Value(sizes.deviceHeight),
        };
    }

    static getDerivedStateFromProps(props, state) {
        const toValue = props.isOpen ? 0 : sizes.deviceHeight;
        Animated.timing(state.animatedValue, {
            toValue,
            duration: 500,
            useNativeDriver: true,
        }).start();

        return null;
    }

    goToEditTeam = () => {
        const teamID = this.props.selectedItemID;
        this.props.navigation.navigate('EditTeam', {teamID});
    };

    deleteTeam = () => {
        const {user, selectedItemID, deleteTeam, action} = this.props;
        deleteTeam(user.uid, selectedItemID);
        action();
    };

    render() {
        const {action} = this.props;
        return (
            <Animated.View style={[styles.outerContainer, {transform: [{translateY: this.state.animatedValue,}]}]}>
                <View style={styles.modalContainer}>
                    <View style={styles.innerContainer}>
                        <TouchableOpacity onPress={() => this.goToEditTeam()}>
                            <View style={styles.actionIconContainer}>
                                <Icon name='edit-2' size={20} style={styles.modalIcon}/>
                            </View>
                            <Text style={styles.modalText}>Takımı düzenle</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.deleteTeam()}>
                            <View style={styles.actionIconContainer}>
                                <Icon name='trash-2' size={20} style={styles.modalIcon}/>
                            </View>
                            <Text style={styles.modalText}>Takımı sil</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.closeButton} onPress={() => action()}>
                        <Text style={styles.closeButtonText}>Kapat</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    outerButton: {
        width: sizes.deviceWidth,
        height: sizes.deviceHeight,
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    outerContainer: {
        width: '100%',
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
    },
    topLine: {
        width: sizes.deviceWidth / 6.5,
        height: 8,
        alignSelf: 'center',
        marginBottom: 6,
        backgroundColor: colors.darkGreen,
        borderRadius: 100,
    },
    modalContainer: {
        flexDirection: 'column',
        backgroundColor: colors.darkGreen,
        padding: 30,
        borderTopStartRadius: 30,
        borderTopEndRadius: 30,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 30,
    },
    modalTitle: {
        ...fonts.cardTitle,
        color: 'white',
    },
    closeButton: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 30,
        paddingVertical: 16,
        borderRadius: 15,
    },
    closeButtonText: {
        ...fonts.mediumText,
        color: colors.darkGreen
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    actionIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        padding: 10,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 100,
    },
    modalIcon: {
        color: 'white',
    },
    modalText: {
        ...fonts.mediumText,
        color: 'white',
    },
});

ListActionsModal.propTypes = {
    name: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    selectedItemID: PropTypes.string,
    action: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deleteTeam: (userID, teamID) => dispatch(deleteTeam(userID, teamID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListActionsModal);