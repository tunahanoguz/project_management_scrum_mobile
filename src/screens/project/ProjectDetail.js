import React, {Component, Fragment} from 'react';
import {TouchableOpacity} from 'react-native'
import {connect} from "react-redux";
import {
    TopBar,
    TabContent,
    List,
    ListActionModal,
    Button,
    DoubleButton,
} from 'components';
import {
    Container,
    Divider,
    InnerContainer,
    Text,
    TextMedium,
    TextNormal,
    Title,
} from "../../styles";
import {
    getAllProjectComments,
    getAllProjectFiles,
    getProjectParentCommentsForDetail, getSingleProject
} from "../../actions/projectActions";
import {getSprintsForProjectDetail} from "../../actions/sprintActions";
import {getAllProjectTasks} from "../../actions/taskActions";
import {getTeamUserIDs} from "../../actions/teamActions";

class ProjectDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 0,
            isModalOpen: false,
            selectedItemID: null,
        };
    }

    componentDidMount() {
        const {id, teamID} = this.props.navigation.getParam('project', {});
        const {getSingleProject, getAllProjectComments, getAllProjectFiles, getSprintsForProjectDetail, getAllProjectTasks, getProjectParentCommentsForDetail, getTeamUserIDs} = this.props;

        getSingleProject(id);
        getAllProjectComments(id);
        getAllProjectFiles(id);
        getSprintsForProjectDetail(id);
        getAllProjectTasks(id);
        getProjectParentCommentsForDetail(id);
        getTeamUserIDs(teamID);
    }

    goToCreateTask = (projectID) => {
        this.props.navigation.navigate("CreateTask", {projectID});
    };

    goToTaskList = (projectID) => {
        this.props.navigation.navigate("TaskList", {projectID});
    };

    goToProjectCommentList = (projectID) => {
        this.props.navigation.navigate("ProjectCommentList", {projectID});
    };

    goToProjectFileList = (projectID) => {
        this.props.navigation.navigate("ProjectFileList", {projectID});
    };

    goToProjectDescription = (projectID, description) => {
        this.props.navigation.navigate("ProjectDescription", {projectID, description});
    };

    goToProjectNotes = (projectID) => {
        this.props.navigation.navigate("ProjectNotes", {projectID});
    };

    goToSprintList = (projectID, createdBy) => {
        this.props.navigation.navigate("SprintList", {projectID, createdBy, userIDs: this.props.userIDs});
    };

    editSprintAction = () => {
    };

    deleteSprintAction = () => {
    };

    setSelectedTab = (order) => {
        this.setState({selectedTab: order});
    };

    tabs = [
        {icon: '📖', name: 'Bilgi'},
        {icon: '💪', name: 'İş'},
        {icon: '🏃', name: 'Sprint'},
        {icon: '💬', name: 'Yorum'},
    ];

    projectInformation = (projectID, description, notes) => {
        const projectDescriptionLength = description.length;
        return (
            <Container>
                <Text medium>Açıklama</Text>

                <Divider height={10}/>

                <TouchableOpacity onPress={() => this.goToProjectDescription(projectID, description)}>
                    <InnerContainer>
                        <TextNormal>{projectDescriptionLength > 64 ? description.substring(0, 64) + "..." : description}</TextNormal>
                    </InnerContainer>
                </TouchableOpacity>

                <Divider height={20}/>

                <Text medium>Notlar</Text>

                <Divider height={10}/>

                {notes && notes.length !== 0 && (
                    <TouchableOpacity onPress={() => this.goToProjectNotes(projectID)}>
                        <InnerContainer>
                            {notes.map((note, index) => {
                                if (index < 3) {
                                    return <TextMedium key={index} numberOfLines={1}>{note.note}</TextMedium>;
                                } else {
                                }
                            })}
                        </InnerContainer>
                    </TouchableOpacity>
                )}
            </Container>
        );
    };

    projectTasks = () => {
        const {taskLoading, taskError, tasks} = this.props;
        return (
            <Container flex={0.8}>
                <List
                    data={tasks}
                    type='task'
                    loading={taskLoading}
                    error={taskError}
                    orderColor='orangered'
                    isFunctioned={false}
                    modalFunc={this.setIsOpenModal}
                />
            </Container>
        );
    };

    setIsOpenModal = (itemID) => {
        this.setState(state => ({isModalOpen: !state.isModalOpen, selectedItemID: itemID}));
    };

    projectSprints = () => {
        const {sprintLoading, sprintError, sprints} = this.props;
        return (
            <Container flex={0.8}>
                <List
                    data={sprints}
                    type='sprint'
                    loading={sprintLoading}
                    error={sprintError}
                    orderColor='orangered'
                    isFunctioned={false}
                    modalFunc={this.setIsOpenModal}
                />
            </Container>
        );
    };

    projectComments = () => {
        const {commentLoading, commentError, comments} = this.props;
        return (
            <Container flex={0.8}>
                <List
                    data={comments}
                    type='comment'
                    loading={commentLoading}
                    error={commentError}
                    orderColor='orangered'
                    isFunctioned={false}
                    modalFunc={this.setIsOpenModal}
                />
            </Container>
        );
    };

    renderTabContents = (projectID, selectedTab, description, notes) => {
        if (selectedTab === 0) {
            return this.projectInformation(projectID, description, notes);
        } else if (selectedTab === 1) {
            return this.projectTasks();
        } else if (selectedTab === 2) {
            return this.projectSprints();
        } else {
            return this.projectComments();
        }
    };

    renderButtons = (projectID, createdBy, selectedTab) => {
        if (selectedTab === 0) {
            return (
                <Container
                    flex={0.2}
                    verticalMiddle
                >
                    <Button
                        color='seagreen'
                        text="📁 DOSYALARI GÖRÜNTÜLE"
                        action={() => this.goToProjectFileList(projectID)}
                    />
                </Container>
            );
        } else if (selectedTab === 1) {
            return (
                <Container
                    flex={0.2}
                    verticalMiddle
                >
                    <DoubleButton
                        firstText="🤙 İŞ OLUŞTUR"
                        firstColor='green'
                        firstAction={() => this.goToCreateTask(projectID)}
                        secondText="💪 TÜM İŞLERİ GÖR"
                        secondColor='purple'
                        secondAction={() => this.goToTaskList(projectID)}
                    />
                    {/*<Button color='purple' text="💪 Tüm İşleri Gör" action={() => this.goToTaskList(projectID)}/>*/}
                </Container>
            );
        } else if (selectedTab === 2) {
            return (
                <Container
                    flex={0.2}
                    verticalMiddle
                >
                    <Button
                        color='green'
                        text="🏃 TÜM SPRİNTLERİ GÖR"
                        action={() => this.goToSprintList(projectID, createdBy)}
                    />
                </Container>
            );
        } else {
            return (
                <Container
                    flex={0.2}
                    verticalMiddle
                >
                    <Button
                        color='blue'
                        text="💬 TÜM YORUMLARI GÖR"
                        action={() => this.goToProjectCommentList(projectID)}
                    />
                </Container>
            );
        }
    };

    render() {
        const {id, name, description, notes, createdBy} = this.props.project;
        const {selectedTab, isModalOpen} = this.state;
        return (
            <Container>
                <TopBar isBack={true}/>

                {Object.keys(this.props.project).length !== 0 && (
                    <Fragment>
                        <Container space>
                            <Title>{name}</Title>

                            <TabContent
                                tabs={this.tabs}
                                selectedTab={selectedTab}
                                tabButtonAction={this.setSelectedTab}
                                tabContents={() => this.renderTabContents(id, selectedTab, description, notes)}
                            />

                            {this.renderButtons(id, createdBy, selectedTab)}
                        </Container>

                        <ListActionModal
                            isOpen={isModalOpen}
                            toggleFunc={this.setIsOpenModal}
                            editText="Sprint'i Düzenle"
                            editAction={this.editSprintAction}
                            deleteText="Sprint'i Sil"
                            deleteAction={this.deleteSprintAction}
                        />
                    </Fragment>
                )}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        comments: state.projectReducer.comments,
        files: state.projectReducer.files,
        taskLoading: state.taskReducer.loading,
        taskError: state.taskReducer.error,
        sprintLoading: state.sprintReducer.loading,
        sprintError: state.sprintReducer.error,
        commentLoading: state.projectReducer.loading,
        commentError: state.projectReducer.commentError,
        sprints: state.sprintReducer.sprints,
        tasks: state.taskReducer.tasks,
        userIDs: state.teamReducer.userIDs,
        project: state.projectReducer.project,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getSingleProject: (projectID) => dispatch(getSingleProject(projectID)),
        getAllProjectComments: (projectID) => dispatch(getAllProjectComments(projectID)),
        getAllProjectFiles: (projectID) => dispatch(getAllProjectFiles(projectID)),
        getSprintsForProjectDetail: (projectID) => dispatch(getSprintsForProjectDetail(projectID)),
        getAllProjectTasks: (projectID) => dispatch(getAllProjectTasks(projectID)),
        getProjectParentCommentsForDetail: (projectID) => dispatch(getProjectParentCommentsForDetail(projectID)),
        getTeamUserIDs: (teamID) => dispatch(getTeamUserIDs(teamID)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetail);
