import {createStackNavigator} from "react-navigation-stack";
import {NotificationList} from "screens";

const NotificationNavigator = createStackNavigator(
    {
        NotificationList,
    },
    {
        initialRouteName: 'NotificationList',
        headerMode: 'none',
    }
);

export default NotificationNavigator;
