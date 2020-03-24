import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {connect} from "react-redux";
import styled from 'styled-components';
import {
    TopBar,
    Button,
    DoubleButton,
} from 'components';
import {
    Container,
    DirectionContainer,
    Divider,
    InnerContainer,
    Title
} from "../../styles";
import {getUser, logOut} from "../../actions/authActions";

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
            <Container>
                <TopBar isBack={true} color='light'/>

                <InnerContainer padding={30} nonRadius>
                    <DirectionContainer row alignCenter>
                        <ProfilePicture source={{uri: photoURL}} size={100}/>
                        <Divider width={10} />
                        <DirectionContainer justifyCenter>
                            <Title>{displayName}</Title>
                            <Divider height={10} />
                            <Button color='purple' text="🖐️ ÇIKIŞ YAP" action={this.logOut}/>
                        </DirectionContainer>
                    </DirectionContainer>
                </InnerContainer>

                <Container space>
                    <DoubleButton firstText="✍️PROFİLİ DÜZENLE" secondText="🔑 ŞİFREYİ DEĞİŞTİR" firstColor='green' secondColor='blue' firstAction={() => this.goToEditProfile()} secondAction={() => this.goToChangePassword()}/>
                </Container>

                {/*<View style={styles.innerContainer}>*/}
                {/*    <View style={styles.profileHeaderContainer}>*/}
                {/*        <Text style={fonts.title}>Profilim</Text>*/}
                {/*        <TouchableOpacity onPress={() => this.logOut()}>*/}
                {/*            <Icon name='log-out' size={24} style={{marginTop: -10,}}/>*/}
                {/*        </TouchableOpacity>*/}
                {/*    </View>*/}

                {/*    <View style={styles.profileDetailContainer}>*/}
                {/*        <ProfilePicture picture={photoURL} size={80}/>*/}

                {/*        <View style={styles.profileDetailInnerContainer}>*/}
                {/*            <Text style={styles.fullName}>{displayName}</Text>*/}
                {/*            <View style={styles.numbersContainer}>*/}
                {/*                <View style={styles.numberContainer}>*/}
                {/*                    <Text style={styles.number}>5</Text>*/}
                {/*                    <Text style={styles.numbersText}>Teams</Text>*/}
                {/*                </View>*/}
                {/*                <View style={styles.numbersDivider}/>*/}
                {/*                <View style={styles.numberContainer}>*/}
                {/*                    <Text style={styles.number}>23</Text>*/}
                {/*                    <Text style={styles.numbersText}>Projects</Text>*/}
                {/*                </View>*/}
                {/*            </View>*/}
                {/*        </View>*/}
                {/*    </View>*/}

                {/*    <Divider height={20}/>*/}

                {/*    <View style={styles.rowContainer}>*/}
                {/*        <BlockButton color="green" icon="user" iconSize={16} text="Profili Düzenle" side="left"*/}
                {/*                     pressFunc={this.goToEditProfile}/>*/}
                {/*        <BlockButton color="purple" icon="key" iconSize={16} text="Şifreyi Değiştir" side="right"*/}
                {/*                     pressFunc={this.goToChangePassword}/>*/}
                {/*    </View>*/}

                {/*    <Divider height={20}/>*/}

                {/*    <Text style={fonts.title}>En Yakın İş</Text>*/}
                {/*    <View style={{marginHorizontal: -30}}>*/}
                {/*        <MyTaskCard task={tasks[0]}/>*/}
                {/*    </View>*/}

                {/*    <Text style={fonts.title}>Son Proje</Text>*/}
                {/*    <View style={{marginHorizontal: -30}}>*/}
                {/*        <MyTaskCard task={tasks[0]}/>*/}
                {/*    </View>*/}
                {/*</View>*/}
            </Container>
        );
    }
}

const ProfilePicture = styled.Image`
    width: ${({size}) => size ? size : 80}px;
    height: ${({size}) => size ? size : 80}px;
    border-radius: 100px;
`;

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
    profileHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
