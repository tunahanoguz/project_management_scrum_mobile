import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TopBar from "../../components/TopBar";
import {colors, fonts} from "../../styles";
import ProfilePicture from "../../components/ProfilePicture";
import Divider from "../../components/Divider";
import Icon from "react-native-vector-icons/Feather";

class UserProfile extends Component {
    render() {
        const {id, fullName, profilePhoto} = this.props.navigation.getParam('user', {});
        return (
            <View style={styles.container}>
                <TopBar isBack={true}/>

                <View style={styles.innerContainer}>
                    <View style={styles.profileGeneralInfoContainer}>
                        <View style={styles.profilePhotoContainer}>
                            <ProfilePicture picture={profilePhoto} size={60}/>
                        </View>
                        <Text style={styles.cardText}>{fullName}</Text>
                    </View>

                    <View style={{width: '100%', flex: 1, backgroundColor: 'white', padding: 30,}}>
                        <View style={styles.profileDetailCard}>
                            <View style={styles.iconContainer}>
                                <Icon name='users' size={20} color='rgba(0, 0, 0, 0.6)'/>
                            </View>
                            <Text style={fonts.cardTitle}>23 Takım</Text>
                        </View>

                        <Divider height={20}/>

                        <View style={styles.profileDetailCard}>
                            <View style={styles.iconContainer}>
                                <Icon name='briefcase' size={20} color='rgba(0, 0, 0, 0.6)'/>
                            </View>
                            <Text style={fonts.cardTitle}>10 Proje</Text>
                        </View>

                        <Divider height={20}/>

                        <View style={styles.rowContainer}>
                            <View style={styles.blockButton}>
                                <View style={{...styles.iconContainer, marginRight: 0,}}>
                                    <Icon name='user-plus' size={24} color='rgba(0, 0, 0, 0.6)'/>
                                </View>
                                <Divider height={20}/>
                                <Text style={fonts.mediumText}>Bir takıma ekle</Text>
                            </View>
                            <View style={{...styles.blockButton, marginRight: 0,}}>
                                <View style={{...styles.iconContainer, marginRight: 0,}}>
                                    <Icon name='mail' size={24} color='rgba(0, 0, 0, 0.6)'/>
                                </View>
                                <Divider height={20}/>
                                <Text style={fonts.mediumText}>Mesaj gönder</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#060518',
    },
    innerContainer: {
        flex: 1,
        alignItems: 'flex-start',
    },
    profileGeneralInfoContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3f38dd',
        padding: 30,
    },
    profileDetailCard: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.lightGray,
        padding: 15,
        borderRadius: 15,
    },
    profilePhotoContainer: {
        padding: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 100,
    },
    cardText: {
        ...fonts.title,
        marginLeft: 15,
        marginBottom: 0,
        color: 'white',
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        marginRight: 10,
        padding: 12,
        borderRadius: 100,
    },
    blockButton: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.lightGray,
        padding: 15,
        borderRadius: 15,
        marginRight: 20
    },
    rowContainer: {
        flexDirection: 'row',
    },
});

export default UserProfile;