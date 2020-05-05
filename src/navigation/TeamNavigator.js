import {createStackNavigator} from "react-navigation-stack";
import {
    TeamList,
    TeamDetail,
    TeamDescription,
    TeamMembers,
    TeamProjectsList,
    CreateTeam,
    UserProfile,
    EditTeamDescription,
} from 'screens';

const TeamNavigator = createStackNavigator(
    {
        TeamList,
        TeamDetail,
        TeamDescription,
        TeamMembers,
        TeamProjectsList,
        CreateTeam,
        UserProfile,
        EditTeamDescription,
    },
    {
        initialRouteName: 'TeamList',
        headerMode: 'none',
    }
);

export default TeamNavigator;
