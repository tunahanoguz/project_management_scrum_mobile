import React, {Component} from 'react';
import {View, TouchableOpacity, Text, Animated, Easing, Dimensions, StyleSheet} from 'react-native';
import Container from "../../components/Container";
import TopBar from "../../components/TopBar";
import InnerContainer from "../../components/InnerContainer";
import {colors, fonts,} from "../../styles";
import Icon from "react-native-vector-icons/Feather";
import AbsoluteButton from "../../components/buttons/AbsoluteButton";
import ProfilePicture from "../../components/ProfilePicture";
import {profiles} from "../../constants";
import Divider from "../../components/Divider";

class TaskDetail extends Component {

    initialHeight = Dimensions.get('window').height - 114;

    constructor(props) {
        super(props);

        this.state = {
            editAnimatedValue: new Animated.Value(this.initialHeight),
            confirmAnimatedValue: new Animated.Value(this.initialHeight),
            isOpenAbsoluteButtons: false,
        };
    }

    componentDidUpdate() {
        const editAnimatedValue = this.state.isOpenAbsoluteButtons ? this.initialHeight - 60 : this.initialHeight;
        const confirmAnimatedValue = this.state.isOpenAbsoluteButtons ? this.initialHeight - 120 : this.initialHeight;
        Animated.sequence([
            Animated.timing(this.state.editAnimatedValue, {
                toValue: editAnimatedValue,
                duration: 1000,
                easing: Easing.bounce,
                useNativeDriver: true,
            }),
            Animated.timing(this.state.confirmAnimatedValue, {
                toValue: confirmAnimatedValue,
                duration: 1000,
                easing: Easing.bounce,
                useNativeDriver: true,
            }),
        ]).start();
    }

    priorityDotStyle = priority => {
        return {
            ...styles.priorityDot,
            backgroundColor: priority === 1 ? colors.green : (priority === 0 ? colors.gray : colors.red),
        };
    };

    priorityText = priority => {
        if (priority === 1) {
            const fontStyle = {...fonts.mediumText, color: colors.green};
            return <Text style={fontStyle}>Yüksek Öncelikli</Text>;
        } else if (priority === 0) {
            const fontStyle = {...fonts.mediumText, color: colors.gray};
            return <Text style={fontStyle}>Orta Öncelikli</Text>;
        } else {
            const fontStyle = {...fonts.mediumText, color: colors.red};
            return <Text style={fontStyle}>Düşük Öncelikli</Text>;
        }
    };

    settingsButtonClickHandler = () => {
        this.setState((state) => ({isOpenAbsoluteButtons: !state.isOpenAbsoluteButtons}));
    };

    goToEditTask = () => {
        this.props.navigation.navigate('EditTask');
    };

    render() {
        const {title, priority, startedAt, goalFinishDate, description} = this.props.navigation.getParam('task', {});
        return (
            <Container>
                <TopBar isBack={true}/>

                <InnerContainer>
                    <Text style={styles.taskTitle}>{title}</Text>
                    <View style={styles.rowContainer}>
                        <View style={styles.priorityContainer}>
                            <Icon name='arrow-up' size={24} color='white'/>
                        </View>

                        <View style={styles.datesContainer}>
                            <View style={styles.dateInnerContainer}>
                                <Text style={styles.dateText}>13.01.20 09.46</Text>
                            </View>

                            <Icon name='arrow-right' size={20} color='#E43D3D'/>

                            <View style={styles.dateInnerContainer}>
                                <Text style={styles.dateText}>15.01.20 09.46</Text>
                            </View>
                        </View>
                    </View>

                    <Divider height={10}/>

                    <View style={{flexDirection: 'row',}}>
                        <TouchableOpacity style={styles.taskFullDetail} activeOpacity={0.6}>
                            {/*<View style={{width: 20, height: 20, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.1)', top: 20, right: 20, borderRadius: 100,}} />*/}
                            {/*<View style={{width: 14, height: 14, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.08)', top: 32, right: 44, borderRadius: 100,}} />*/}
                            {/*<View style={{width: 10, height: 10, position: 'absolute', backgroundColor: 'rgba(0, 0, 0, 0.06)', top: 28, right: 64, borderRadius: 100,}} />*/}
                            <ProfilePicture size={48} picture={profiles[0].profilePhoto} borderRadius={15}/>
                            <View style={{marginLeft: 10,}}>
                                <Text style={styles.authorText}>{profiles[0].fullName}</Text>
                                <Text style={styles.roleText}>Sorumlu Kişi</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            flex: 0.3,
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            backgroundColor: colors.purple,
                            marginLeft: 10,
                            paddingVertical: 4,
                            paddingHorizontal: 10,
                            borderRadius: 15,
                        }}>
                            <TouchableOpacity style={{alignItems: 'center',}}>
                                <Icon name='message-circle' size={24} color='white'/>
                                <Text style={styles.authorText}>23</Text>
                            </TouchableOpacity>
                            <View style={{width: 2, height: '80%', backgroundColor: 'rgba(255, 255, 255, 0.1)'}}/>
                            <TouchableOpacity style={{alignItems: 'center',}}>
                                <Icon name='file' size={22} color='white'/>
                                <Text style={styles.authorText}>23</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.descriptionContainer}>
                        <Text style={fonts.normalText}>{description}</Text>
                    </View>
                </InnerContainer>

                <AbsoluteButton backgroundColor={colors.darkGreen} icon='edit-2' iconColor='white' animated={true}
                                style={{right: 10, translateY: this.state.editAnimatedValue}}
                                pressFunc={this.goToEditTask}/>
                <AbsoluteButton backgroundColor={colors.orange} icon='check' iconColor='white' animated={true}
                                style={{right: 10, translateY: this.state.confirmAnimatedValue}}
                                pressFunc={() => alert('asdasdasd')}/>
                <AbsoluteButton backgroundColor={colors.purple} icon='more-vertical' style={{right: 10, bottom: 10}}
                                pressFunc={this.settingsButtonClickHandler}/>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    taskTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        includeFontPadding: false,
        marginBottom: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    priorityContainer: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.highPriorityDark,
        padding: 12,
        borderRadius: 15,
    },
    datesContainer: {
        flex: 0.9,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.purple,
        marginLeft: 10,
        paddingVertical: 14.4,
        paddingHorizontal: 12,
        borderRadius: 15,
    },
    dateInnerContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateText: {
        ...fonts.mediumText,
        color: 'white',
    },
    taskFullDetail: {
        flex: 0.7,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E43D3D',
        padding: 10,
        borderRadius: 15,
    },
    authorText: {
        ...fonts.mediumText,
        color: 'white',
    },
    roleText: {
        ...fonts.normalText,
        color: 'white',
    },
    priorityDot: {
        width: 16,
        height: 16,
        marginRight: 6,
        borderRadius: 100,
    },
    iconStyle: {
        marginRight: 6,
    },
    descriptionContainer: {
        marginTop: 10,
    },
});

export default TaskDetail;