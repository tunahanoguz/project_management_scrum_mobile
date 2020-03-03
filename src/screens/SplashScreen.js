import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, StatusBar} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import {withNavigation} from 'react-navigation';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {connect} from "react-redux";
import {getUser} from "../actions/authActions";
import Home from "./Home";
import FlashMessage from "react-native-flash-message";
import {getAllTeams} from "../actions/teamActions";

class SplashScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            auth: false,
            splash: true,
            splashLogoAnimation: new Animated.Value(0),
        };
    }

    componentDidMount() {
        this.props.getUser();

        changeNavigationBarColor('#060518');
        setTimeout(function () {
            this.props.navigation.navigate('Home');
        }.bind(this), 3000);

        Animated.spring(this.state.splashLogoAnimation, {
            toValue: 1,
            tension: 10,
            friction: 2,
            duration: 1000,
        }).start();

        this.props.navigation.addListener("didFocus", () => {
            this.setState({splash: false});
        });
    }

    splashScreen = ({splash, splashLogoAnimation}) => {
        if (splash) {
            return (
                <View style={styles.splashScreen}>
                    <StatusBar backgroundColor='transparent' translucent={true}/>

                    <Animated.View style={{
                        opacity: splashLogoAnimation,
                        top: splashLogoAnimation.interpolate({inputRange: [0, 1], outputRange: [80, 0],})
                    }}>
                        <Icon name='briefcase' size={48} color='white'/>
                    </Animated.View>

                    <Text style={styles.splashScreenText}>Scrum Yöntemi ile Proje Yönetimi</Text>
                    <FlashMessage position="top" />
                </View>
            );
        } else {
            return (
                <View style={styles.splashScreen}>
                    <StatusBar backgroundColor='transparent' translucent={true}/>
                    <Icon name='briefcase' size={48} color='white'/>
                    <Text style={styles.splashScreenText}>Scrum Yöntemi ile Proje Yönetimi</Text>
                    <FlashMessage position="top" />
                </View>
            );
        }
    };

    render() {
        return this.splashScreen(this.state);
    }
}

SplashScreen.navigationOptions = {
    tabBarVisible: false,
};

const styles = StyleSheet.create({
    splashScreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#060518',
    },
    splashScreenText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 24,
        color: 'white',
        marginTop: 30,
        textAlign: 'center',
    },
});

const mapStateToProps = (state) => {
    return {
        user: state.authReducer.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(getUser()),
        getAllTeams: (userID) => dispatch(getAllTeams(userID)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SplashScreen));