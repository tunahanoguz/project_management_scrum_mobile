import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    Animated,
    TouchableOpacity,
    Keyboard,
    Dimensions,
    TextInput,
    StyleSheet,
} from 'react-native';
import {connect} from "react-redux";
import {withNavigation} from 'react-navigation';
import Icon from "react-native-vector-icons/Feather";
import Container from "../../components/Container";
import TopBar from "../../components/TopBar";
import InnerContainer from "../../components/InnerContainer";
import {colors, fonts} from "../../styles";
import Input from "../../components/form/Input";
import BlockButton from "../../components/buttons/BlockButton";
import RoundedButton from "../../components/buttons/RoundedButton";
import Divider from "../../components/Divider";
import ProjectNoteCard from "../../components/cards/ProjectNoteCard";
import validate from "validate.js";
import {getAllCreatedTeams, getAllTeams} from "../../actions/teamActions";
import {createProject} from "../../actions/projectActions";
import {projectValidations} from "../../validations";

class CreateProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projectName: "",
            projectNameError: "",
            projectDescription: "",
            projectDescriptionError: "",
            assignedTeam: null,
            projectNote: "",
            projectNoteError: "",
            projectNotes: [],
            assignTeamModal: false,
            addNoteModal: false,
            assignTeamModalOpacity: new Animated.Value(-Dimensions.get('window').height),
            addNodeModalAnimatedValue: new Animated.Value(-Dimensions.get('window').height),
            selectedItem: null,
        };
    }

    componentDidMount() {
        this.props.getAllTeams();
        this.props.getAllCreatedTeams(this.props.user.uid);
    }

    setStateFunc = (stateName, value) => {
        this.setState({[stateName]: value});
    };

    validateProjectName = (value) => {
        const error = validate({projectName: this.state.projectName === "" ? null : value}, projectValidations.projectNameValidation);
        if (error) {
            this.setState({projectNameError: error.projectName});
        } else {
            this.setState({projectNameError: ""});
        }

        return error;
    };

    validateProjectDescription = (value) => {
        const error = validate({projectDescription: this.state.projectDescription === "" ? null : value}, projectValidations.projectDescriptionValidation);
        if (error) {
            this.setState({projectDescriptionError: error.projectDescription});
        } else {
            this.setState({projectDescriptionError: ""});
        }

        return error;
    };

    // --------------------------------------------------------------------------------------
    // The place where listening teams

    teamListItem = (item, index) => {
        const backgroundColor = {
            backgroundColor: this.state.selectedItem === index ? 'gray' : 'white',
        };
        return (
            <TouchableOpacity style={{...backgroundColor, padding: 15, borderRadius: 15, marginBottom: 10,}}
                              onPress={() => this.setState({selectedItem: index, assignedTeam: item.id})}><Text
                style={fonts.mediumText}>{item.name}</Text></TouchableOpacity>
        );
    };

    // --------------------------------------------------------------------------------------
    // Team assign modal

    assignTeamModal = () => {
        return (
            <Animated.View style={{
                flex: 1,
                width: '100%',
                height: '100%',
                position: 'absolute',
                bottom: this.state.assignTeamModalOpacity,
                backgroundColor: '#F2F2F2',
                paddingVertical: 60,
                paddingHorizontal: 30,
            }}>
                <Container>
                    <TouchableOpacity onPress={this.toggleAssignTeamModal} style={{marginBottom: 10,}}>
                        <Icon name='x' size={36} style={{textAlign: 'right'}}/>
                    </TouchableOpacity>
                    <FlatList data={this.props.createdTeams} renderItem={({item, index}) => this.teamListItem(item, index)}
                              keyExtractor={(item, index) => index.toString()}/>
                    <RoundedButton color='purple' icon='check' pressFunc={this.toggleAssignTeamModal}/>
                </Container>
            </Animated.View>
        );
    };

    // --------------------------------------------------------------------------------------
    // Team assign modal button

    toggleAssignTeamModal = () => {
        this.setState((state) => ({assignTeamModal: !state.assignTeamModal}));
        const toValue = this.state.assignTeamModal ? -Dimensions.get('window').height : 0;
        Animated.timing(this.state.assignTeamModalOpacity, {
            toValue: toValue,
            duration: 1000,
        }).start();
    };

    // --------------------------------------------------------------------------------------
    // Note List

    noteList = () => {
        if (this.state.projectNotes.length > 0) {
            return (
                <FlatList data={this.state.projectNotes}
                          renderItem={({item, index}) => <ProjectNoteCard key={index} note={item}/>}
                          keyExtractor={(item, index) => index.toString()}/>
            );
        }
    };

    // --------------------------------------------------------------------------------------
    // Add note modal

    addNoteModal = () => {
        const {addNodeModalAnimatedValue, projectNote, projectNoteError, projectNotes} = this.state;
        return (
            <Animated.View style={{
                flex: 1,
                width: '100%',
                height: '100%',
                position: 'absolute',
                bottom: addNodeModalAnimatedValue,
                backgroundColor: '#F2F2F2',
                paddingVertical: 60,
                paddingHorizontal: 30,
            }}>
                <Container>
                    <TouchableOpacity onPress={this.toggleAddNoteModal} style={{marginBottom: 10,}}>
                        <Icon name='x' size={36} style={{textAlign: 'right'}}/>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{flex: 1}}>
                            <TextInput style={[fonts.normalText, styles.multilineInput]} value={projectNote}
                                       placeholder='Proje notu' multiline={true}
                                       onChangeText={text => this.setState({projectNote: text})}/>
                        </View>
                    </View>

                    <Divider height={10}/>

                    <View style={styles.rowContainer}>
                        <BlockButton color='green' text="Notu Ekle" icon='plus' iconSize={16} pressFunc={() => {
                            const note = {
                                note: projectNote,
                                userID: this.props.user.uid,
                                createdAt: new Date(),
                            };
                            projectNotes.unshift(note);
                            this.setState({projectNotes: projectNotes, projectNote: ""});
                        }} side='left'/>

                        <BlockButton color='purple' text="Tamamla" icon='check' iconSize={16}
                                     pressFunc={this.toggleAddNoteModal} side='right'/>
                    </View>

                    <Divider height={10}/>

                    {this.noteList()}
                </Container>
            </Animated.View>
        );
    };

    // --------------------------------------------------------------------------------------
    // Add note modal toggle button

    toggleAddNoteModal = () => {
        Keyboard.dismiss();
        this.setState((state) => ({addTeamModal: !state.addTeamModal}));
        const toValue = this.state.addTeamModal ? -Dimensions.get('window').height : 0;
        Animated.timing(this.state.addNodeModalAnimatedValue, {
            toValue: toValue,
            duration: 1000,
        }).start();
    };

    // --------------------------------------------------------------------------------------
    // Create Project Function

    createProject = (projectName, projectDescription, projectNotes, assignedTeam,) => {
        Keyboard.dismiss();
        this.props.createProject(projectName, projectDescription, projectNotes, new Date(), null, null, assignedTeam, this.props.teamIDs, this.props.user.uid);
        this.props.navigation.navigate('ProjectList');
    };

    // --------------------------------------------------------------------------------------
    // Render screen

    render() {
        const {projectName, projectNameError, projectDescription, projectDescriptionError, projectNotes, assignedTeam} = this.state;
        return (
            <Container>
                <TopBar isBack={true}/>

                <InnerContainer padding={30}>
                    <Text style={fonts.title}>Proje Oluştur</Text>

                    <Input isValid={this.validateProjectName} iconName='hash' value={projectName}
                           placeholder="Proje adı"
                           name='projectName' setStateFunc={this.setStateFunc} errorMessage={projectNameError}/>
                    <Input isValid={this.validateProjectDescription} iconName='align-left' value={projectDescription}
                           placeholder="Proje açıklaması" name='projectDescription' setStateFunc={this.setStateFunc}
                           errorMessage={projectDescriptionError}/>

                    <View style={styles.rowContainer}>
                        <BlockButton color='green' text="Not Ekle" icon='plus' iconSize={16}
                                     pressFunc={this.toggleAddNoteModal}
                                     side='left'/>
                        <BlockButton color='purple' text="Takım Ata" icon='user-plus' iconSize={16}
                                     pressFunc={this.toggleAssignTeamModal} side='right'/>
                    </View>

                    <Divider height={20}/>

                    <RoundedButton color='dark' icon='arrow-right'
                                   pressFunc={() => this.createProject(projectName, projectDescription, projectNotes, assignedTeam)}/>
                </InnerContainer>

                {this.assignTeamModal()}
                {this.addNoteModal()}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: '#060518',
    },
    rowContainer: {
        flexDirection: 'row'
    },
    multilineInput: {
        height: 100,
        backgroundColor: colors.lightGray,
        paddingTop: 15,
        paddingBottom: 10,
        paddingHorizontal: 15,
        borderRadius: 15,
        textAlignVertical: 'top',
    },
});

const mapStateToProps = state => {
    return {
        createdTeams: state.teamReducer.createdTeams,
        teamIDs: state.teamReducer.teamIDs,
        user: state.authReducer.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllTeams: () => dispatch(getAllTeams()),
        getAllCreatedTeams: (userID) => dispatch(getAllCreatedTeams(userID)),
        createProject: (name, description, notes, createdAt, startDate, finishDate, teamID, teamIDs, userID) => dispatch(createProject(name, description, notes, createdAt, startDate, finishDate, teamID, teamIDs, userID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CreateProject));