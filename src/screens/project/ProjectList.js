import React, {Component} from 'react';
import {Animated} from 'react-native';
import {connect} from "react-redux";
import {
    TopBar,
    ProjectActionsModal,
    List,
    Button,
} from 'components';
import {Container, sizes} from "../../styles";
import {getAllProjects} from "../../actions/projectActions";

class ProjectList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animatedValue: new Animated.Value(sizes.deviceHeight),
            isActionsModalOpen: false,
            selectedProjectID: "",
            // index: 0,
        };
    }

    componentDidMount() {
        this.props.getAllProjects(this.props.teamIDs);
    }

    // componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    //     if (prevState.index !== this.state.index){
    //         this.props.getAllProjects(this.props.teamIDs, this.state.index);
    //     }
    // }

    toggleActionsContainer = (projectID) => {
        this.setState(state => ({isActionsModalOpen: !state.isActionsModalOpen}));
        this.setState({selectedProjectID: projectID});
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

    endReachedFunc = () => {
        console.log("Hey!");
        if (this.state.index < this.props.teamIDs?.length){
            this.setState(value => ({index: value.index + 10}));
        }
    };

    renderProjectList = (loading, error, projects) => {
        return (
            <Container flex={0.8}>
                <List
                    data={projects}
                    loading={loading}
                    error={error}
                    orderColor='orangered'
                    type='project'
                    isFunctioned={true}
                    modalFunc={this.toggleActionsContainer}
                    endReachedFunc={this.endReachedFunc}
                />
            </Container>
        );
    };

    render() {
        const {loading, error, projects} = this.props;
        return (
            <Container>
                <TopBar title='Projeler' isBack={false}/>

                <Container space>
                    {this.renderProjectList(loading, error, projects)}

                    <Container flex={0.2} verticalMiddle>
                        <Button
                            color='purple'
                            text="🤙 Proje Oluştur"
                            action={this.goToCreateProjectScreen}
                        />
                    </Container>
                </Container>

                <ProjectActionsModal
                    isOpen={this.state.isActionsModalOpen}
                    animatedValue={this.state.animatedValue}
                    toggleFunc={this.toggleActionsContainer}
                    selectedProjectID={this.state.selectedProjectID}
                    teamIDs={this.props.teamIDs}
                />
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.projectReducer.loading,
        error: state.projectReducer.error,
        projects: state.projectReducer.projects,
        teamIDs: state.teamReducer.teamIDs,
        teams: state.teamReducer.teams,
        deleteProjectState: state.projectReducer.deleteProjectState,
        deleteProjectMessage: state.projectReducer.deleteProjectMessage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllProjects: (teamIDs) => dispatch(getAllProjects(teamIDs)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
