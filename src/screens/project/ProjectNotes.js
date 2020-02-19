import React, {Component, Fragment} from 'react';
import {SafeAreaView, View, Text, FlatList, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import TopBar from "../../components/TopBar";
import {fonts} from "../../styles";

class ProjectNotes extends Component {
    notes = this.props.navigation.getParam('notes', []);

    noteList = (item, index) => (
        <View style={styles.noteContainer}>
            <View style={styles.rowContainer}>
                <Text style={styles.indexText}>{index + 1}.</Text>
                <Text style={fonts.normalText}>{item.note}</Text>
            </View>
        </View>
    );

    notesContainer = () => {
        if (this.notes.length > 0) {
            return (
                <FlatList data={this.notes} renderItem={({item, index}) => this.noteList(item, index)}
                          keyExtractor={(item, index) => index.toString()}/>
            );
        } else {
            return null;
        }
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TopBar isBack={true}/>

                <View style={styles.innerContainer}>
                    {this.notesContainer()}
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
    },
    innerContainer: {
        flexDirection: 'column',
        paddingHorizontal: 30,
    },
    noteContainer: {
        paddingVertical: 20,
        // paddingHorizontal: 30,
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    },
    rowContainer: {
        flexDirection: 'row',
    },
    indexText: {
        fontFamily: 'Poppins-Medium',
        fontWeight: 'bold',
        marginRight: 6,
    },
});

export default withNavigation(ProjectNotes);