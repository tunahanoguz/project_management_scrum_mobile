import React, {Component} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import TopBar from "../../components/TopBar";
import MyTaskCard from "../../components/cards/MyTaskCard";
import {tasks} from "../../constants";

class ProjectMyTasks extends Component {

    tasksContainer = () => (
        <FlatList data={tasks} renderItem={({item}) => <MyTaskCard task={item} />}
                  keyExtractor={item => item.id.toString()}/>
    );

    render() {
        return (
            <View style={styles.container}>
                <TopBar isBack={true}/>
                <View style={styles.innerContainer}>
                    <View style={styles.titlesContainer}>
                        <Text style={styles.projectTitle}>e-commerce mobile app design</Text>
                        <Text style={styles.myTasksTitle}>Benim işlerim</Text>
                    </View>

                    {this.tasksContainer()}
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
    },
    titlesContainer: {
        padding: 30,
    },
    projectTitle: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24
    },
    myTasksTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18
    },
});

export default ProjectMyTasks;