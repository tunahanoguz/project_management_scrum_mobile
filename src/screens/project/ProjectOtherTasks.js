import React, {Component} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import TopBar from "../../components/TopBar";
import OtherTaskCard from "../../components/cards/OtherTaskCard";
import {tasks} from "../../constants";

class ProjectOtherTasks extends Component {

    tasksContainer = () => (
        <FlatList data={tasks} renderItem={({item}) => <OtherTaskCard task={item}/>}
                  keyExtractor={item => item.id.toString()}/>
    );

    render() {
        return (
            <View style={styles.container}>
                <TopBar isBack={true}/>
                <View style={styles.innerContainer}>
                    <View style={styles.titlesContainer}>
                        <Text style={styles.projectTitle}>e-commerce mobile app design</Text>
                        <Text style={styles.myTasksTitle}>Diğer İşler</Text>
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

export default ProjectOtherTasks;