import React, {Component, Fragment} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import TopBar from "../../components/TopBar";
import {tasks} from "../../constants";
import AllTaskCard from "../../components/cards/AllTaskCard";
import BlockButton from "../../components/buttons/BlockButton";

class ProjectAllTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: tasks,
            myTasksButton: true,
            otherTasksButton: false,
        };
    }

    userId = 0;

    filterMyTasks = () => {
        const filteredTasks = tasks.filter(task => {
            return task.userId === this.userId;
        });
        this.setState({tasks: filteredTasks, myTasksButton: false, otherTasksButton: true});
    };

    filterOtherTasks = () => {
        this.setState({tasks: tasks, myTasksButton: true, otherTasksButton: false});
    };

    tasksContainer = () => (
        <FlatList data={this.state.tasks}
                  renderItem={({item}) => <AllTaskCard task={item} isMyTask={this.userId === item.userId}/>}
                  keyExtractor={item => item.id.toString()}/>
    );

    filterButtons = () => {
        return (
            <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30, marginBottom: 30,}}>
                <BlockButton color={this.state.myTasksButton ? 'green' : 'gray'} icon='filter' iconSize={16} iconColor={this.state.myTasksButton ? 'white' : 'black'} text="Tüm İşler" textColor={this.state.myTasksButton ? 'white' : 'black'} pressFunc={this.filterOtherTasks} side='left'/>
                <BlockButton color={this.state.otherTasksButton ? 'green' : 'gray'} icon='filter' iconSize={16} iconColor={this.state.otherTasksButton ? 'white' : 'black'} text="Benim İşlerim" textColor={this.state.otherTasksButton ? 'white' : 'black'} pressFunc={this.filterMyTasks} side='right'/>
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <TopBar isBack={true}/>
                <View style={styles.innerContainer}>
                    <View style={styles.titlesContainer}>
                        <Text style={styles.projectTitle}>e-commerce mobile app design</Text>
                        {/*<Text style={styles.myTasksTitle}>Tüm İşler</Text>*/}
                    </View>

                    {this.filterButtons()}
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
        fontSize: 24,
    },
    myTasksTitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 18,
    },
});

export default ProjectAllTasks;