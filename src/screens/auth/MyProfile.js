import React, {Component} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import TopBar from "../../components/TopBar";
import {fonts} from "../../styles";
import {tasks} from "../../constants";
import BlockButton from "../../components/buttons/BlockButton";
import MyTaskCard from "../../components/cards/MyTaskCard";
import Divider from "../../components/Divider";
import Icon from "react-native-vector-icons/Feather";
import {connect} from "react-redux";
import {getUser, logOut} from "../../actions/authActions";
import ProfilePicture from "../../components/ProfilePicture";

class MyProfile extends Component {

    componentDidMount() {
        this.props.getUser();
    }

    goToEditProfile = () => {
        this.props.navigation.navigate("EditProfile");
    };

    goToChangePassword = () => {
        this.props.navigation.navigate("ChangePasswordFirstScreen");
    };

    logOut = () => {
        this.props.logOutAction();
    };

    render() {
        const {photoURL, displayName} = this.props.user;
        return (
            <View style={styles.container}>
                <TopBar isBack={true}/>

                <View style={styles.innerContainer}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',}}>
                        <Text style={fonts.title}>Profilim</Text>
                        <TouchableOpacity onPress={() => this.logOut()}>
                            <Icon name='log-out' size={24} style={{marginTop: -10,}}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileDetailContainer}>
                        <ProfilePicture picture={photoURL} size={80}/>

                        <View style={styles.profileDetailInnerContainer}>
                            <Text style={styles.fullName}>{displayName}</Text>
                            <View style={styles.numbersContainer}>
                                <View style={styles.numberContainer}>
                                    <Text style={styles.number}>5</Text>
                                    <Text style={styles.numbersText}>Teams</Text>
                                </View>
                                <View style={styles.numbersDivider}/>
                                <View style={styles.numberContainer}>
                                    <Text style={styles.number}>23</Text>
                                    <Text style={styles.numbersText}>Projects</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <Divider height={20}/>

                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <BlockButton color="green" icon="user" iconSize={16} text="Profili Düzenle" side="left"
                                     pressFunc={this.goToEditProfile}/>
                        <BlockButton color="purple" icon="key" iconSize={16} text="Şifreyi Değiştir" side="right"
                                     pressFunc={this.goToChangePassword}/>
                    </View>

                    <Divider height={20}/>

                    <Text style={fonts.title}>En Yakın İş</Text>
                    <View style={{marginHorizontal: -30}}>
                        <MyTaskCard task={tasks[0]}/>
                    </View>

                    <Text style={fonts.title}>Son Proje</Text>
                    <View style={{marginHorizontal: -30}}>
                        <MyTaskCard task={tasks[0]}/>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    divider: {
        height: 10,
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    profileDetailContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        padding: 15,
        borderRadius: 15,
    },
    profileDetailInnerContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 15,
    },
    numbersContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    numberContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    number: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
        includeFontPadding: false,
    },
    numbersText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        includeFontPadding: false,
    },
    numbersDivider: {
        width: 2,
        height: '100%',
        marginHorizontal: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius: 100,
    },
    profilePhoto: {
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    fullName: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        includeFontPadding: false,
    },
});

const mapStateToProps = state => {
    return {
        user: state.authReducer.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logOutAction: () => dispatch(logOut()),
        getUser: () => dispatch(getUser()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);