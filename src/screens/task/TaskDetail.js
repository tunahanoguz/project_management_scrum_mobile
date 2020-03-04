import React, {Fragment, useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import moment from "moment";
import TopBar from "../../components/TopBar";
import {Container, DirectionContainer, Divider, InnerContainer, Text, Title} from "../../styles";
import Button from "../../components/buttons/Button";
import {getSingleProject} from "../../actions/projectActions";
import TabContent from "../../components/tab/TabContent";
import ProfilePicture from "../../components/ProfilePicture";
import {getUserById} from "../../actions/authActions";
import {getSingleSprint} from "../../actions/sprintActions";
import List from "../../components/list/List";
import {getAllTaskComments, getAllTaskFiles} from "../../actions/taskActions";
import DoubleButton from "../../components/buttons/DoubleButton";

const TaskDetail = ({navigation}) => {
    const [selectedTab, setSelectedTab] = useState(0);

    const taskObj = navigation.getParam('task', {});
    const {id, task, description, projectID, sprintID, userID, startDate, estimatedFinishDate} = taskObj;

    const dispatch = useDispatch();
    const project = useSelector(state => state.projectReducer.project);
    const foundUser = useSelector(state => state.authReducer.foundUser);
    const sprint = useSelector(state => state.sprintReducer.sprint);
    const taskLoading = useSelector(state => state.taskReducer.loading);
    const taskError = useSelector(state => state.taskReducer.error);
    const files = useSelector(state => state.taskReducer.files);
    const comments = useSelector(state => state.taskReducer.comments);

    useEffect(() => {
        dispatch(getSingleProject(projectID));
        dispatch(getUserById(userID ? userID : ""));
        dispatch(getSingleSprint(sprintID));
        dispatch(getAllTaskFiles(id));
        dispatch(getAllTaskComments(id));
    }, []);

    const goToStartTask = () => {
        navigation.navigate('StartTask', {project: project, task: taskObj});
    };

    const goToAssignSprint = () => {
        navigation.navigate('AssignSprintToTask', {task: taskObj});
    };

    const renderMomentDate = (date) => {
        moment.locale('tr-TR');
        return moment(date).format('LLL');
    };

    const renderDateContainer = (title, date) => {
        return (
            <DirectionContainer row>
                <Text medium>{title}</Text>
                <Text normal>{renderMomentDate(date.toDate())}</Text>
            </DirectionContainer>
        );
    };

    const descriptionDetail = () => {
        if (description?.length !== 0){
            return (
                <InnerContainer>
                    <Text medium>Açıklama: </Text>
                    <Text normal>{description.substring(0, 32) + "..."}</Text>
                </InnerContainer>
            );
        }
    };

    const projectDetail = () => {
        const {name} = project;
        if (projectID !== null){
            return (
                <InnerContainer>
                    <Text medium>Proje: </Text>
                    <Text normal>{name}</Text>
                </InnerContainer>
            );
        }
    };

    const renderAllDates = () => {
        if (startDate !== null){
            return (
                <InnerContainer>
                    <Fragment>
                        {renderDateContainer("Başlangıç Tarihi: ", startDate)}
                        <Divider height={10}/>
                        {renderDateContainer("Bitiş Tarihi: ", estimatedFinishDate)}
                    </Fragment>
                </InnerContainer>
            );
        } else {
            return (
                <Button color='green' text="👍 BAŞLAT" action={() => goToStartTask()} />
            );
        }
    };

    const assignedUserDetail = () => {
        if (userID !== null){
            return (
                <InnerContainer>
                    <DirectionContainer row alignCenter>
                        <ProfilePicture size={50} picture={foundUser.photoURL ? foundUser.photoURL : ""} />
                        <Divider width={20}/>
                        <Text medium size={16}>{foundUser?.fullName}</Text>
                    </DirectionContainer>
                </InnerContainer>
            );
        } else {
            return (
                <InnerContainer>
                    <Text medium>Kişi: Henüz hiç kimse atanmamış.</Text>
                </InnerContainer>
            );
        }
    };

    const generalDetail = () => {
        return (
            <Fragment>
                {descriptionDetail()}

                <Divider height={10}/>

                {projectDetail()}

                <Divider height={10}/>

                {renderAllDates()}

                <Divider height={10}/>

                {assignedUserDetail()}
            </Fragment>
        );
    };

    const sprintDetail = () => {
        const {name} = sprint;
        if (sprintID !== null){
            return (
                <TouchableOpacity onPress={() => navigation.navigate('SprintDetail', {sprint})}>
                    <InnerContainer>
                        <Text medium>Sprint: </Text>
                        <Text normal>{name}</Text>
                    </InnerContainer>
                </TouchableOpacity>
            );
        } else {
            return (
                <Button color='purple' text="👊 BİR SPRINT'E ATA" action={() => navigation.navigate('StartTask', {task, project})} />
            );
        }
    };

    const fileDetail = () => {
        return (
            <Fragment>
                <Container flex={0.8}>
                    <List
                        loading={taskLoading}
                        error={taskError}
                        data={files}
                        type='file'
                        orderColor='orangered'
                        isFunctioned={false}
                    />
                </Container>

                <Container flex={0.2} verticalMiddle>
                    <DoubleButton
                        firstText="🤙 Yeni Dosya"
                        firstColor='green'
                        firstAction={() => navigation.navigate('CreateTaskFile', {taskID: taskObj.id})}
                        secondText="📁 Tüm Dosyalar"
                        secondColor='purple'
                        secondAction={() => navigation.navigate('TaskFileList', {taskID: taskObj.id})}
                    />
                </Container>
            </Fragment>
        );
    };

    const commentDetail = () => {
        return (
            <Fragment>
                <Container flex={0.8}>
                    <List
                        loading={taskLoading}
                        error={taskError}
                        data={comments}
                        type='comment'
                        orderColor='orangered'
                        isFunctioned={false}
                    />
                </Container>

                <Container flex={0.2} verticalMiddle>
                    <DoubleButton
                        firstText="🤙 YENİ YORUM"
                        firstColor='green'
                        firstAction={() => navigation.navigate('CreateTaskComment', {taskID: id})}
                        secondText="💬 TÜM YORUMLAR"
                        secondColor='purple'
                        secondAction={() => navigation.navigate('TaskCommentList', {taskID: id,})}
                    />
                </Container>
            </Fragment>
        );
    };

    const tabs = [{icon: '💼', name: 'Genel'}, {icon: '🏃', name: 'Sprint'}, {icon: '📁', name: 'Dosya'}, {icon: '💬', name: 'Yorum'}];

    const renderTabContents = () => {
        if (selectedTab === 0) {
            return generalDetail();
        } else if (selectedTab === 1) {
            return sprintDetail();
        } else if (selectedTab === 2) {
            return fileDetail();
        } else {
            return commentDetail();
        }
    };

    return (
        <Container>
            <TopBar isBack={true} />

            <Container space>
                <Title>{task}</Title>

                <TabContent
                    tabs={tabs}
                    selectedTab={selectedTab}
                    tabButtonAction={setSelectedTab}
                    tabContents={renderTabContents}
                />
            </Container>
        </Container>
    );
};

export default TaskDetail;
