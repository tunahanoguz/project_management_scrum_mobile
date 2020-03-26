import React, {Fragment, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styled from 'styled-components';
import moment from "moment";
import 'moment/locale/tr';
import {
    TopBar,
    ProfilePicture,
    Button,
    TabContent, BlockButton,
} from 'components';
import {
    Container,
    DirectionContainer,
    Divider,
    InnerContainer,
    Text,
    Title
} from "../../styles";
import {getUserById} from "../../actions/authActions";
import {getSingleProject} from "../../actions/projectActions";
import {deleteSprint, finishSprint, getSingleSprint} from "../../actions/sprintActions";
import {
    createDailyScrumMeeting,
    getDailyScrumMeeting,
    startDailyScrumMeeting
} from "../../actions/dailyScrumMeetingActions";
import {getSingleTeam} from "../../actions/teamActions";
import {createNotification, sendNotifications} from "../../actions/notificationActions";

const SprintDetail = ({navigation}) => {
    const sprintID = navigation.getParam('sprintID', {});

    const [selectedTab, setSelectedTab] = useState(0);

    const dispatch = useDispatch();
    const authUser = useSelector(state => state.authReducer.user);
    const user = useSelector(state => state.authReducer.foundUser);
    const {fullName, photoURL} = user;

    const sprint = useSelector(state => state.sprintReducer.sprint);
    const {id, name, createdBy, projectID, startDate, finishDate, estimatedFinishDate} = sprint;

    const project = useSelector(state => state.projectReducer.project);
    const dailyScrumMeeting = useSelector(state => state.dailyScrumMeetingReducer.dailyScrumMeeting);

    const team = useSelector(state => state.teamReducer.team);
    const [userIDs, setUserIDs] = useState([]);

    // const [messagingTokens, setMessingTokens] = useState([]);

    useEffect(() => {
        dispatch(getSingleSprint(sprintID));
        dispatch(getDailyScrumMeeting(sprintID));
    }, []);

    useEffect(() => {
        if (sprint) {
            dispatch(getUserById(createdBy));
            dispatch(getSingleProject(projectID));
        }
    }, [sprint]);

    useEffect(() => {
        if (project){
            dispatch(getSingleTeam(project.teamID));
        }
    }, [project]);

    useEffect(() => {
        if (team && team.members !== undefined){
            setUserIDs([]);
            team.members.map(member => setUserIDs(value => [...value, member.id]));
        }
    }, [team]);

    const renderDate = (date) => {
        moment.locale('tr-TR');
        return moment(date).format('LL');
    };

    const renderGeneralTab = () => (
        <Fragment>
            <InnerContainer>
                <DirectionContainer row alignCenter>
                    <ProfilePicture size={50} picture={photoURL ? photoURL : ""}/>
                    <Divider width={20}/>
                    <DirectionContainer>
                        <Text medium size={18}>Oluşturan Kişi</Text>
                        <Text normal size={16}>{fullName}</Text>
                    </DirectionContainer>
                </DirectionContainer>
            </InnerContainer>

            <Divider height={20}/>

            <InnerContainer>
                <DirectionContainer row alignCenter>
                    <LeftCircle>
                        <Text>💼</Text>
                    </LeftCircle>

                    <Divider width={20}/>

                    <DirectionContainer>
                        <Text medium size={18}>Proje</Text>
                        <Text normal size={16}>{project.name}</Text>
                    </DirectionContainer>
                </DirectionContainer>
            </InnerContainer>

            <Divider height={20}/>

            <Button
                action={() => navigation.navigate('SprintTaskList', {sprintID: id})}
                color='purple'
                text="💪 İŞLERİ GÖRÜNTÜLE"
            />
        </Fragment>
    );

    const renderDateTab = () => (
        <Fragment>
            {renderStartDate()}

            <Divider height={20}/>

            {renderEstimatedFinishDate()}

            <Divider height={20}/>

            {renderFinishSprintButton()}
        </Fragment>
    );

    const renderStartDate = () => {
        if (startDate) {
            return (
                <InnerContainer>
                    <DirectionContainer row alignCenter>
                        <LeftCircle>
                            <Text>📅</Text>
                        </LeftCircle>

                        <Divider width={20}/>

                        <DirectionContainer>
                            <Text medium size={18}>Başlama Tarihi</Text>
                            <Text normal size={16}>{renderDate(startDate)}</Text>
                        </DirectionContainer>
                    </DirectionContainer>
                </InnerContainer>
            );
        } else {
            if (createdBy === authUser.uid){
                return (
                    <Button
                        action={() => navigation.navigate('StartSprint', {sprintID: id})}
                        color='purple'
                        text="👊 BAŞLAT"
                    />
                );
            } else {
                return (
                    <Text medium center>
                        Sprint henüz başlatılmamış ve Sprint'i başlatmanız için yetkiniz yok.
                    </Text>
                );
            }
        }
    };

    const renderEstimatedFinishDate = () => {
        if (estimatedFinishDate) {
            return (
                <InnerContainer>
                    <DirectionContainer row alignCenter>
                        <LeftCircle>
                            <Text>📅</Text>
                        </LeftCircle>

                        <Divider width={20}/>

                        <DirectionContainer>
                            <Text medium size={18}>Tahmini Bitiş Tarihi</Text>
                            <Text normal size={16}>{renderDate(estimatedFinishDate)}</Text>
                        </DirectionContainer>
                    </DirectionContainer>
                </InnerContainer>
            );
        }
    };

    // ----------------------------------------------------------------------
    // FINISH SPRINT
    // ----------------------------------------------------------------------

    const finish = () => {
        dispatch(finishSprint(id));
        navigation.navigate('SprintDetail', {sprintID});
    };

    const renderFinishSprintButton = () => {
        if (!finishDate) {
            if (createdBy === authUser.uid){
                return (
                    <Button
                        action={finish}
                        color='blue'
                        text="👎 SPRİNT'İ BİTİR"
                    />
                );
            }
        }
    };

    // ----------------------------------------------------------------------
    // DAILY SCRUM MEETING
    // ----------------------------------------------------------------------

    const startDailyScrumMeetingAction = () => {
        const dailyScrumMeetingID = dailyScrumMeeting.id;
        if (Object.keys(dailyScrumMeeting).length === 0){
            dispatch(createDailyScrumMeeting(sprintID));
            dispatch(createNotification(
                userIDs,
                "daily_scrum_meeting",
                `${name} sprinti için Günlük Scrum Toplantısı başlatıldı.`
            ));

            dispatch(sendNotifications(
                userIDs,
                "Daily Scrum Meeting",
                `${name} sprinti için Günlük Scrum Toplantısı başlatıldı.`
            ));

            navigation.navigate('DailyScrumMeeting', {dailyScrumMeetingID, createdBy});
        } else {
            dispatch(startDailyScrumMeeting(dailyScrumMeetingID));
            dispatch(createNotification(
                userIDs,
                "daily_scrum_meeting",
                `${name} sprinti için Günlük Scrum Toplantısı başlatıldı.`
            ));

            dispatch(sendNotifications(
                userIDs,
                "Daily Scrum Meeting",
                `${name} sprinti için Günlük Scrum Toplantısı başlatıldı.`
            ));

            navigation.navigate('DailyScrumMeeting', {dailyScrumMeetingID, createdBy});
        }
    };

    const renderDailyScrumButton = () => {
        if (!finishDate) {
            if (createdBy === authUser.uid){
                return (
                    <Button
                        action={startDailyScrumMeetingAction}
                        color='blue'
                        text="GÜNLÜK SCRUM TOPLANTISI BAŞLAT"
                    />
                );
            } else {
                return (
                    <Text medium center>Yetkiniz olmadığı için Günlük Scrum Toplantısı'nı başlatamazsınız.</Text>
                );
            }
        } else {
            return (
                <Text medium center>Sprint sona erdiği için Günlük Scrum Toplantısı başlatılamaz.</Text>
            );
        }
    };

    // ----------------------------------------------------------------------
    // SPRINT PLANNING MEETING
    // ----------------------------------------------------------------------

    const renderSprintPlanningButton = () => {
        if (!finishDate) {
            if (createdBy === authUser.uid){
                return (
                    <Button
                        action={() => alert("asdasdasd")}
                        color='green'
                        text="SPRİNT PLANLAMA TOPLANTISI BAŞLAT"
                    />
                );
            } else {
                return (
                    <Text medium center>Yetkiniz olmadığı için Sprint Planlama Toplantısı'nı başlatamazsınız.</Text>
                );
            }

        } else {
            return (
                <Text medium center>Sprint sona erdiği için Sprint Planlama Toplantısı başlatılamaz.</Text>
            );
        }
    };

    // ----------------------------------------------------------------------
    // TABS
    // ----------------------------------------------------------------------

    const tabs = [{icon: '🏃', name: 'Genel'}, {icon: '📅', name: 'Tarih'}, {icon: '☀️', name: 'Günlük'}, {icon: '💡', name: 'Plan'}];

    const renderTabContents = () => {
        if (selectedTab === 0) {
            return renderGeneralTab();
        } else if (selectedTab === 1) {
            return renderDateTab();
        } else if (selectedTab === 2) {
            return renderDailyScrumButton();
        } else {
            return renderSprintPlanningButton();
        }
    };

    const topBarRightButtons = [
        {
            icon: 'trash-2',
            action: () => {
                dispatch(deleteSprint(projectID, sprintID));
                navigation.navigate('ProjectDetail', projectID);
            },
        }
    ];

    return (
        <Container>
            <TopBar
                isBack={true}
                actionButtons={createdBy === authUser.uid ? topBarRightButtons : []}
            />

            <Container space>
                <Title>{name}</Title>

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

const LeftCircle = styled.View`
    width: 50px;
    height: 50px;
    justify-content: center;
    align-items: center;
    background-color: orangered;
    ${({color}) => color && `
        background-color: ${color};
    `};
    border-radius: 100px;
`;

export default SprintDetail;
