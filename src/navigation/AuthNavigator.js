import {createStackNavigator} from "react-navigation-stack";
import {
    Home,
    Register,
    Login,
    MyProfile,
    ChangePasswordFirstScreen,
    ChangePasswordSecondScreen,
    ForgotPassword,
    EditProfile,
} from 'screens';

const AuthNavigator = createStackNavigator(
    {
        Home,
        Register,
        Login,
        MyProfile,
        ChangePasswordFirstScreen,
        ChangePasswordSecondScreen,
        ForgotPassword,
        EditProfile,
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
    }
);

AuthNavigator.navigationOptions = ({ navigation }) => {
    let tabBarVisible;
    if (navigation.state.routes.length > 1) {
        navigation.state.routes.map(route => {
            tabBarVisible = !(route.routeName === "Register" || route.routeName === "Login" || route.routeName === "ForgotPassword");
        });
    }

    return {
        tabBarVisible
    };
};

export default AuthNavigator;
