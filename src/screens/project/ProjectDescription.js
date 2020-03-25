import React, {Component} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {TopBar} from 'components';
import {Text} from "../../styles";

class ProjectNotes extends Component {
    description = this.props.navigation.getParam('description', "");

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TopBar isBack={true}/>

                <View style={styles.innerContainer}>
                    <Text medium>{this.description}</Text>
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
        padding: 30,
    },
    descriptionText: {
        fontFamily: 'Poppins-Regular',
        lineHeight: 24,
    },
});

export default withNavigation(ProjectNotes);
