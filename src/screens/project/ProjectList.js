import React, {Component} from 'react';
import {View, FlatList, StyleSheet, Animated, Text,} from 'react-native';
import Container from "../../components/Container";
import TopBar from "../../components/TopBar";
import {colors, sizes} from "../../styles";
import ProjectListCard from "../../components/cards/ProjectListCard";
import ProjectActionsModal from "../../components/modals/ProjectActionsModal";
import AbsoluteButton from "../../components/buttons/AbsoluteButton";
import {getAllProjects} from "../../actions/projectActions";
import {connect} from "react-redux";
import {ActivityIndicator} from "react-native-paper";

class ProjectList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animatedValue: new Animated.Value(sizes.deviceHeight),
            isActionsModalOpen: false,
            selectedProjectID: null,
            projects: [],
        };

        this.props.navigation.addListener("didFocus", () => {
            this.props.getAllProjects(this.props.teamIDs);
        });
    }

    componentDidMount() {
        this.props.getAllProjects(this.props.teamIDs);
    }

    toggleActionsContainer = (projectID) => {
        this.setState(state => ({isActionsModalOpen: !state.isActionsModalOpen, selectedProjectID: projectID}));
        const toValueCondition = this.state.isActionsModalOpen ? sizes.deviceHeight : 0;
        Animated.timing(this.state.animatedValue, {
            toValue: toValueCondition,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    goToCreateProjectScreen = () => {
        this.props.navigation.navigate('CreateProject');
    };

    projectListContainer = (projects) => {
        return (
            <View style={[styles.innerContainer, {paddingVertical: 15,}]}>
                <FlatList data={projects} renderItem={({item, index}) => <ProjectListCard project={item} order={index} action={this.toggleActionsContainer} />} keyExtractor={(item, index) => index.toString()} />
            </View>
        );
    };

    renderProjectList = () => {
        const {loading, error, projects} = this.props;
        if (loading){
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}><ActivityIndicator size='large'/></View>
            );
        } else if (error !== null){
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',}}><Text>{error}</Text></View>
            );
        } else {
            return this.projectListContainer(projects);
        }
    };

    render() {
        return (
            <Container>
                <TopBar title='Project List' isBack={false}/>

                {this.renderProjectList()}

                <AbsoluteButton icon='plus' backgroundColor={colors.purple} pressFunc={() => this.goToCreateProjectScreen()} style={{bottom: 10, left: 10,}} />
                <ProjectActionsModal isOpen={this.state.isActionsModalOpen} animatedValue={this.state.animatedValue} toggleFunc={this.toggleActionsContainer} />
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    innerContainer: {
        flex: 1,
    },
});

const mapStateToProps = state => {
    return {
        loading: state.projectReducer.loading,
        error: state.projectReducer.error,
        projects: state.projectReducer.projects,
        teamIDs: state.teamReducer.teamIDs,
        teams: state.teamReducer.teams,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllProjects: (teamIDs) => dispatch(getAllProjects(teamIDs)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);