import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import UserCard from "../../components/cards/UserCard";
import TopBar from "../../components/TopBar";
import {connect} from "react-redux";
import {Container, Divider, InnerContainer, Title} from "../../styles";

class TeamMembers extends Component {
    members = () => {
        const members = this.props.navigation.getParam("members", "");

        return (
            <FlatList
                data={members}
                renderItem={({item, index}) => <UserCard user={item} role={members[index]?.role}/>}
                keyExtractor={(item) => item.id.toString()}
            />
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <TopBar isBack={true}/>

                <Container space>
                    <Title>Takım Üyeleri</Title>
                    <Divider height={10}/>
                    <InnerContainer>
                        {this.members()}
                        <Divider height={10} />
                    </InnerContainer>
                </Container>


                {/*<View style={styles.innerContainer}>*/}
                {/*    {this.members()}*/}
                {/*</View>*/}
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
