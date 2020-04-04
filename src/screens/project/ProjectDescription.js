import React, {Component} from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {AbsoluteButton, TopBar} from 'components';
import {Container, Text} from "../../styles";
import {getProjectDescription} from "../../actions/projectActions";
import {connect} from "react-redux";

class ProjectNotes extends Component {
    projectID = this.props.navigation.getParam('projectID', "");

    componentDidMount() {
        this.props.getProjectDescription(this.projectID);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <TopBar isBack={true}/>

                <Container>
                    <View style={styles.innerContainer}>
                        <Text medium>{this.props.projectDescription}</Text>
                    </View>

                    <AbsoluteButton
                        icon='edit'
                        backgroundColor='indigo'
                        pressFunc={() =>  this.props.navigation.navigate('EditProjectDescription', {projectID: this.projectID, description: this.props.projectDescription})}
                        style={{
                            bottom: 10,
                            right: 10,
                        }}
                    />
                </Container>
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

const mapStateToProps = state => {
    return {
        projectDescription: state.projectReducer.projectDescription,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getProjectDescription: (projectID) => dispatch(getProjectDescription(projectID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(ProjectNotes));
