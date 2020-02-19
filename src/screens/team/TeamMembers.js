import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import UserCard from "../../components/cards/UserCard";
import TopBar from "../../components/TopBar";
import {connect} from "react-redux";

class TeamMembers extends Component {
    members = () => {
        // const usersInfo = this.props.teamMembers;
        const members = this.props.navigation.getParam("members", "");

        return <FlatList data={members}
                         renderItem={({item, index}) => {
                             let style = {};
                             if (index === 0) {
                                 style = {marginTop: 30};
                             }

                             return <UserCard user={item} role={members[index]?.role} style={style}/>;
                         }}
                         keyExtractor={(item) => item.id.toString()}/>
    };

    render() {
        return (
            <View style={styles.container}>
                <TopBar isBack={true}/>

                <View style={styles.innerContainer}>
                    {this.members()}
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
    innerContainer: {
        flex: 1,
        paddingLeft: 30
    },
});

const mapStateToProps = state => {
    return {
        teamMembers: state.teamReducer.teamMembers,
    };
};

export default connect(mapStateToProps, null)(TeamMembers);