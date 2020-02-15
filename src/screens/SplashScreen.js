import React, {Component} from 'react';
import {View, Text, StyleSheet, Animated, StatusBar} from 'react-native';
import Icon from "react-native-vector-icons/Feather";
import {withNavigation} from 'react-navigation';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {connect} from "react-redux";
import {getUser} from "../actions/authActions";
import Home from "./Home";

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

    // static getDerivedStateFromProps(props, state){
    //     if (!state.splash){
    //         props.navigation.navigate('Home');
    //     }
    //
    //     return null;
    // }

    splashScreen = () => {
        if (this.state.splash) {
            return (
                <View style={styles.splashScreen}>
                    <StatusBar backgroundColor='transparent' translucent={true}/>

                    <Animated.View style={{
                        opacity: this.state.splashLogoAnimation,
                        top: this.state.splashLogoAnimation.interpolate({inputRange: [0, 1], outputRange: [80, 0],})
                    }}>
                        <Icon name='briefcase' size={48} color='white'/>
                    </Animated.View>

                    <Text style={styles.splashScreenText}>Scrum Yöntemi ile Proje Yönetimi</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.splashScreen}>
                    <StatusBar backgroundColor='transparent' translucent={true}/>
                    <Icon name='briefcase' size={48} color='white'/>
                    <Text style={styles.splashScreenText}>Scrum Yöntemi ile Proje Yönetimi</Text>
                </View>
            );
        }
    };

    render() {
        return this.splashScreen();
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(SplashScreen));