import React from 'react';
import {FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {withNavigation} from 'react-navigation';
import ListItem from "./ListItem";
import {ListContainer} from "./styles";
import {ActivityIndicator} from "react-native-paper";
import {Container, Text} from "../../styles";
import moment from "moment";
import RNFetchBlob from "rn-fetch-blob";
import uuid from "rn-fetch-blob/utils/uuid";

const List = ({navigation, loading, error, data, type, orderColor, isFunctioned, modalFunc}) => {

    const renderDate = (date) => {
        moment.locale('tr-TR');
        return moment(date).format('LLL');
    };

    const renderTopTitle = (item) => {
        if (type === 'project' || type === 'sprint' || type === 'file') {
            return item.name;
        } else if (type === 'team') {
            return item.name;
        } else if (type === 'task'){
            return item.task;
        } else if (type === 'comment'){
            return item.comment;
        }
    };

    const renderBottomTitle = (item) => {
        if (type === 'project' || type === 'sprint') {
            return item.startDate ? "Başladı" : "Başlamadı";
        } else if (type === 'team') {
            return `${item.members?.length} Üye`;
        } else if (type === 'task') {
            return item.priority === 0 ? "Başlamadı" : (item.priority === 1 ? "Devam Ediyor" : "Bitti");
        } else if (type === 'comment'){
            return renderDate(item?.createdAt.toDate());
        } else if (type === 'file'){
            return `${item.size / 1000000} MB`;
        }
    };

    const goToProject = (project) => {
        navigation.navigate('ProjectDetail', {project});
    };

    const goToTeam = (team) => {
        const {id, members} = team;
        navigation.navigate('TeamDetail', {teamID: id, members});
    };

    const goToTask = (task) => {
        navigation.navigate('TaskDetail', {task});
    };

    const goToSprint = (sprint) => {
        navigation.navigate('SprintDetail', {sprint});
    };

    const downloadFile = (fileURL, type) => {
        const { dirs } = RNFetchBlob.fs;
        return RNFetchBlob
            .config({
                fileCache : true,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: dirs.DownloadDir + "/" + uuid().v4 + "." + type,
                },
            })
            .fetch('GET', fileURL, {})
            .then(res => console.log(res))
            .catch(() => console.log("Başarısız"));
    };

    const renderGoToFunc = () => {
        if (type === 'project') {
            return goToProject;
        } else if (type === 'team') {
            return goToTeam;
        } else if (type === 'sprint') {
            return goToSprint;
        } else if (type === 'task') {
            return goToTask;
        } else if (type === 'comment') {
            return goToSprint;
        } else if (type === 'file') {
            return downloadFile;
        }
    };

    const renderList = () => {
        if (loading) {
            return (
                <Container verticalMiddle horizontalMiddle white>
                    <ActivityIndicator/>
                </Container>
            );
        } else {
            if (data?.length === 0) {
                return (
                    <Container verticalMiddle horizontalMiddle white>
                        <Text medium>{error}</Text>
                    </Container>
                );
            } else {
                return (
                    <FlatList
                        data={data}
                        renderItem={({item, index}) => {
                            return (
                                <ListItem
                                    item={item}
                                    itemID={item.id}
                                    goToScreenFunc={renderGoToFunc()}
                                    topTitle={renderTopTitle(item)}
                                    order={index + 1}
                                    orderColor={orderColor}
                                    bottomTitle={renderBottomTitle(item)}
                                    isFunctioned={isFunctioned}
                                    modalFunc={modalFunc ? modalFunc : () => alert("asdasdasd")}
                                    type={type}
                                />
                            );
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                );
            }
        }
    };

    return (
        <ListContainer>
            {renderList()}
        </ListContainer>
    );
};

List.propTypes = {
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    type: PropTypes.string.isRequired,
    orderColor: PropTypes.string.isRequired,
    isFunctioned: PropTypes.bool.isRequired,
    modalFunc: PropTypes.func,
};

export default withNavigation(List);
